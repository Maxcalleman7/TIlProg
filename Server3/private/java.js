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
            const userLi = document.createElement("li");
            userLi.textContent = "Användare: " + data.username;
            chat.appendChild(userLi);
        }
    })
    .catch(error => console.error('Fel vid hämtning av användare:', error));



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




