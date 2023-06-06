// Variables

const currentCalculatorScreen = document.querySelector(
  ".calculator-screen-current"
);
const lastCalculatorScreen = document.querySelector(".calculator-screen-last");
const numberButtons = document.querySelectorAll(".numButton");
const operatorButtons = document.querySelectorAll(".operator");
const equalSignButton = document.querySelector("#equal-sign");

let currentOperator = null;

let hasExpressionBeenEvaluated = false;

let currentNumber1 = 0;
let currentNumber2 = 0;

// Event listeners

currentCalculatorScreen.addEventListener("input", () => {
  hasExpressionBeenEvaluated = false;
});

window.addEventListener("keydown", handleKeybordInput);

equalSignButton.addEventListener("click", () => {
  if (!hasExpressionBeenEvaluated) {
    evaluate();
  } else if (currentOperator !== null) {
    updateCurrentNumber2();
    evaluate();
  } else {
    currentNumber1 = Number(currentCalculatorScreen.textContent);
    updateLastScreen();
  }
});

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    updateCurrentNumber(e.target.value);
  });
});

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    updateCurrentOperator(e.target.value);
  });
});

// Functions

function evaluate() {
  lastCalculatorScreen.textContent += ` ${currentNumber2} =`;
  const result = operate(
    Number(currentNumber1),
    Number(currentNumber2),
    currentOperator
  );
  currentCalculatorScreen.textContent = result;
  currentNumber1 = result;

  hasExpressionBeenEvaluated = true;
  currentOperator = null;
}

function resetCurrentScreen() {
  currentCalculatorScreen.textContent = "";
}

function updateCurrentNumber(val) {
  if (currentOperator === null) {
    currentNumber1 ? (currentNumber1 += val) : (currentNumber1 = val);
    updateCurrentScreen(val);
  } else {
    updateCurrentScreen(val);
    currentNumber2 = Number(currentCalculatorScreen.textContent);
  }
}

function updateLastScreen() {
  if (currentOperator !== null) {
    lastCalculatorScreen.textContent = `${currentNumber1} ${currentOperator}`;
  }
}

function updateCurrentScreen(val) {
  currentCalculatorScreen.textContent === "0"
    ? (currentCalculatorScreen.textContent = val)
    : (currentCalculatorScreen.textContent += val);
}

function handleKeybordInput(e) {
  if (e.key >= 0 && e.key <= 9) {
    updateCurrentNumber(e.key);
  }
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    updateCurrentOperator(e.key);
  }
  if (e.key === "Backspace") del();
  if (e.key === "Escape") clearAll();
  if ((!hasExpressionBeenEvaluated && e.key === "Enter") || e.key === "=")
    evaluate();
}

function updateCurrentNumber2() {
  currentNumber2 = Number(currentCalculatorScreen.textContent);
}

function updateCurrentOperator(val) {
  currentOperator = val;
  updateLastScreen();
  resetCurrentScreen();
}

function clearAll() {
  currentCalculatorScreen.textContent = 0;
  lastCalculatorScreen.textContent = "";
  currentNumber1 = 0;
  currentNumber2 = 0;
  currentOperator = null;
  hasExpressionBeenEvaluated = false;
}

function del() {
  if (
    currentNumber1.toString().length === 1 &&
    currentCalculatorScreen.textContent.length === 1
  ) {
    currentCalculatorScreen.textContent = "0";
    currentNumber1 = 0;
  } else {
    currentCalculatorScreen.textContent =
      currentCalculatorScreen.textContent.substring(
        0,
        currentCalculatorScreen.textContent.length - 1
      );
    currentNumber1 = Math.floor(Number(currentNumber1) / 10);
  }
}

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
  return a / b;
}

function operate(n1, n2, operator) {
  if (n2 === 0 && operator === "/") {
    return "You can't divide by 0";
  }

  switch (operator) {
    case "+":
      return add(n1, n2);
    case "-":
      return subtract(n1, n2);
    case "*":
      return multiply(n1, n2);
    case "/":
      return divide(n1, n2);
  }
}

window.onload = () => {
  clearAll();
};
