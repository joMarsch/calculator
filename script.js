// Global Constants

const allButtons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".number-button");
const operateButtons = document.querySelectorAll(".operate-button");
const acButton = document.querySelector("#ac-button");
const dotButton = document.querySelector("#dot-button");
const display = document.querySelector(".display");
const displayValue = document.querySelector("#display-value");

// Global Variables

let firstNumber;
let secondNumber;
let operator;
let isCalculating = false;
let isRefreshable = false;

// Used Function

function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}


function divide(firstNumber, secondNumber) {
    if (secondNumber == 0) {
        return "NaN";
    }
    return firstNumber / secondNumber;
}

function operate(firstNumber, secondNumber, operator) {
    let result;
    firstNumber = +firstNumber;
    secondNumber = +secondNumber;
    switch(operator) {
        case "+":
            result = add(firstNumber, secondNumber);
            break;
        case "-":
            result = subtract(firstNumber, secondNumber);
            break;
        case "*":
            result = multiply(firstNumber, secondNumber);
            break;
        case "/":
            result = divide(firstNumber, secondNumber);
            break;
        default:
            break;
    }
    return result;
}

function updateDisplayValue(element) {
    if (displayValue.textContent == "0") {
        displayValue.textContent = "";
    }

    if (isRefreshable) {
        displayValue.textContent = "";
        isRefreshable = false;
    }

    if (displayValue.offsetWidth < 9 / 10 * display.offsetWidth){
        displayValue.textContent += element.textContent;
    }
}

function addDecimalPoint() {
    if(!displayValue.textContent.includes(".")) {
        displayValue.textContent += ".";
    }
}

function clear() {
    displayValue.textContent = "0";
    clearVariables();
}

function clearVariables() {
    firstNumber = undefined;
    secondNumber = undefined;
    operator = undefined;
    isCalculating = false;
    isRefreshable = false;
}

function nanHandling() {
    if(displayValue.textContent == "NaN") {
        clear();
    }
}

function operationLogic() {// TODO: Refactor for readability
    if (isCalculating) {
        secondNumber = displayValue.textContent;
        result = operate(firstNumber, secondNumber, operator);

        displayValue.textContent = result;

        if (this.textContent == "=") {
            isCalculating = false;
        } else {
            isCalculating = true;
            firstNumber = displayValue.textContent;
        }
    } else {
        firstNumber = displayValue.textContent;
        isCalculating = true
    }
    operator = this.textContent;
    isRefreshable = true;
}

function initializeAllButtons(buttonList) {
    buttonList.forEach((element) => element.addEventListener("click", nanHandling))
}

function initializeNumberButtons(buttonList) {
    buttonList.forEach((element) => element.addEventListener("click", function () { 
        updateDisplayValue(this) 
    }));
}

function initializeAcButton(button) {
    button.addEventListener("click", clear);
}

function initializeDotButton(button) {
    button.addEventListener("click", addDecimalPoint);
}

function initializeOperateButtons(buttonList) {
    buttonList.forEach((element) => element.addEventListener("click", operationLogic));
}

// Constructing the Main Function

function main() {
    initializeAllButtons(allButtons);
    initializeNumberButtons(numberButtons);
    initializeOperateButtons(operateButtons);
    initializeAcButton(acButton);
    initializeDotButton(dotButton);
}

main();