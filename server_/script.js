const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event) => {
 event.preventDefault(); // Hindra sidan från att starta om
 const username = document.getElementById('username').value;
 const password = document.getElementById('password').value;
 // Skicka datan till servern
 const response = await fetch('/login', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ username, password })
 });
 const result = await response.json();
 if (result.success) {
 // Om det gick bra -> gå till den låsta sidan
 window.location.href = '/website/Home.html';
 } else {
 // Om det gick dåligt -> visa felmeddelande
 document.getElementById('error-msg').innerText = result.message;
 }
});
