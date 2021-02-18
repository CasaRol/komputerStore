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

function populateDropDown() {
    let dropDown = document.createElement("select")
    dropDown.setAttribute("id", "myDropdown")
    dropDown.setAttribute("onchange", "dropdownChange(this)")
    document.body.appendChild(dropDown)

    //default selection
    let entry = document.createElement("option")
    entry.setAttribute("disabled", "true")
    entry.setAttribute("selected", "true")

    let text = document.createTextNode("Select Computer")
    entry.appendChild(text)

    dropDown.appendChild(entry)

    //Adding selection options
    computerArray.forEach(element => {
        let entry = document.createElement("option")
        entry.setAttribute("value", computerArray.indexOf(element))

        let text = document.createTextNode(element.name)
        entry.appendChild(text)

        dropDown.appendChild(entry)
    });
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
    if (bank.balance >= computer.price) {
        //add computer to list of purchases
        bank.balance -= computer.price
        bank.loanStatus = false
    }
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

populateDropDown()

/*
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
*/

let outerDiv = document.createElement("div")
outerDiv.setAttribute("id", "computerDiv")

let title = document.createElement("h3")
title.setAttribute("id", "computerHeading")
outerDiv.appendChild(title)

let pricing = document.createElement("p")
pricing.setAttribute("id", "computerPrice")
outerDiv.appendChild(pricing)

let desc = document.createElement("p")
desc.setAttribute("id", "computerDescription")
outerDiv.appendChild(desc)

let purchaseBtn = document.createElement("button")
purchaseBtn.setAttribute("id", "buyNow")
outerDiv.appendChild(purchaseBtn)

document.body.appendChild(outerDiv)



function dropdownChange(obj) {
    let variable = obj.value
    console.log(variable)
    let outerDiv = document.createElement("div")
    outerDiv.setAttribute("id", "computerDiv")

    let title = document.getElementById("computerHeading")
    title.innerHTML = computerArray[variable].name

    let pricing = document.getElementById("computerPrice")
    pricing.innerHTML = "Price: $" + computerArray[variable].price

    let desc = document.getElementById("computerDescription")
    desc.innerHTML = "Description: " + computerArray[variable].description

    let purchaseBtn = document.getElementById("buyNow")
    purchaseBtn.innerHTML = "Buy now!"
    purchaseBtn.onclick = function () { purchaseComputer(computerArray[variable]) }
}

//initiate page load
updateBalance();
updateLoan();
updateSalary();
hideElement("hide");