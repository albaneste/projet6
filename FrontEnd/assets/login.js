
document.addEventListener("DOMContentLoaded", (event) => {

    const errorPassword = document.querySelector(".errorpassword");
    const form = document.getElementById("form");


    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const log = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (log.status == 200) {

            const token = await log.json();
            console.log(token)

            localStorage.setItem('token', token.token);
            localStorage.setItem('userId', token.userId);
            window.location.href = "index.html"

        } else {

            errorPassword.innerHTML = "Nom d'utilisateur ou mot de passe incorrect.";
        }
    });
});