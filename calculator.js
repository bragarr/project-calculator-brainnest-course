let buttonOperation = document.querySelectorAll(".calc__buttons");

let allClear = document.querySelector(".all__clear");
let deleteButton = document.querySelector(".delete__button");
let resultButton = document.querySelector(".result__button");
let userEntryResult = document.querySelector(".user__entry");
let calcOperationInput = document.querySelector(".result");
let decimalAllowed = false;
let changeMath = document.querySelector(".change__math");
let restartUserInput = false;
const mathOp = ["+","-","/","*"]

// buttonOperation Listener to turn on buttons
buttonOperation.forEach(button => {
    button.addEventListener("click", () => {
        let buttonSelectedByUser = button.dataset.value;
        addUserEntryResultButtonSelected(buttonSelectedByUser);
        switch(buttonSelectedByUser) {
            case "+":
            case "/":
            case "*":
            case "-":    
                if(calcOperationInput.value === "") {
                    calcOperationInput.value = userEntryResult.value;
                    userEntryResult.value = userEntryResult.value.slice(0, -1);
                    restartUserInput = true;
                } else {
                    calcOperationInput.value += userEntryResult.value.slice(0, -1);
                }
        }
    })
})

// alClear Listener to clear calculator
allClear.addEventListener("click", () => reloadCalculator());

// deleteButton listener to run function deleteLastofUserEntryResult
deleteButton.addEventListener("click", () => deleteLastofUserEntryResult());

// Change math listener to change between positive and negative number
changeMath.addEventListener("click", () => changeMathPositiveNegativeNumber());

// This function add numbers and operatos on calculator screen
function addUserEntryResultButtonSelected(numberOperation) {
    let lastValueOnUserEntryResult = userEntryResult.value[userEntryResult.value.length-1]
    if(!Number(lastValueOnUserEntryResult) && !Number(numberOperation) && lastValueOnUserEntryResult != 0 && numberOperation != 0) {
        deleteLastofUserEntryResult();
    }
    if(userEntryResult.value.length===0 && numberOperation === ".") {
        userEntryResult.value = "0.";
        decimalAllowed = true;
        return;
    }
    if(userEntryResult.value.length===0 && !Number(numberOperation)) { // Prevent Symbol on start
        return;
    }

    if(calcOperationInput.value != "" && restartUserInput) {
        userEntryResult.value = ""
        restartUserInput = false;
    }
    
    userEntryResult.value += numberOperation;
    
}

function reloadCalculator() {
    userEntryResult.value = "";
    calcOperationInput.value = "";
}

// This function delete the last element of calculator screen
function deleteLastofUserEntryResult() {
    userEntryResult.value = userEntryResult.value.slice(0, -1);
}

// This function changes a number for positive or negative
function changeMathPositiveNegativeNumber() {
    if(Number(userEntryResult.value)) {
        userEntryResult.value = userEntryResult.value*(-1);
    }
}

function mathOperation() {
    for(let i=0; i < calcOperationInput.value.length; i++) {
        if(mathOp.includes(calcOperationInput.value[i])) {
            switch(calcOperationInput.value[i]) {
                case "+":
                    let number1 = calcOperationInput.value.slice(0,i)*1
                    let number2 = calcOperationInput.value.slice(i+1,calcOperationInput.value.length)*1
                    let soma = number1 + number2;
                    calcOperationInput.value = "";
                    userEntryResult.value = soma;
    
                case "*":
                    let number3 = calcOperationInput.value.slice(0,i)*1
                    let number4 = calcOperationInput.value.slice(i+1,calcOperationInput.value.length)*1
                    let mult = number3*number4;
                    calcOperationInput.value = "";
                    userEntryResult.value = mult;
                case "/":
                    let number5 = calcOperationInput.value.slice(0,i)*1
                    let number6 = calcOperationInput.value.slice(i+1,calcOperationInput.value.length)*1
                    let div = number5/number6;
                    calcOperationInput.value = "";
                    userEntryResult.value = div;
                case "-":
                    let number7 = calcOperationInput.value.slice(0,i)*1
                    let number8 = calcOperationInput.value.slice(i+1,calcOperationInput.value.length)*1
                    let sub = number7-number8;
                    calcOperationInput.value = "";
                    userEntryResult.value = sub;
            }
        }
    }
}

resultButton.addEventListener("click", () => {
    if(calcOperationInput.value != "") {
        calcOperationInput.value += userEntryResult.value;
        userEntryResult.value = "";
        mathOperation();
    }    
})