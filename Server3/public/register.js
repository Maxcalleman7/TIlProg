const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    //Här hämtas värdena från input fomuläret för att sedan skickas till servern och sparas i databasen.    
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    //Skicka en POST-förfrågan till servern med användarnamn och lösenord i JSON-format
    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
// Om registreringen lyckades, skicka användaren till inloggningssidan. Annars visa ett felmeddelande.
    if (response.ok){
    alert('Kontot har skapats');
    window.location.href = '/index.html'; // Skickas till inloggningssidan
    }
    else {
        document.getElementById('reg-error-msg').innerText = result.message || 'Ett fel uppstod vid registreringen.';
    }

});
