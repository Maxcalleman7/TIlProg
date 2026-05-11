const sqlite3 = require('sqlite3').verbose();

// 1. Skapa/Anslut till databasen
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Kunde inte ansluta:', err.message);
    } else {
        console.log('Ansluten till SQLite-databasen.');
    }
});

// 2. Skapa tabellen om den inte finns
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);


    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);
    
    // Lägg till en testanvändare (admin / 1234)
    db.run('INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)', ['admin', '1234']);
});

// 3. Exportera db så att server.js kan använda den!
module.exports = db;