document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, role })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful! Please log in.');
            window.location.href = 'login.html'; // Redirect to login page after successful registration
        } else {
            document.getElementById('error').textContent = data.message || 'Registration failed. Please try again.';
        }
    } catch (error) {
        document.getElementById('error').textContent = 'An error occurred. Please try again.';
        console.error('Error:', error);
    }
});
