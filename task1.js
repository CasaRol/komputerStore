function Computer(name, price, description) {
    this.name = name,
        this.price = price,
        this.description = description
}

let computerArray = [
    new Computer("Acer", 5000, "Piece of sh*t but it should work (ish)"),
    new Computer("Dell", 15000, "Fairly standard model and price"),
    new Computer("HP", 20000, "I know it's expensive but I'm broke, so please buy it")
]



let bank = {
    balance: 0,
    loan: 0,
    loanStatus: false
}

let work = {
    pay: 0
}

function working() {
    work.pay += 100;
    updateSalary()
}

function transferPayToBank() {
    bank.balance += work.pay;
    work.pay = 0;
    updateBalance();
    updateSalary()
}

function updateBalance() {
    document.getElementById("bankBallance").innerHTML = "$" + bank.balance;
}

function updateSalary() {
    document.getElementById("salary").innerHTML = "$" + work.pay;
}

function updateLoan() {
    document.getElementById("loanAmount").innerHTML = "$" + bank.loan;
}

function takeLoan() {
    if (!bank.loanStatus) {
        let amount = parseInt(prompt("Please select the amount of the loan (NOTE: Not more than double your current balance!)"));
        if (amount <= 0 || amount > (bank.balance * 2)) {
            alert("Unautherized amount! Apply for a new loan");
        } else {
            bank.loanStatus = true
            hideElement("show")
            bank.loan = amount;
            bank.balance += amount;

            updateBalance();
            updateLoan();
        }
    } else {
        alert("You've already taken a loan prior to purchasing a new computer. Go purchase a computer before signing a new loan")
    }

}

function repayLoan() {
    let amount = parseInt(prompt("Please enter the amount to repay:"))
    if (amount <= 0) {
        alert("Unautherized amount!")
    } else {
        if (amount > bank.loan) {
            amount = bank.loan
        }
        bank.balance -= amount;
        bank.loan -= amount;

        if (bank.loan == 0) {
            hideElement("hide")
        }

        updateBalance();
        updateLoan();
    }

}

function purchaseComputer(computer) {
    console.log("purchased computer: " + computer.name)
}

//Hides/showes the loan section
function hideElement(action) {
    if (action === "hide") {
        document.getElementById("loanDiv").style.display = "none"
        document.getElementById("loanBtn").style.display = "block"
    }
    if (action === "show") {
        document.getElementById("loanDiv").style.display = "block";
        document.getElementById("loanBtn").style.display = "none"
    }

}

//Adding computers to the bottom of the page
let computerSection = document.createElement("h1")
computerSection.innerHTML = "Computers for sale!"
document.body.appendChild(computerSection)

//Adding every computer in the array
for (let i = 0; i < computerArray.length; i++) {
    let outerDiv = document.createElement("div")

    let title = document.createElement("h3")
    title.innerHTML = computerArray[i].name
    outerDiv.appendChild(title)

    let pricing = document.createElement("p")
    pricing.innerHTML = "Price: $" + computerArray[i].price
    outerDiv.appendChild(pricing)

    let desc = document.createElement("p")
    desc.innerHTML = "Description: " + computerArray[i].description
    outerDiv.appendChild(desc)

    let purchaseBtn = document.createElement("button")
    purchaseBtn.innerHTML = "Buy now!"
    purchaseBtn.onclick = function () { purchaseComputer(computerArray[i]) }
    outerDiv.appendChild(purchaseBtn)


    document.body.appendChild(outerDiv)

}

//initiate page load
updateBalance();
updateLoan();
updateSalary();
hideElement("hide");

