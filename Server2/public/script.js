const loginForm = document.getElementById('loginForm');
const messageBox = document.getElementById('message');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stoppar sidan från att laddas om

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    messageBox.innerText = "Loggar in...";

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            messageBox.style.color = "green";
            messageBox.innerText = "Loggar in...";
            
            // Skicka användaren till den skyddade sidan efter 1 sekund
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        } else {
            messageBox.style.color = "red";
            messageBox.innerText = data.message;
        }
    } catch (error) {
        messageBox.innerText = "Kunde inte ansluta till servern.";
    }
});