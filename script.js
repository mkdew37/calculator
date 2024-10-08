//Variables
let number1 = '';
let number2 = '';
let operator = '';
let result = '';



//DOM Elements
const output = document.querySelector('#output');
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
            return add(num1, num2);
            break;

        case '-':
            return subtract(num1, num2);
            break;

        case '*':
            return multiply(num1, num2);
            break;

        case '/':
            return divide(num1, num2);
            break;
    }
}

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
        number1 = '';
        number2 = '';
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



function parseEquation(input)    {

    if (input.includes('+'))    {
        let equation = input.split('+');
        num1 = equation[0];
        num2 = equation[1];
        operator = '+';
        return {
            num1,
            num2, 
            operator
        }
    }
    operate();
}