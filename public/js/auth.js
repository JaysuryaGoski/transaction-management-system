document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        // Redirect to appropriate dashboard based on role
        const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
        if (tokenPayload.role === 'Admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'user.html';
        }
    } else {
        alert(data.message);
    }
});
