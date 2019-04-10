let runningTotal = 0;
let input = '0';
let previousOperator = null;
const calc__heading = document.querySelector('.calc__heading');

document.querySelector('.calc__btn').addEventListener('click', function(event) {
    buttonClick(event.target.innerText);
});

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    }   else {
        handleNumber(value);
    }
    rerender();

}

function handleNumber(value) {
    if (input === '0') {
        input = value;
    }   else {
        input += value;
    }
}

function handleSymbol(value) {
    switch (value) {
        case 'C':
            input = '0';
            runningTotal = null;
        break;
        case '=':
           if (previousOperator === null) {
            return;
           } flushOperation(parseInt(input));
           previousOperator = null;
           input = '' + runningTotal;
           runningTotal = 0;
           break;
        case '←':
           if (input.length === 1) {
               input = '0';
           }    else {
               input = input.substring(0, input.length - 1);
           }
           break;
        default:
        handleMath(value);
        break;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(input) 
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    }   else {
        flushOperation(intBuffer);
    }

    previousOperator = value;

    input = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    }   else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    }   else if (previousOperator === '*') {
        runningTotal *= intBuffer;
    }   else {
        runningTotal /= intBuffer;
    }
}            
    


function rerender() {
    calc__heading.innerText = input;
}
