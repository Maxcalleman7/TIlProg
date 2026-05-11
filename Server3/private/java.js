const namn = "java"; 
console.log("Welcome to " + namn + " programming!");

const response= await fetch("Server3/server.js")

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

fetch('/api/userMsgs')

chatInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        chat.textContent +=   ">>: " + chatInput.value; 
        chatInput.value = "";

        const li = document.createElement("li")
        li.textContent = chatInput.value
        itemList.appendChild(li)
            chatInput.value = "";
            msg.textContent = "";
            counter.textContent = `Antal objekt: ${itemList.children.length}`;
    }
});