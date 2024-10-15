document.addEventListener('DOMContentLoaded', function() {

//Variables
let num1 = '';
let num2 = '';
let operator = '';
let currentOperator = '';
let currentResult = '';
let currentEquation = '';
let lastActionValidCalculation = false;

const validEquation = /^-?\d+(\s*[\+\-\*\/]\s*\d+)+$/;

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
    console.log(input);
    const lastChar = input.trim().slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
    input = input.trim().slice(0, -1);      // Remove last operator if it's not followed by a number
    }

    if (input.includes('+'))    {
        let equation = input.split('+');
        num1 = equation[0];
        num2 = equation[1];
        operator = '+';
        currentResult = operate(operator, num1, num2);
        output.innerText = currentResult;
    }   
    else if (input.includes('*'))    {
        let equation = input.split('*');
        num1 = equation[0];
        num2 = equation[1];
        operator = '*';
        currentResult = operate(operator, num1, num2);
        output.innerText = currentResult;
    }
    else if (input.includes('/'))    {
        let equation = input.split('/');
        num1 = equation[0];
        num2 = equation[1];
        operator = '/';
        if (divideByZero(num1, num2))   {
            return;
        }
        currentResult = operate(operator, num1, num2);
        output.innerText = currentResult;
    }  
    /*else if (input.includes('-'))    {
        let equation = input.split('-');
        console.log('Equation:', equation);
        num1 = equation[0];
        num2 = equation[1];
        operator = '-';
        currentResult = operate(operator, num1, num2);
        output.innerText = currentResult;
    }
};*/

function divideByZero(x, y) {
    if (x === '0' || y === '0') {
        output.innerText = '0';
        currentEquation = '';
        currentResult = '';
        num1 = '';
        num2 = '';
        operator = '';
        currentOperator = '';
        alert("Hey! I see what you did there, you tried to break my calculator.\nPlease do not try and divide anything by 0.");
        return true;
    }
}

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
        parseEquation(output.innerText);
        output.innerText = currentResult + currentOperator;
        lastActionValidCalculation = false;
    }
};

//Event Listeners
const plusMinusBtn = document.querySelector('.plus-minusBtn');
plusMinusBtn.addEventListener('click', ()   =>  {

    if (output.innerText.includes('-', 0)) {
        let str = output.innerText;
        let arr = Array.from(str).slice(1).join('');
        output.innerText = arr;
        return output.innerText;
    }   else if (output.innerText.length > 1 || output.innerText !== 0)  {
        let str = output.innerText;
        let arr = Array.from(str);
        let addToArr = arr.unshift('-');
        let revertedString = arr.join('');
        output.innerText = revertedString;
        return output.innerText;
    }   else    {
        output.innerText = '-';
        }
});

const numBtn = document.querySelectorAll('.numBtn');
    for ( let i = 0; i < numBtn.length; i++) {
        numBtn[i].addEventListener('click', (event) => {
            let buttonValue = event.target.innerText;
            if (output.innerText === '0') {
                output.innerText = buttonValue;
                currentEquation = buttonValue;
            } else {
                output.innerText += buttonValue;
                currentEquation += buttonValue;
            }
            checkEquation(currentEquation);
        })
    };

const opBtn = document.querySelectorAll('.opBtn');
    for ( let i =0; i <opBtn.length; i++ )  {
        opBtn[i].addEventListener('click', (event)   =>  {
        let buttonValue = event.target.innerText;
        if (divideByZero(num1, num2))   {
            return;
        }
        else if (output.innerText === '0') {
            output.innerText = buttonValue;
            currentEquation = buttonValue;
            currentOperator = buttonValue;
            } else {
                output.innerText += buttonValue;
                currentEquation += buttonValue;
                currentOperator = buttonValue;
            }
        checkEquation(currentEquation);
        calculateValidEquation(output.innerText);  
        currentEquation = output.innerText
        console.log('Current Equation', currentEquation);
        })
    };

const buttonErase = document.querySelector('.btn-ac');
    buttonErase.addEventListener('click', () => {
        output.innerText = '0';
        num1 = '';
        num2 = '';
        operator = '';
        currentEquation = '';
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
    parseEquation(output.innerText);
    currentEquation = output.innerText;
    console.log('Current Equation', currentEquation);
});

const buttonDot = document.querySelector('#dot');
buttonDot.addEventListener('click', ()  =>  {
buttonDot.setAttribute('disabled', 'disabled');
})
});




