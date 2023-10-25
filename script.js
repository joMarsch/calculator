// Global Constants

const numberButtons = document.querySelectorAll(".number-button");
const acButton = document.querySelector("#ac-button");
const display = document.querySelector(".display")
const displayValue = document.querySelector("#display-value");

// Global Varaibles

let firstNumber;
let secondNumber;
let operator;

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
        return "inf";
    }
    return firstNumber / secondNumber;
}

function updateDisplayValue(element) {
    if (displayValue.textContent == "0") {
        displayValue.textContent = "";
    }

    if (displayValue.offsetWidth < 9 / 10 * display.offsetWidth){
        displayValue.textContent += element.textContent;
    }
}

function initializeNumberButtons(buttonList) {
    buttonList.forEach((element) => element.addEventListener("click", function () { updateDisplayValue(this) }));
}

function initializeAcButton(button) {
    button.addEventListener("click", () => displayValue.textContent = "0");
}

// Constructing the Main Function

function main() {
    initializeNumberButtons(numberButtons);
    initializeAcButton(acButton)
}

main();