function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
} 

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

let firstNumber = "";
let operator = "";
let secondNumber = "";

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (operator === "+") {
    return add(a, b);
}

  if (operator === "-") {
    return subtract(a, b);
  }

  if (operator === "*") {
    return multiply(a, b);
  }

  if (operator === "/") {
    return divide(a, b);
  }
}

const buttons = document.querySelectorAll(".btn");
const display = document.querySelector("#display");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const buttonValue = button.dataset.value;

    if (buttonValue !== undefined) {
      display.value += buttonValue;
    }
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {

    firstNumber = display.value;
    operator = button.dataset.value;
    display.value = "";
  });
});

equalsButton.addEventListener("click", () => {

  secondNumber = display.value;
  const result = operate(operator, firstNumber, secondNumber);
  display.value = result;
});

clearButton.addEventListener("click", () => {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  display.value = "";
});

deleteButton.addEventListener("click", () => {
  display.value = display.value.slice(0, -1);
});