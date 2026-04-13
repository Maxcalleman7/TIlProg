const loginForm = document.getElementById('loginForm');
const registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener('click', () => {
    window.location.href = '/register.html'; // Skickas till registreringssidan
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        window.location.href = '/dashboard'; // Skickas till den skyddade sidan
    } else {
        alert('Fel användarnamn eller lösenord!');
    }



});
