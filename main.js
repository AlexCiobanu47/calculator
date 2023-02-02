function add(a,b){
    return a+b;
}
function substract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}
function operate(operator, a, b){
    if(operator === '+'){
        return(add(a,b));
    }
    if(operator === '-'){
        return(substract(a,b));
    }
    if(operator === '*'){
        return(multiply(a,b));
    }
    if(operator === '/'){
        return(divide(a,b));
    }
}

const displayFirstRow = document.createElement('div');
const displaySecondRow = document.createElement('div');
const displayContainer = document.querySelector('.calculator-display');
displayContainer.append(displayFirstRow);
displayContainer.append(displaySecondRow);
let currentNumber = 0, previousDigit = 0;
let currentIndex = 1;
let operand1 = 0, operand2 = 0, result = 0;
let operator;
let currentOperator = true, firstOperation = true;
const btns = document.querySelectorAll('.number');
btns.forEach(btn => {
    btn.addEventListener('click', () =>{
        previousDigit = parseInt(btn.id);
        if(currentIndex === 1){
            currentNumber = btn.id;
        }
        else{
            currentNumber = (currentNumber * 10) + parseInt(btn.id);
        }
        currentIndex *= 10;
        console.log(currentNumber);
        if(currentOperator)
            displayFirstRow.innerHTML = currentNumber;
        else
            if(firstOperation)
            displayFirstRow.innerHTML = operand1 + operator + currentNumber;
            else
            displayFirstRow.innerHTML = result + operator + currentNumber;
    });
});
const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', () => {
    currentIndex = 1;
    currentNumber = 0;
    operand1 = 0;
    operand2 = 0;
    operator = '';
    result = 0;
    previousDigit = 0;
    currentOperator = true;
    firstOperation = true;
    displayFirstRow.innerHTML = '';
    displaySecondRow.innerHTML = ''
});
const deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', () =>{
    currentNumber = (currentNumber - previousDigit)/10;
    console.log(currentNumber);
    if(currentOperator)
            displayFirstRow.innerHTML = currentNumber;
        else
            displayFirstRow.innerHTML = operand1 + operator + currentNumber;
});
const operationButtons = document.querySelectorAll('.op-button');
operationButtons.forEach(operation =>{
    operation.addEventListener('click', () => {
        currentOperator = false;
        if(firstOperation)
            operand1 = currentNumber;
        else
            operand1 = result;
        currentNumber = 0;
        currentIndex = 1;
        operator = operation.innerHTML;
        displayFirstRow.innerHTML += operator;      
    });
});
const resultButton = document.querySelector('.result-button');
resultButton.addEventListener('click', () => {
    currentOperator = true;
    operand2 = currentNumber;
    currentNumber = 0;
    currentIndex = 1;
    result = operate(operator, parseInt(operand1), parseInt(operand2));
    console.log(result);
    resultText = result;
    operand1 = result;
    firstOperation = false;
    displaySecondRow.innerHTML = resultText;
});