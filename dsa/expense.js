class ExpenseTracker {
    constructor() {
        const expensesJsonString = localStorage.getItem('expenses');
        this.expenses = expensesJsonString ? JSON.parse(expensesJsonString) : [];
    }

    addExpense(type, name, date, amount) {
        if (type !== "chooseOne" && name !== "" && date !== "0" && amount > 0) {
            const expense = {
                type: type,
                name: name,
                date: date,
                amount: amount,
                id: this.expenses.length > 0 ? this.expenses[this.expenses.length - 1].id + 1 : 1,
            };
            this.expenses.push(expense);

            localStorage.setItem('expenses', JSON.stringify(this.expenses));

            this.displayExpenses();
        }
    }

    deleteExpense(id) {
        const index = this.expenses.findIndex(expense => expense.id === id);
        if (index !== -1) {
            this.expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(this.expenses));
            this.displayExpenses();
        }
    }

    showExpenses() {
        let htmlTable = "<table>";
        htmlTable += "<tr><th>Type</th><th>Name</th><th>Date</th><th>Amount</th><th>Action</th></tr>";
        for (let i = 0; i < this.expenses.length; i++) {
            const expense = this.expenses[i];
            htmlTable += "<tr>" +
                `<td>${expense.type}</td>` +
                `<td>${expense.name}</td>` +
                `<td>${expense.date}</td>` +
                `<td>$${expense.amount}</td>` +
                `<td><button onclick="tracker.deleteExpense(${expense.id})">Delete</button></td>` +
                "</tr>";
        }
        htmlTable += "</table>";
        return htmlTable;
    }

    displayExpenses() {
        const expenseTableContainer = document.getElementById("expenseTableContainer");
        expenseTableContainer.innerHTML = this.showExpenses();
    }
}

const tracker = new ExpenseTracker();
tracker.displayExpenses();

const form = document.getElementById("expForm");
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const type = document.getElementById("type").value;
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const amount = document.getElementById("amount").value;
    tracker.addExpense(type, name, date, amount);
});
