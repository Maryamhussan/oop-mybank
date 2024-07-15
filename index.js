#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.yellow("\n\t------------------------"));
console.log(chalk.bgWhite.bold.black(`\t  WELCOME TO THE BANK!`));
console.log(chalk.yellow("\t------------------------\n"));
class BankAccount {
    accountBalance;
    constructor() {
        this.accountBalance = 100;
    }
    async debit() {
        const amounts = await inquirer.prompt([{
                name: "amount",
                type: "number",
                message: "Enter the amount you want to withdraw from your bank account: ",
            }]);
        const amount = amounts.amount;
        if (amount <= 0) {
            console.log(chalk.redBright("\n\t!!! The amount you entered is wrong!\n"));
        }
        else if (this.accountBalance < amount) {
            console.log(chalk.redBright("\n\tYou don't have enough money to do this transaction!!!\n"));
        }
        else {
            this.accountBalance -= amount;
            console.log(chalk.yellow("\n\t-----------------------------------------------------------"));
            console.log(chalk.green(`\t Transaction successful! Your account have  ${this.accountBalance} Rs left.`));
            console.log(chalk.yellow("\t-------------------------------------------------------------\n"));
        }
    }
    async credit() {
        const amounts = await inquirer.prompt([{
                name: "amount",
                type: "number",
                message: "Enter the amount you want to credit to your account: "
            }]);
        const amount = amounts.amount;
        if (amount <= 0) {
            console.log(chalk.red("\n\tFailed to credit amount. Please enter a Valid amount!!!!\n"));
        }
        else {
            this.accountBalance += amount;
            if (amount > 100) {
                this.accountBalance -= 1; // Deducting a fee of 1 for amounts greater than 100
            }
            console.log(chalk.yellow("\n\t-------------------------------------------------------------"));
            console.log(chalk.green("\t Your account has been credited with " + amount + " Rs successfully!"));
            console.log(chalk.blue(`\t Total Money in your account: ${this.accountBalance} Rs.`));
            console.log(chalk.yellow("\t-------------------------------------------------------------\n"));
        }
    }
}
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    bankAccount;
    name;
    constructor(firstName, lastName, gender, age, mobileNumber, bankaccount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.bankAccount = new BankAccount();
        this.name = `${this.firstName} ${this.lastName}`;
    }
    static async createCustomer() {
        const customerInfo = await inquirer.prompt([
            { name: "firstName", type: "input", message: "Enter your first name: " },
            { name: "lastName", type: "input", message: "Enter your last name: " },
            { name: "gender", type: "list", message: "Select your gender: ", choices: ["Male", "Female"] },
            { name: "age", type: "number", message: "Enter your age: " },
            { name: "mobileNumber", type: "number", message: "Enter your mobile number: " },
            { name: "bankaccount", type: "input", message: "Enter your bankaccount: " }
        ]);
        return new Customer(customerInfo.firstName, customerInfo.lastName, customerInfo.gender, customerInfo.age, customerInfo.mobileNumber, customerInfo.bankAccount);
    }
    async performBankOperations() {
        let exit = false;
        while (!exit) {
            const { action } = await inquirer.prompt([{
                    name: "action",
                    type: "list",
                    message: "What would you like to do?",
                    choices: ["Withdraw amount", "Credit amount", "Exit"]
                }]);
            switch (action) {
                case "Withdraw amount":
                    await this.bankAccount.debit();
                    break;
                case "Credit amount":
                    await this.bankAccount.credit();
                    break;
                case "Exit":
                    exit = true;
                    console.log(chalk.cyan("\n\tExiting..."));
                    process.exit();
                    break;
            }
        }
    }
}
async function main() {
    const customer = await Customer.createCustomer();
    console.log(customer);
    await customer.performBankOperations();
}
main();
