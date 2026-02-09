const namn = "java"; 
console.log("Welcome to " + namn + " programming!");

let chatInput = document.getElementById("chatInput");
let usermsg = document.getElementById("usermsg");

chatInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        usermsg.textContent = ">> " + chatInput.value + ": ";
        chatInput.value = "";
    }

    if (usermsg.textContent.length > 20) {
    alert("Meddelandet får inte vara längre än 20 tecken.");
    usermsg.textContent = ">> : ";
}
});










