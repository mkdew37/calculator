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

function operate(operator, num1, num2) {
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
    if (divideByZero(num1, num2))   {
        return;
    }
    result = operate(operator, num1, num2);
    if (String(result).includes('.'))    {
        let roundedResult = Math.round(result * 100) / 100;
        return output.innerText = roundedResult;
    }
    output.innerText = result
};

function divideByZero(x, y) {
    if (x === '0' || y === '0') {
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

function checkEquation(equation)  {
    if (isValidEquation(equation))    {
        lastActionValidCalculation = true;
    }
};

function calculateValidEquation(calculate)  {
    if(lastActionValidCalculation) {
        parseEquation(equation);
        output.innerText = result + currentOperator;
        lastActionValidCalculation = false;
    }
};

function initializeInput(buttonValue)   {
    output.innerText = buttonValue;
    equation = buttonValue;
    currentOperator = buttonValue; 
};

function addToCurrentInput(buttonValue) {
    output.innerText += buttonValue;
    equation += buttonValue;
    currentOperator = buttonValue;
};
//Event Listeners
const plusMinusBtn = document.querySelector('.plus-minusBtn');
plusMinusBtn.addEventListener('click', ()   =>  {
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
});

const numBtn = document.querySelectorAll('.numBtn');
    for ( let i = 0; i < numBtn.length; i++) {
        numBtn[i].addEventListener('click', (event) => {
            let buttonValue = event.target.innerText;
            if (output.innerText === '0' && buttonValue === '.')    {
                output.innerText = '0.';
            }
            output.innerText === '0' ?
            initializeInput(buttonValue) : 
            addToCurrentInput(buttonValue);
            checkEquation(equation);
            opBtn.forEach(button => {
                button.removeAttribute('disabled', 'disabled');
                button.style.backgroundColor = 'rgb(61, 207, 207)';
            })
        })
    };

const opBtn = document.querySelectorAll('.opBtn');
    for ( let i =0; i <opBtn.length; i++ )  {
        opBtn[i].addEventListener('click', (event)   =>  {
        let buttonValue = event.target.innerText;
        if (divideByZero(num1, num2))   {
            return;
        } 
        output.innerText === '0' ?
        initializeInput(buttonValue) : 
        addToCurrentInput(buttonValue);

        checkEquation(equation);
        calculateValidEquation(output.innerText);  
        equation = output.innerText
        buttonDot.removeAttribute('disabled');
        opBtn.forEach(button => {
            button.setAttribute('disabled', 'disabled');
            button.style.backgroundColor = 'grey';
        })
        })
    };

const buttonErase = document.querySelector('.btn-ac');
    buttonErase.addEventListener('click', () => {
        output.innerText = '0';
        num1 = '';
        num2 = '';
        operator = '';
        equation = '';
        result = '';
        currentOperator = '';
        lastActionValidCalculation = false;
        buttonDot.removeAttribute('disabled');
    });

const buttonDelete = document.querySelector('.btn-del');
buttonDelete.addEventListener('click', () => {
    if (output.innerText.length === 1)  {
        output.innerText = '0';
    }
    else    {
        let numberToString = output.innerText.toString();
        let deleteLast = numberToString.slice(0, numberToString.length - 1);
        output.innerText = deleteLast;
    }
});

const buttonEqual = document.querySelector('.btnEqual');
buttonEqual.addEventListener('click', () => {
    checkEquation(output.innerText)
    if (lastActionValidCalculation === true)    {
        parseEquation(output.innerText);
        currentEquation = output.innerText;
    }   else    {
        output.innerText = '0';
        equation = '';
        result = '';
        num1 = '';
        num2 = '';
        operator = '';
        currentOperator = '';
        lastActionValidCalculation = false;
        alert('This is not a valid equation.\nPlease try again.');
    }  
});

const buttonDot = document.querySelector('#dot');
buttonDot.addEventListener('click', ()  =>  {
buttonDot.setAttribute('disabled', 'disabled');
});
});