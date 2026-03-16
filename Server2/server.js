const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Konfigurera sessioner
app.use(session({
    secret: 'min-hemliga-nyckel', // Används för att signera cookien
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Sätt till true om du använder HTTPS
}));

// Inloggnings-logik
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === '1234') {
        // Spara användaren i sessionen!
        req.session.loggedIn = true;
        req.session.user = username;
        res.json({ success: true, message: 'Inloggad!' });
    } else {
        res.status(401).json({ success: false, message: 'Fel uppgifter' });
    }
});

// En skyddad route som kollar om sessionen finns
app.get('/dashboard', (req, res) => {
 if (req.session.loggedIn) {
 // Skicka dashboard.html från den privata mappen
 res.sendFile(path.join(__dirname, 'private', 'Home.html'));
 } else {
 // Inte inloggad? Skicka dem tillbaka till startsidan
 res.redirect('/');
 }
});

// Logga ut
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(3000, () => console.log('Server på http://localhost:3000'));