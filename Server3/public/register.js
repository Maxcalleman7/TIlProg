const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (response.ok){
    alert('Kontot har skapats');
    window.location.href = '/index.html'; // Skickas till inloggningssidan
    }
    else {
        document.getElementById('error').innerText = result.message || 'Ett fel uppstod vid registreringen.';
    }

});
