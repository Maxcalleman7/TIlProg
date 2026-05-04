const db = require('./DB'); // Importera databasen (för framtida användning)
require('dotenv').config(); // Detta läser in .env-filen
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

const fs= require ('fs');
const filepath='';


// 1. Inställningar
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    // Här hämtar vi variabeln från .env
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false
}));


// 2. Dörrvakten (Middleware)
const checkAuth = (req, res, next) => {
    if (req.session.loggedIn) {
        next(); // Släpp in användaren
    } else {
        res.status(401).send('Åtkomst nekad. Logga in först.');
    }
};

// 3. Skydda hela private-mappen
// Detta gör att filer inuti /private bara nås om man är inloggad
app.use('/private', checkAuth, express.static(path.join(__dirname, 'private')));

// 4. Inloggnings-post
// 4. Inloggnings-post
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Fråga databasen om användarnamn och lösenord matchar
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    
    db.get(query, [username, password], (err, row) => {
        if (err) {
            console.error('Databasfel vid inloggning:', err.message);
            return res.status(500).json({ success: false, message: 'Internt serverfel' });
        }

        if (row) {
            // Användaren hittades i databasen! (Lösenord och namn matchar)
            req.session.loggedIn = true;
            req.session.username = username;
            filepath='/'+username+'txt'

            const userMsgs = fs.readFileSync(filepath, 'utf-8');
            req.session.userMsgs=userMsgs;
            res.json({ success: true });
        } else {
            // Hittades inte i databasen (fel lösenord eller fel användarnamn)
            res.status(401).json({ success: false, message: 'Fel uppgifter' });
        }
    });
});



// 5. Route för att skapa ett nytt konto
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // SQL-kommando för att stoppa in en ny rad i tabellen 'users'
    const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';

    db.run(insertQuery, [username, password], function(err) {
        if (err) {
            // Kommer du ihåg "UNIQUE" i DB.js? Här har vi nytta av det!
            // Om SQLite klagar på "UNIQUE constraint failed", betyder det att namnet är upptaget.
            if (err.message.includes('UNIQUE')) {
                return res.status(400).json({ success: false, message: 'Användarnamnet är redan upptaget.' });
            }
            // Om det är något annat fel
            console.error('Databasfel:', err.message);
            return res.status(500).json({ success: false, message: 'Ett internt serverfel uppstod.' });
        }

        // Om koden når hit gick det jättebra att spara användaren!
        res.status(201).json({ success: true, message: 'Konto skapat framgångsrikt!' });
    });
});


// 5. Route till dashboard
app.get('/dashboard', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'private', 'Home.html'));
});

// API för att hämta användarinfo
app.get('/api/user', checkAuth, (req, res) => {
    res.json({ username: req.session.username });
});

//hämtar användares meddelanden
app.get('/api/userMsgs',checkAuth, (req, res) =>{
    res.json({userMsgs: req.session.userMsgs});
});

// 6. Logga ut
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Man kan även använda PORT från .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server körs på port ${PORT}`));
