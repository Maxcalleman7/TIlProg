const namn = "java"; 
console.log("Welcome to " + namn + " programming!");
const fs= require ('fs');
const filepath='Msgs.txt';
const content = fs.readFileSync(filepath, 'utf-8');

let message = document.getElementById("message");
let chat = document.getElementById("chat"); 
let usernameIL = document.getElementById("username-Inlg"); 
let userDisplay = document.getElementById("userDisplay"); 
let msgTest=document.getElementById("msgTest");

let chatInput = document.getElementById("chatInput"); //Vi ska senare använda texten från chatloggen senare. 

msgTest.textContent=content;

// Hämta användarnamn när sidan laddas
fetch('/api/user')
    .then(response => response.json())
    .then(data => {
        if (data.username) {
            userDisplay.textContent = "Användare: " + data.username;
        }
    })
    .catch(error => console.error('Fel vid hämtning av användare:', error));



chatInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        chat.textContent +=   ">>: " + chatInput.value; 
        chatInput.value = "";
        
    } 

});

