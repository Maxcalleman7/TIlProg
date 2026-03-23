const db = require('./DB'); // Importera databasen (för framtida användning)
require('dotenv').config(); // Detta läser in .env-filen
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

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
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '1234') {
        req.session.loggedIn = true;
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Fel uppgifter' });
    }
});

// 5. Route till dashboard
app.get('/dashboard', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'private', 'Home.html'));
});

// 6. Logga ut
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Man kan även använda PORT från .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server körs på port ${PORT}`));
