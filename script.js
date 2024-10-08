document.addEventListener('DOMContentLoaded', function() {

//Variables
let num1 = '';
let num2 = '';
let operator = '';
let result = '';
let currentResult = '';



//DOM Elements
const output = document.getElementById('output');
output.innerText = '0';

//Functions

function add(num1, num2)  {
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
}

function operate(operator, num1, num2) {
    switch (operator)   {

        case '+':
            return add(parseFloat(num1), parseFloat(num2));
            break;

        case '-':
            return subtract(parseFloat(num1), parseFloat(num2));
            break;

        case '*':
            return multiply(parseFloat(num1), parseFloat(num2));
            break;

        case '/':
            return divide(parseFloat(num1), parseFloat(num2));
            break;
    }
}

function parseEquation(input)    {

    if (input.includes('+'))    {
        let equation = input.split('+');
        num1 = equation[0];
        num2 = equation[1];
        operator = '+';
        currentResult = operate(operator, num1, num2);
        output.innerText = currentResult;
    }
    else if (input.includes('-'))    {
        let equation = input.split('-');
        num1 = equation[0];
        num2 = equation[1];
        operator = '-';
        currentResult = operate(operator, num1, num2);
        output.innerText = currentResult;
}
    else if (input.includes('×'))    {
        input = input.replace(/×/g, '*');
        let equation = input.split('*');
        num1 = equation[0];
        num2 = equation[1];
        operator = '*';
        currentResult = operate(operator, num1, num2);
        output.innerText = currentResult;
    }
    else if (input.includes('÷'))    {
        input = input.replace(/÷/g, '/');
        if (input.includes('0') )   return alert("Hey! I see what you did there, you tried to break my calculator.\nPlease do not try and divide anything by 0.");
        let equation = input.split('/');
        num1 = equation[0];
        num2 = equation[1];
        operator = '/';
        currentResult = operate(operator, num1, num2);
        output.innerText = currentResult;
    }
}

/*function operatorPressDown(operator)    {

    if (currentResult !== null)    {
        result = currentResult + operator;
        output.innerText = result;
        currentResult = null;
    }
    else    {
        currentResult = parseEquation();
        output.innerText = currentResult;
    }
}*/

//Event Listeners
const buttons = document.querySelectorAll('.btn');
    for ( let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            const buttonValue = buttons[i].innerText;
            if (output.innerText === '0') {
                output.innerText = buttonValue
            } else {
        output.innerText += buttonValue;
            }
        });
    };

const buttonErase = document.querySelector('.btn-ac');
    buttonErase.addEventListener('click', () => {
        output.innerText = '0';
        num1 = '';
        num2 = '';
        operator = '';
        result = '';
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
});

/*const plusBtn = document.querySelector('#plusBtn');
plusBtn.addEventListener('click', ()    => {
    operatorPressDown();
})*/
});
