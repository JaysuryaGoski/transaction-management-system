document.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
    loadDeletionRequests();
});

async function loadTransactions() {
    const response = await fetch('/api/transactions', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const transactions = await response.json();
    const tbody = document.querySelector('#transaction-table tbody');
    tbody.innerHTML = ''; // Clear existing rows
    transactions.forEach(tx => {
        const row = `<tr>
            <td>${tx.id}</td>
            <td>${tx.transaction_id}</td>
            <td>${tx.customer_id}</td>
            <td>${tx.transaction_date}</td>
            <td>${tx.amount}</td>
            <td>${tx.status}</td>
            <td>${tx.payment_method}</td>
            <td>${tx.currency}</td>
            <td>${tx.added_by}</td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

async function loadDeletionRequests() {
    const response = await fetch('/api/admin/deletion-requests', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const requests = await response.json();
    const tbody = document.querySelector('#deletion-table tbody');
    tbody.innerHTML = ''; // Clear existing rows
    requests.forEach(req => {
        const row = `<tr>
            <td>${req.id}</td>
            <td>${req.transaction_id}</td>
            <td>${req.requested_by}</td>
            <td>${req.status}</td>
            <td>
                <button onclick="approveRequest(${req.id})">Approve</button>
                <button onclick="denyRequest(${req.id})">Deny</button>
            </td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

async function approveRequest(id) {
    const response = await fetch(`/api/admin/approve-deletion/${id}`, {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        alert('Request approved');
        loadDeletionRequests();
    } else {
        alert('Failed to approve request');
    }
}

async function denyRequest(id) {
    const response = await fetch(`/api/admin/deny-deletion/${id}`, {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        alert('Request denied');
        loadDeletionRequests();
    } else {
        alert('Failed to deny request');
    }
}

document.getElementById('create-user-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const role = document.getElementById('new-role').value;

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ username, password, role })
    });

    const data = await response.json();
    if (response.ok) {
        alert('User created successfully');
        document.getElementById('create-user-form').reset();
    } else {
        alert(data.message);
    }
});
