const namn = "java"; 
console.log("Welcome to " + namn + " programming!");

let message = document.getElementById("message");
let username = document.getElementById("username");
let usernameIL = document.getElementById("username-Inlg");
let userDisplay = document.getElementById("userDisplay");

let chatInput = document.getElementById("chatInput");

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
        username.textContent =  ">>: " + chatInput.value ;
        chatInput.value = "";
    }

    if (username.textContent.length > 20) {
    alert("Name får inte vara längre än 20 tecken.");
    username.textContent = ">>: ";
}
});
