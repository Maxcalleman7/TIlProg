const namn = "java"; 
console.log("Welcome to " + namn + " programming!");

let message = document.getElementById("message");
let username = document.getElementById("username");



username = username.value.toUpperCase();
message = message.value;

const charsChecker = (text) => {
const okChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,?. ";
let text = username + ": " + message;
let valid = true;

for (let i = 0; i < text.length; i++) {
  if (!okChars.includes(text[i])) {
    valid = false;
    break;
  }
}

if (!valid) {
  alert("Meddelandet innehåller ogiltiga tecken.");
}

for (let i = 0; i < text.length; i++) {
  if (text[i] === "username:" || text[i] === "message:") {
    text[i] = ""; 
  }
}
}






let chatInput = document.getElementById("chatInput");


chatInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        username.textContent = ">> " + chatInput.value + ": ";
        chatInput.value = "";
    }

    if (username.textContent.length > 20) {
    alert("Name får inte vara längre än 20 tecken.");
    username.textContent = ">> : ";
}
});



















