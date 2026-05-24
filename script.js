let firstNumber = "";
let operator = "";
let secondNumber = "";
let shouldResetDisplay = false;
let lastButtonWasOperator = false;

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

const buttons = document.querySelectorAll(
  ".btn:not(.operator):not(.equal):not(.clear):not(.delete)"
);
const display = document.querySelector("#display");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const buttonValue = button.dataset.value;

    if (buttonValue !== undefined) {

      // Prevent multiple decimal points
      if (buttonValue === "." && display.value.includes(".")) {
        return;
      }

      // Clear old answer before neq number input.
      if (shouldResetDisplay) {
        display.value = "";

        shouldResetDisplay = false;
      }
      
      display.value += buttonValue;
      lastButtonWasOperator = false;
      
    }
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {

    //prevent operator spam
    if (lastButtonWasOperator) {
      operator = button.dataset.value;
      return;
    }

    // If there's already an operator and a second number, calculate the result first
    if (operator !== "" && firstNumber !== "" && display.value !== "") {
      secondNumber = display.value;
      const result = operate(operator, firstNumber, secondNumber);
      display.value = Math.round(result * 1000) / 1000;

      //store answer in memory
      firstNumber = display.value;

    } else {
      //first operation
      firstNumber = display.value;
    }

    //store new operator
    operator = button.dataset.value;

    lastButtonWasOperator = true;
    
    shouldResetDisplay = true;
  });
});

equalsButton.addEventListener("click", () => {

  secondNumber = display.value;

  const result = operate(operator, firstNumber, secondNumber);

  display.value = Math.round(result * 1000) / 1000; // Round to 3 decimal places

  //store answer in memory
  firstNumber = display.value;

  operator = "";

  shouldResetDisplay = true;
  lastButtonWasOperator = false;

});

clearButton.addEventListener("click", () => {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  
  shouldResetDisplay = false;
  lastButtonWasOperator = false;

  display.value = "";
});

deleteButton.addEventListener("click", () => {
  display.value = display.value.slice(0, -1);
});