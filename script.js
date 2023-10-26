// Global Constants

const allButtons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".number-button");
const operateButtons = document.querySelectorAll(".operate-button");
const acButton = document.querySelector("#ac-button");
const dotButton = document.querySelector("#dot-button");
const signflipButton = document.querySelector("#signflip-button");
const percentButton = document.querySelector("#percent-button");
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
    switch (operator) {
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

function isDisplayUpdateable() {
    return displayValue.offsetWidth < 9 / 10 * display.offsetWidth;
}

function updateDisplayValue(number) {
    if (displayValue.textContent == "0") {
        displayValue.textContent = "";
    }

    if (displayValue.textContent == "-0") {
        displayValue.textContent = "-";
    }

    if (isRefreshable) {
        displayValue.textContent = "";
        isRefreshable = false;
    }

    if (isDisplayUpdateable()) {
        displayValue.textContent += number;
    }
}


function displayResult(result) {
    if (+result > 99999999999 || (+result < 0.000000001 && +result > 0)
        || +result < -9999999999 || (+result < 0 && +result > -0.00000001)) {
        result = Number.parseFloat(result).toExponential(2);
    }

    displayValue.textContent = result;
    length = displayValue.textContent.length;
    while (displayValue.offsetWidth > display.offsetWidth) {
        displayValue.textContent = Number.parseFloat(displayValue.textContent).toFixed(length);
        length--;
    }
}

function addDecimalPoint() {
    if (!displayValue.textContent.includes(".") && isDisplayUpdateable()) {
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
    if (displayValue.textContent == "NaN") {
        clear();
    }
}

function flipSign() {
    if (displayValue.textContent.charAt(0) == "-") {
        displayValue.textContent = displayValue.textContent.slice(1);
    } else {
        if (isDisplayUpdateable()) {
            displayValue.textContent = "-" + displayValue.textContent;
        }
    }


    
}

function percent() {
    if (isDisplayUpdateable()) {
        displayValue.textContent = +displayValue.textContent / 100;
    }
}

function operationLogic() {
    if (!isCalculating) {
        if (this.textContent != "=") {
            firstNumber = displayValue.textContent;
            isCalculating = true
        }
    } else {
        secondNumber = displayValue.textContent;
        result = operate(firstNumber, secondNumber, operator);

        displayResult(result);

        if (this.textContent == "=") {
            isCalculating = false;
        } else {
            isCalculating = true;
            firstNumber = displayValue.textContent;
        }
    }
    operator = this.textContent;
    isRefreshable = true;
}

// Button Initializers

function initializeAllButtons(buttonList) {
    buttonList.forEach((element) => element.addEventListener("click", nanHandling))
}

function initializeNumberButtons(buttonList) {
    buttonList.forEach((element) => element.addEventListener("click", function () {
        updateDisplayValue(this.textContent);
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

function initializeSignflipButton(button) {
    button.addEventListener("click", flipSign);
}

function initializePercentButton(button) {
    button.addEventListener("click", percent)
}

// Constructing the Main Function

function main() {
    initializeAllButtons(allButtons);
    initializeNumberButtons(numberButtons);
    initializeOperateButtons(operateButtons);
    initializeAcButton(acButton);
    initializeDotButton(dotButton);
    initializeSignflipButton(signflipButton);
    initializePercentButton(percentButton);
}

main();