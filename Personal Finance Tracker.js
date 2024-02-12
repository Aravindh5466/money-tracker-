let transactions = []; // Array to store transactions

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'aravindh' && password === 'Aravindh@123') {
        // Successful login
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    } else {
        // Failed login
        alert('Invalid username or password');
    }
}

document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Create a new transaction object
    const transaction = {
        date,
        category,
        description,
        amount
    };

    // Add the new transaction to the transactions array
    transactions.push(transaction);

    // Update the balance and display transactions
    updateBalance();
    displayTransactions();
    generateReport();

    // Clear form fields
    document.getElementById('date').value = '';
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
});

function updateBalance() {
    // Calculate the total balance based on transactions
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
        if (transaction.category === 'income') {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });

    // Calculate the current balance
    const balance = totalIncome - totalExpense;

    // Display the balance
    const balanceElement = document.getElementById('balance');
    balanceElement.innerHTML = `<h2>Balance: $${balance.toFixed(2)}</h2>`;
}

function displayTransactions() {
    // Display the transactions
    const transactionsElement = document.getElementById('transactions');
    transactionsElement.innerHTML = '<h2>Transactions</h2>';

    transactions.forEach(transaction => {
        const transactionDiv = document.createElement('div');
        transactionDiv.textContent = `${transaction.date} - ${transaction.category}: ${transaction.description} ($${transaction.amount.toFixed(2)})`;
        transactionDiv.classList.add('transaction');
        if (transaction.category === 'income') {
            transactionDiv.classList.add('income');
        } else {
            transactionDiv.classList.add('expense');
        }
        transactionsElement.appendChild(transactionDiv);
    });
}

function generateReport() {
    // Generate and display the report
    const income = transactions.reduce((total, transaction) => {
        return transaction.category === 'income' ? total + transaction.amount : total;
    }, 0);

    const expenses = transactions.reduce((total, transaction) => {
        return transaction.category === 'expense' ? total + transaction.amount : total;
    }, 0);

    const reportElement = document.getElementById('report');
    reportElement.innerHTML = `<h2>Monthly Summary</h2>`;
    reportElement.innerHTML += `Income: $${income.toFixed(2)}<br>`;
    reportElement.innerHTML += `Expenses: $${expenses.toFixed(2)}<br>`;
    reportElement.innerHTML += `Net Income: $${(income - expenses).toFixed(2)}`;
}