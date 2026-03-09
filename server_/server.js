const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
// Inställningar för att servern ska förstå JSON och hitta dina filer
app.use(express.json());
app.use(express.static(__dirname));
// Session-inställning (serverns minne)
app.use(session({
 secret: 'hemlig-nyckel',
 resave: false,
 saveUninitialized: false
}));
// 1. Logga in
app.post('/login', (req, res) => {
 const { username, password } = req.body;
 // Här bestämmer vi vad som krävs för att komma in
 if (username === 'elev' && password === 'kod123') {
 req.session.loggedIn = true; // Stämpla användaren som "godkänd"
 res.json({ success: true });
 } else {
 res.status(401).json({ success: false, message: 'Fel lösenord!' });
 }
});
// 2. Den låsta sidan (Dashboard)
app.get('/website/Home.html', (req, res) => {
 if (req.session.loggedIn) {
 res.send('<h1>Välkommen till den hemliga sidan!</h1><a href="/logout">Logga ut</a>');
 } else {
 res.redirect('/'); // Skicka tillbaka till start om man inte är inloggad
 }
});
// 3. Logga ut
app.get('/logout', (req, res) => {
 req.session.destroy();
 res.redirect('/');
});
app.listen(3000, () => console.log('Startad på http://localhost:3000'));