document.addEventListener('DOMContentLoaded', function() {

//Variables
let num1 = '';
let num2 = '';
let operator = '';
let currentOperator = '';
let result = '';
let equation = '';
let lastActionValidCalculation = false;

const validEquation = /^(-?\d+\.?\d*)\s*([\+\-\*\/])\s*(-?\d+\.?\d*)$/;

//DOM Elements
const output = document.getElementById('output');
output.innerText = '0';

//Functions
function add(num1, num2)    {
    return num1 + num2;
}
function subtract(num1, num2)   {
    return num1 - num2;
}
function multiply(num1, num2)   {
    return num1 * num2;
}
function divide(num1, num2) {
    return num1/num2;
};

function performOperation(operator, num1, num2) {
    switch (operator)   {
        case '+':
            return add(parseFloat(num1), parseFloat(num2));
        case '-':
            return subtract(parseFloat(num1), parseFloat(num2));
        case '*':
            return multiply(parseFloat(num1), parseFloat(num2));
        case '/':
            return divide(parseFloat(num1), parseFloat(num2));
   }
};

function parseEquation(input)    {
    const lastChar = input.trim().slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        input = input.trim().slice(0, -1);
    }
    const regex = /^(?<firstNumber>-?\d+\.?\d*)\s*(?<operator>[\+\-\*\/])\s*(?<secondNumber>-?\d+\.?\d*)$/;
    const match = input.match(regex);
    if (match)    {
        num1 = match.groups.firstNumber;
        num2 = match.groups.secondNumber;
        operator = match.groups.operator
    }
    if (checkForDivisionByZero(num2, operator))   {
        return;
    }
    result = performOperation(operator, num1, num2);
    if (String(result).includes('.'))    {
        let roundedResult = Math.round(result * 100) / 100;
        return output.innerText = roundedResult;
    }
    output.innerText = result
};

function checkForDivisionByZero(y, operator) {
    if (operator === '/' && y === '0') {
        output.innerText = '0';
        equation = '';
        result = '';
        num1 = '';
        num2 = '';
        operator = '';
        currentOperator = '';
        lastActionValidCalculation = false;
        alert("Hey! I see what you did there, you tried to break my calculator.\nPlease do not try and divide anything by 0.");
        return true;
    }
};

function isValidEquation(testEquation)  {
    return validEquation.test(testEquation);
};

function validateEquation(equation)  {
    if (isValidEquation(equation))    {
        lastActionValidCalculation = true;
    }
};

function calculateResultIfValid(calculate)  {
    if(lastActionValidCalculation) {
        parseEquation(equation);
        output.innerText = result + currentOperator;
        lastActionValidCalculation = false;
    }
};

function setInitialInput(buttonValue)   {
    output.innerText = buttonValue;
    equation = buttonValue;
    currentOperator = buttonValue; 
};

function addToCurrentInput(buttonValue) {
    output.innerText += buttonValue;
    equation += buttonValue;
    currentOperator = buttonValue;
};

function togglePlusMinusSign()   {
    if (output.innerText.includes('-', 0)) {
        let str = output.innerText;
        let arr = Array.from(str).slice(1).join('');
        output.innerText = arr;
        return output.innerText;
    }   else if (output.innerText === '0')    {
        output.innerText = '-';
    }   else    {
        let str = output.innerText;
        let arr = Array.from(str);
        let addToArr = arr.unshift('-');
        let revertedString = arr.join('');
        output.innerText = revertedString;
        return output.innerText;
    }   
};

function handleNumberButtonClick(event)  {
    let buttonValue = event.target.innerText;
    console.log(equation);
    if (output.innerText === '0' && buttonValue === '.')    {
        output.innerText = '0.';
        return;
    }
    output.innerText === '0' ?
    setInitialInput(buttonValue) : 
    addToCurrentInput(buttonValue);
    validateEquation(equation);
};

function handleOperatorButtonClick(event)   {
    let buttonValue = event.target.innerText;
    console.log(equation);
    if (checkForDivisionByZero(num2, operator))   {
        return;
    }
    output.innerText === '0' ?
    setInitialInput(buttonValue) : 
    addToCurrentInput(buttonValue);
    validateEquation(equation);
    calculateResultIfValid(output.innerText);  
    equation = output.innerText
    buttonDot.removeAttribute('disabled');
};

function deleteLastCharacter()  {
    if (output.innerText.length === 1)  {
        output.innerText = '0';
        equation = '';
        operator = '';
        result = '';
        currentOperator = '';
        lastActionValidCalculation = false;
    }
    else    {
        let numberToString = output.innerText.toString();
        let deleteLast = numberToString.slice(0, numberToString.length - 1);
        output.innerText = deleteLast;
        if (['+', '-', '*', '/'].includes(numberToString[numberToString.length - 1])) {
            currentOperator = '';
            operator = '';
            lastActionValidCalculation = false;
        }
        output.innerText = deleteLast || '0';
        equation = deleteLast || '';
    }
};

function clearInputButton() {
    output.innerText = '0';
    num1 = '';
    num2 = '';
    operator = '';
    equation = '';
    result = '';
    currentOperator = '';
    lastActionValidCalculation = false;
    buttonDot.removeAttribute('disabled')
    opBtn.forEach(button => {
        button.removeAttribute('disabled');
    })
};

function equalButton()  {
    validateEquation(output.innerText)
    if (lastActionValidCalculation === true)    {
        parseEquation(output.innerText);
        equation = output.innerText;
    }   else    {
        output.innerText = '0';
        equation = '';
        result = '';
        num1 = '';
        num2 = '';
        operator = '';
        currentOperator = '';
        lastActionValidCalculation = false;
        alert('This is not a valid equation.\nPlease try again.')
    }
    opBtn.forEach(button => {
        button.removeAttribute('disabled');
    })
    String(result).includes('.') ? buttonDot.setAttribute('disabled', 'disabled') : 
                                                    buttonDot.removeAttribute('disabled'); 
};

//Mouse Event Listeners

//Toggle Plus/Minus
const plusMinusBtn = document.querySelector('.plus-minusBtn');
plusMinusBtn.addEventListener('click', ()   =>  {
    togglePlusMinusSign();
});
//Number Buttons
const numBtn = document.querySelectorAll('.numBtn');
    for ( let i = 0; i < numBtn.length; i++) {
        numBtn[i].addEventListener('click', (event) => {
            handleNumberButtonClick(event);
        })
    };
//Operator Buttons
const opBtn = document.querySelectorAll('.opBtn');
    for ( let i =0; i <opBtn.length; i++ )  {
        opBtn[i].addEventListener('click', (event)   =>  {
            handleOperatorButtonClick(event);
        })
    };
//Clear Input Button
const buttonErase = document.querySelector('.btn-ac');
    buttonErase.addEventListener('click', () => {
        clearInputButton();
    });
//Delete Last Button
const buttonDelete = document.querySelector('.btn-del');
buttonDelete.addEventListener('click', () => {
    deleteLastCharacter();
});
// Equal Button
const buttonEqual = document.querySelector('.btnEqual');
buttonEqual.addEventListener('click', () => {
    equalButton();
});
//Decimal Button
const buttonDot = document.querySelector('#dot');
buttonDot.addEventListener('click', ()  =>  {
buttonDot.setAttribute('disabled', 'disabled');
})

//Keyboard Event Listeners
document.addEventListener('keydown', (event)  =>  {
    if (event.key === 'Enter') {
        key = equalButton();
    } else if (event.key === 'NumpadEnter') {
        key = equalButton();
    } else if (event.key === 'Backspace') {
        key = deleteLastCharacter();
    } else if (event.key === 'Delete') {
        key = clearInputButton();
    } else if (event.key === 'Escape') {
        key = clearInputButton();
    } else if ((event.key >= '0' && event.key <= '9') || event.key === '.') {
        if (event.key === '.' && buttonDot.disabled)  {
            return;
        }
        if (event.key === '.')  {
            buttonDot.setAttribute('disabled', 'disabled');
        }
        handleNumberButtonClick({
            target: {innerText : event.key}
        });
       event.preventDefault();
    } else if (['+', '-', '*', '/'].includes(event.key))    {
        handleOperatorButtonClick({
            target: {innerText : event.key}
        });
        event.preventDefault();
    }
});
});