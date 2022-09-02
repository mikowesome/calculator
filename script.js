const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');
const equalsButton = document.querySelector('.equals');
const allClearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');

let currentOperand = '';
let previousOperand = '';
let currentOperator = undefined;

numberButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent);
    });
});

operatorButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent);
    })
})

allClearButton.addEventListener('click', () => clear());
equalsButton.addEventListener('click', () => calculate());
deleteButton.addEventListener('click', () => deleteCurrentOperand());

function handleNumber(number) {
    currentOperand += number;
    currentOperandElement.textContent = currentOperand;
}

function handleOperator(operator) {
    if (previousOperand === '') {
        currentOperator = operator;
        previousOperand = currentOperand;
        previousOperandElement.textContent = `${previousOperand} ${currentOperator}`;
        currentOperand = '';
        currentOperandElement.textContent = '';
    } else {
        convertToNumber();
        operate();
        currentOperator = operator;
        previousOperandElement.textContent = `${previousOperand} ${currentOperator}`;
        currentOperand = '';
        currentOperandElement.textContent = '';
    }
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    currentOperator = '';
    currentOperandElement.textContent = '';
    previousOperandElement.textContent = '';
}

function deleteCurrentOperand() {
    currentOperand = '';
    currentOperandElement.textContent = '';
}

function calculate() {
    convertToNumber();
    operate();
    updateDisplay();
}

function operate() {
    if (currentOperator === "÷") {
        if (currentOperand <= 0) {
            previousOperand = "Error";
            previousOperandElement.textContent = '';
            currentOperandElement.textContent = previousOperand;
            currentOperator = '';
            return
        }
        previousOperand /= currentOperand;
    } else if (currentOperator === "x") {
        previousOperand *= currentOperand;
    } else if (currentOperator === "-") {
        previousOperand -= currentOperand;
    } else if (currentOperator === "+") {
        previousOperand += currentOperand;
    }
}

function updateDisplay() {
    previousOperandElement.textContent = '';
    currentOperandElement.textContent = previousOperand;
    currentOperand = previousOperand;
}

function convertToNumber() {
    previousOperand = Number(previousOperand);
    currentOperand = Number(currentOperand);
}