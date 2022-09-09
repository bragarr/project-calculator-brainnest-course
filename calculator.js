let buttonOperation = document.querySelectorAll(".calc__buttons");
let allClear = document.querySelector(".all__clear");
let deleteButton = document.querySelector(".delete__button");
let resultButton = document.querySelector(".result__button");
let userEntryResult = document.querySelector(".user__entry");
let changeMath = document.querySelector(".change__math");
let restartUserInput = false;
let alreadyChoseOperation = false;
let alreadyChoseDote = false;
const mathOp = ["+","-","/","*"]

// buttonOperation Listener to turn on buttons
buttonOperation.forEach(button => {
    button.addEventListener("click", () => {
        let buttonSelectedByUser = button.dataset.value;
        addUserEntryResultButtonSelected(buttonSelectedByUser);
        if(buttonSelectedByUser === ".") {
            alreadyChoseDote = true;
        }
    })
})

// alClear Listener to clear calculator
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
    if(!Number(lastValueOnUserEntryResult) && !Number(numberOperation) && lastValueOnUserEntryResult != 0 && numberOperation != 0) {
        deleteLastofUserEntryResult();
    }
    if(userEntryResult.value.length===0 && numberOperation === ".") {
        userEntryResult.value = "0.";
        return;
    }
    if(userEntryResult.value.length===0 && !Number(numberOperation)) { // Prevent Symbol on start
        return;
    }
    if(restartUserInput && Number(numberOperation)) {  //After complete a operation, if user select a new number, a new operation starts
        reloadCalculator();
        restartUserInput = false;
    }
    if(alreadyChoseDote && numberOperation === ".") {
        return;
    }
    if(mathOp.includes(numberOperation)) {
        alreadyChoseOperation = true;
        alreadyChoseDote = false;
    }
    if(alreadyChoseOperation && mathOp.includes(numberOperation)) {
        operate();
        alreadyChoseOperation = false;
    }
    userEntryResult.value += numberOperation;
    restartUserInput = false; 
}

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
    }
}

function operate() {
    for(let i=0; i < userEntryResult.value.length; i++) {
        if(mathOp.includes(userEntryResult.value[i]) && i !=0) {
            switch(userEntryResult.value[i]) {
                case "+":
                    let sum = userEntryResult.value.slice(0,i)*1 + 
                    userEntryResult.value.slice(i+1, userEntryResult.value.length)*1
                    userEntryResult.value = sum;
                    break;
                case "-":
                    let minus = userEntryResult.value.slice(0,i)*1 - 
                    userEntryResult.value.slice(i+1, userEntryResult.value.length)*1
                    userEntryResult.value = minus;
                    break;
                case "/":
                    let div = userEntryResult.value.slice(0,i)*1 / 
                    userEntryResult.value.slice(i+1, userEntryResult.value.length)*1
                    userEntryResult.value = div;
                    break;    
                case "*":
                    let times = userEntryResult.value.slice(0,i)*1 * 
                    userEntryResult.value.slice(i+1, userEntryResult.value.length)*1
                    userEntryResult.value = times;
                    break;        
            }
        }

    }
    restartUserInput = true;
}