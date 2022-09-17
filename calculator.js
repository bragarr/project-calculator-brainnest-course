// Variables
let buttonOperation = document.querySelectorAll(".calc__buttons");
let allClear = document.querySelector(".all__clear");
let deleteButton = document.querySelector(".delete__button");
let resultButton = document.querySelector(".result__button");
let userEntryResult = document.querySelector(".user__entry");
let changeMath = document.querySelector(".change__math");
let restartUserInput = false;
let alreadyChosenOperation = false;
let dot = false;
let opCount = 0;
let dotcount = 0;
const mathOp = ["+","-","/","*"];
// buttonOperation Listener to turn on buttons
buttonOperation.forEach(button => {
    button.addEventListener("click", () => {
        let buttonSelectedByUser = button.dataset.value;
        for(let i=0; i < userEntryResult.value.length; i++) {  //Loop and conditions to not repeat dot on operations
            if(mathOp.includes(userEntryResult.value[i])) {
                opCount += 1;
            } else if(userEntryResult.value[i]===".") {
                dotcount += 1;
            } else if(userEntryResult.value[i]==="." && buttonSelectedByUser===".") {
                dotcount +=2;
            }
        }
        if(dotcount===0 && opCount===0) {
            dot = false;
        }
        if(dotcount===1 && opCount===0) {
            dot = true;
        }
        if(dotcount === 1 && opCount===1 ||
            dotcount === 2 && opCount===1
        ) {
            dot = false;
        }
        if(dotcount >= 2 && opCount===1) {
            dot = true;
        }
        addUserEntryResultButtonSelected(buttonSelectedByUser);
        opCount = 0;
        dotcount =0;
        calculatorLimit();
    })
})

// allClear Listener to clear calculator
allClear.addEventListener("click", () => reloadCalculator());

// deleteButton listener to run function deleteLastofUserEntryResult
deleteButton.addEventListener("click", () => deleteLastofUserEntryResult());

// Change math listener to change between positive and negative number
changeMath.addEventListener("click", () => changeMathPositiveNegativeNumber());

// Operates Calculator Math chosen by user
resultButton.addEventListener("click", () => operate());

// This function add numbers and operatos on calculator screen
function addUserEntryResultButtonSelected(numberOperation) {
    let lastValueOnUserEntryResult = userEntryResult.value[userEntryResult.value.length-1]
    let beforeLastValue = userEntryResult.value[userEntryResult.value.length-2];
    // This condition changes Math symbol each time users press button
    if(mathOp.includes(lastValueOnUserEntryResult) &&
        mathOp.includes(numberOperation) || 
        userEntryResult.value === "0" && numberOperation==="0" ||
        userEntryResult.value==="0" && 
        Number(numberOperation)
    ) {
        deleteLastofUserEntryResult();
    }
    // Prevent Symbol on start
    if(userEntryResult.value.length===0 && mathOp.includes(numberOperation)) {
        return;
    }
    //After complete a operation, if user select a new number, a new operation starts
    if(restartUserInput && Number(numberOperation)) {  
        reloadCalculator();
        restartUserInput = false;
    }
    //Changes boolean for condition to run opration due Math Symbol
    if(mathOp.includes(numberOperation)) {
        alreadyChosenOperation = true;
    }
    //if user selects a second math symbol, the first operation on screen runs
    if(alreadyChosenOperation && mathOp.includes(numberOperation)) {
        operate();
        alreadyChosenOperation = false;
    }
    // prevents user to include multiple zeros on second number
    if(mathOp.includes(beforeLastValue) && 
        lastValueOnUserEntryResult === "0" &&
        numberOperation === "0" ||
        mathOp.includes(beforeLastValue) && 
        lastValueOnUserEntryResult === "0" && 
        Number(numberOperation)
    ) {
        deleteLastofUserEntryResult();
    }
    // if user select dot at the beggining calculator screen will display "0."
    if(userEntryResult.value==="" && numberOperation===".") {
        userEntryResult.value = "0";
    }
    // prevents user to input multiples dot or a dot after a math operation
    if(dot && numberOperation==="." ||
        mathOp.includes(lastValueOnUserEntryResult) &&
        numberOperation==="." ||
        lastValueOnUserEntryResult==="." &&
        numberOperation==="."
    ) {
        return;
    }
    userEntryResult.value += numberOperation;
    restartUserInput = false; 
}
// this function reloads calculator
function reloadCalculator() {
    userEntryResult.value = "";
}

// This function delete the last element of calculator screen
function deleteLastofUserEntryResult() {
    userEntryResult.value = userEntryResult.value.slice(0, -1);
}

// This function changes a number for positive or negative
function changeMathPositiveNegativeNumber() {
    if(Number(userEntryResult.value)) {
        userEntryResult.value = userEntryResult.value*(-1);
        opCount = 0;
        dotcount =0;
    }
}

// this function operates calculator due user choices on screeen
function operate() {
    for(let i=0; i < userEntryResult.value.length; i++) {
        let number1 = userEntryResult.value.slice(0,i)*1;
        let number2 = userEntryResult.value.slice(i+1,userEntryResult.value.length)*1;
        if(mathOp.includes(userEntryResult.value[i]) && i!=0) {
            switch(userEntryResult.value[i]) {
                case "+":
                    let sum = number1 + number2; 
                    userEntryResult.value = sum;
                    break;
                case "-":
                    let minus = number1 - number2;
                    userEntryResult.value = minus;
                    break;
                case "/":
                    let div = number1 / number2;
                    userEntryResult.value = div;
                    break;    
                case "*":
                    let times = number1 * number2;
                    userEntryResult.value = times;
                    break;
            }
        }
        if(userEntryResult.value*1 === Infinity ||
            userEntryResult.value*1 === -Infinity
        ) {
            userEntryResult.value = "To infinity, and beyond😉";
        }
    }
    toFixLongNumbers();
    restartUserInput = true;
    dot = false;
}

// Command to turn on keyboard for calculator
window.addEventListener('keydown', (e) => { 
    if(
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.' ||
        e.key === '*' ||
        e.key === '+' ||
        e.key === '-' ||
        e.key === '/'

    ) {
        clickButton(e.key);
    } else if(
        e.key === '*' ||
        e.key === '+' ||
        e.key === '-' ||
        e.key === '/'
    ) {
        clickOperation(e.key);
    } else if(
        e.key ==='Enter' ||
        e.key ==="="
    ) { 
        clickEqual();
    } else if(
        e.key ==="Delete"
    ) {
        clickDel();
    } else if(
        e.key ==="Backspace"        
    ) {
        clickAllClear();
    }
});

// Keyboard functions
function clickButton(key) {
    buttonOperation.forEach(button => {
        if(button.dataset.value === key) {
            button.click();
        }
    })
}

function clickEqual() {
    resultButton.click();
}

function clickDel() {
    deleteButton.click();
}

function clickAllClear() {
    allClear.click();
}

// Function to fix limit result and inputs
function toFixLongNumbers() {
    if(userEntryResult.value.length > 12 && Number(userEntryResult.value*1)) {
        longNumber = userEntryResult.value*1;
        userEntryResult.value = userEntryResult.value.slice(0,12)
    } else {
        userEntryResult === userEntryResult;
    }
}

function calculatorLimit() {
    if(userEntryResult.value.length > 25) {
        deleteLastofUserEntryResult();
    }
}