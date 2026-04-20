const namn = "java"; 
console.log("Welcome to " + namn + " programming!");

let message = document.getElementById("message");
let chat = document.getElementById("chat"); 
let usernameIL = document.getElementById("username-Inlg"); 
let userDisplay = document.getElementById("userDisplay"); 

let chatInput = document.getElementById("chatInput"); //Vi ska senare använda texten från chatloggen senare. 

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

