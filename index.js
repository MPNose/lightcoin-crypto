//let balance = 500.00;
class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit(){
    if (!this.isAllowed) {
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}


class Withdrawal extends Transaction {

  get value() {
    return -this.amount;

  }
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }

}


class Deposit extends Transaction {

  get value() {
    return this.amount
  }

}


class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    for (let exchanges of this.transactions) {
      balance += exchanges.value;
    }
    return balance
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
  isAllowed() {
    return true;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-partol");

console.log('Starting balance: ', myAccount.balance)



const t1 = new Deposit(120.00, myAccount);
t1.commit();


const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

const t3 = new Withdrawal(75.00, myAccount);
t2.commit();



console.log('remaining balance:', myAccount.balance);
