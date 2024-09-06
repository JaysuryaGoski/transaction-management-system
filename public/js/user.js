document.addEventListener('DOMContentLoaded', () => {
    loadUserTransactions();
});

const token = localStorage.getItem('token');
console.log(token);

async function loadUserTransactions() {
    const response = await fetch('/api/transactions', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const transactions = await response.json();
    const tbody = document.querySelector('#user-transaction-table tbody');
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
            <td>
                <button onclick="editTransaction(${tx.id})">Edit</button>
                <button onclick="requestDeletion(${tx.id})">Request Deletion</button>
            </td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

async function addTransaction(transaction) {
    const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(transaction)
    });
    if (response.ok) {
        alert('Transaction added successfully');
        document.getElementById('add-transaction-form').reset();
        document.getElementById('add-transaction-btn').textContent = 'Add Transaction'; // Reset button text
        loadUserTransactions();
    } else {
        alert('Failed to add transaction');
    }
}

async function editTransaction(id) {
    try {
        const response = await fetch(`/api/transactions/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch transaction data');
        }
        const transaction = await response.json();

        // Populate form fields with existing transaction data
        document.getElementById('transaction_id').value = transaction.transaction_id || '';
        document.getElementById('customer_id').value = transaction.customer_id || '';

        // Handle undefined or null dates properly
        const transactionDate = transaction.transaction_date ? new Date(transaction.transaction_date).toISOString().split('T')[0] : '';
        document.getElementById('transaction_date').value = transactionDate;

        document.getElementById('amount').value = transaction.amount || '';
        document.getElementById('status').value = transaction.status || '';
        document.getElementById('payment_method').value = transaction.payment_method || '';
        document.getElementById('currency').value = transaction.currency || '';

        // Change button text to "Update Transaction"
        document.getElementById('add-transaction-btn').textContent = 'Update Transaction';

        // Remove existing event listener to avoid duplicate submission
        const form = document.getElementById('add-transaction-form');
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);

        newForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const updatedTransaction = {
                transaction_id: document.getElementById('transaction_id').value || null,
                customer_id: document.getElementById('customer_id').value || null,
                transaction_date: document.getElementById('transaction_date').value || null,
                amount: document.getElementById('amount').value || null,
                status: document.getElementById('status').value || null,
                payment_method: document.getElementById('payment_method').value || null,
                currency: document.getElementById('currency').value || null
            };

            const updateResponse = await fetch(`/api/transactions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedTransaction)
            });
            if (updateResponse.ok) {
                alert('Transaction updated successfully');
                newForm.reset();
                document.getElementById('add-transaction-btn').textContent = 'Add Transaction'; // Reset button text
                loadUserTransactions();
            } else {
                alert('Failed to update transaction');
            }
        });
    } catch (error) {
        console.error('Error fetching transaction data:', error);
        alert('Failed to load transaction data');
    }
}




async function requestDeletion(id) {
    const response = await fetch(`/api/transactions/request-deletion/${id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.ok) {
        alert('Deletion request submitted');
    } else {
        alert('Failed to request deletion');
    }
}

document.getElementById('add-transaction-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const transaction = {
        transaction_id: document.getElementById('transaction_id').value,
        customer_id: document.getElementById('customer_id').value,
        transaction_date: document.getElementById('transaction_date').value,
        amount: document.getElementById('amount').value,
        status: document.getElementById('status').value,
        payment_method: document.getElementById('payment_method').value,
        currency: document.getElementById('currency').value
    };
    await addTransaction(transaction);
});
