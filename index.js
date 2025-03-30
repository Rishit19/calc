// Get references to DOM elements
const numberContainer = document.querySelector('#numbers-container');
const display = document.querySelector('#display');
const operatorButtons = document.querySelectorAll('.operators-button');

// Create digit buttons 0–9
for (let i = 0; i <= 9; i++) {
    const btn = document.createElement('button');
    btn.classList.add('digits-button');
    btn.textContent = i;
    btn.addEventListener('click', () => {
        currentInput += i;
        updateDisplay(currentInput);
    });
    numberContainer.appendChild(btn);
}

// Calculator state
let currentInput = '';
let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let resultShown = false;

// Update display
function updateDisplay(value) {
    display.textContent = value;
}

// Perform calculation
function calculate() {
    const a = parseFloat(firstOperand);
    const b = parseFloat(secondOperand);
    if (isNaN(a) || isNaN(b)) return 'Error';

    switch (currentOperator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/':
            if (b === 0) return 'Error: Divide by 0';
            return a / b;
        default: return 'Error';
    }
}

// Handle operator click
operatorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const op = btn.textContent;

        if (op === 'C') {
            currentInput = '';
            firstOperand = '';
            secondOperand = '';
            currentOperator = null;
            resultShown = false;
            updateDisplay('');
            return;
        }

        if (op === '=') {
            if (firstOperand && currentOperator && currentInput) {
                secondOperand = currentInput;
                const result = calculate();
                updateDisplay(result);
                currentInput = result.toString();
                firstOperand = '';
                secondOperand = '';
                currentOperator = null;
                resultShown = true;
            }
            return;
        }

        // If operator is pressed after a result, continue chaining
        if (resultShown) {
            firstOperand = currentInput;
            resultShown = false;
        } else if (!firstOperand) {
            firstOperand = currentInput;
        } else if (currentInput) {
            secondOperand = currentInput;
            const result = calculate();
            updateDisplay(result);
            firstOperand = result.toString();
        }

        currentOperator = op;
        currentInput = '';
        updateDisplay(firstOperand + ' ' + currentOperator + ' ');
    });
});