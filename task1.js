function Computer(name, price, description, features) {
    this.name = name,
        this.price = price,
        this.description = description,
        this.features = features

}

let computerArray = [
    new Computer("Acer", 5000, "Piece of sh*t but it works... -ish.", ["Half a keyboard", "Broken screen", "30 speakers"]),
    new Computer("Dell", 15000, "Fairly standard model and price.", ["Two keys (1 and 0)", "Webcam", "Power supply (Battery not included)"]),
    new Computer("HP", 20000, "I know it's expensive but I'm broke, so please buy it.", ["Decent screen", "Somewhat working keyboard", "Warrenty"]),
    new Computer("Asus", 10000, "Best version on the marked when concidering price range.", ["Router included", "WebCam", "Free delivery (Only available for pickup)"])
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
    if (bank.loan > 0) {
        let debtPayoff = (work.pay * 0.1)
        work.pay *= 0.9
        if (debtPayoff > bank.loan) {
            debtPayoff -= bank.loan
            work.pay += debtPayoff
            bank.loan = 0
            loanVisuals("hide")
            updateLoan()
        } else {
            bank.loan -= debtPayoff
            updateLoan()
        }
    }
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
    document.getElementById("computerSection").appendChild(dropDown)

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
            loanVisuals("show")
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
    if (work.pay != 0) {
        if (bank.loan > work.pay) {
            bank.loan -= work.pay
            work.pay = 0
        } else if (bank.loan <= work.pay) {
            work.pay -= bank.loan
            bank.loan = 0;
            bank.balance += work.pay
            work.pay = 0
            loanVisuals("hide")
        }

        updateBalance()
        updateLoan()
        updateSalary()
    }
}

function purchaseComputer(computer) {
    if (computer.price > bank.balance) {
        alert("Insufficient funds!")
    } else if (bank.balance >= computer.price) {
        //add computer to list of purchases
        bank.balance -= computer.price
        bank.loanStatus = false

        updateBalance()
        alert("Congratulations! You are the proud new owner of the " + computer.name + " computer!")
    }
}

//Hides/showes the loan section
function loanVisuals(action) {
    if (action === "hide") {
        document.getElementById("loanDiv").style.display = "none"
        document.getElementById("loanBtn").style.display = "block"
    }
    if (action === "show") {
        document.getElementById("loanDiv").style.display = "block";
        document.getElementById("loanBtn").style.display = "none"
    }
}

//Placement is important! Do not move
populateDropDown()

let listDiv = document.createElement("div")
listDiv.setAttribute("id", "listDiv")
document.getElementById("computerSection").appendChild(listDiv)

let featureHeading = document.createElement("h3")
featureHeading.innerHTML = "Features"
listDiv.appendChild(featureHeading)

let list = document.createElement("ul")
list.setAttribute("id", "list")
listDiv.appendChild(list)

//list Items
let listItem0 = document.createElement("li")
listItem0.setAttribute("id", "0")
list.appendChild(listItem0)

let listItem1 = document.createElement("li")
listItem1.setAttribute("id", "1")
list.appendChild(listItem1)

let listItem2 = document.createElement("li")
listItem2.setAttribute("id", "2")
list.appendChild(listItem2)

let outerDiv = document.createElement("div")
outerDiv.setAttribute("id", "computerDiv")

let title = document.createElement("h3")
title.setAttribute("id", "computerHeading")
outerDiv.appendChild(title)

let image = document.createElement("img")
image.setAttribute("id", "computerImage")
outerDiv.appendChild(image)

let pricing = document.createElement("p")
pricing.setAttribute("id", "computerPrice")
outerDiv.appendChild(pricing)

let desc = document.createElement("p")
desc.setAttribute("id", "computerDescription")
outerDiv.appendChild(desc)

let purchaseBtn = document.createElement("button")
purchaseBtn.setAttribute("id", "buyNow")
outerDiv.appendChild(purchaseBtn)

document.getElementById("computerSection").appendChild(outerDiv)


function dropdownChange(obj) {
    let variable = obj.value
    console.log(variable)

    //Creating features list
    for(let i = 0; i < computerArray[variable].features.length; i++) {
        let listElement = document.getElementById(i)
        listElement.innerHTML = computerArray[variable].features[i]
    }

    let image = document.getElementById("computerImage")
    image.setAttribute("src", ("./images/" + computerArray[variable].name + ".png"))

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
loanVisuals("hide");