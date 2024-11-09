document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});

const numbers = Array.from(document.querySelectorAll(".num"));
const operators = Array.from(document.querySelectorAll(".operator"));
const decimal = document.querySelector(".decimal");
const equal = document.querySelector(".equal");

const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");

let screenAbove = document.querySelector(".previous");
let screenBelow = document.querySelector(".current");

const DIVISIONBYZERO = "LMAO";

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) return DIVISIONBYZERO;
  else return num1 / num2;
}

function operate(num1, operator, num2) {
  return operator === "+"
    ? add(num1, num2)
    : operator === "-"
    ? subtract(num1, num2)
    : operator === "×" || operator === "x" || operator === "*"
    ? multiply(num1, num2)
    : operator === "÷" || operator === "/"
    ? divide(num1, num2)
    : NaN;
}

let num1 = "";
let operator = "";
let num2 = "";

function update(string) {
  if (operator) {
    if (screenBelow.textContent === num1) {
      screenBelow.textContent = string;
    } else {
      screenBelow.textContent += string;
    }
    num2 += string;
  } else {
    num1 += string;
    screenBelow.textContent += string;
  }
}

function calculateResult() {
  if (num1 && operator && num2) {
    result = operate(Number(num1), operator, Number(num2));
    result =
      typeof result === "number"
        ? +operate(Number(num1), operator, Number(num2)).toFixed(10)
        : result;
    screenBelow.textContent = String(result);
    screenAbove.textContent = `${num1} ${operator} ${num2} =`;
    num1 = String(result);
    operator = num2 = "";
  }
}

function setOperator(op) {
  if (num1 === "" && op === "-") {
    num1 = "-";
    screenBelow.textContent = num1;
  } else if (num1 && num1 != "-" && operator === "") {
    operator = op;
    screenAbove.textContent = num1 + " " + operator;
  } else if (num2 === "" && op === "-") {
    num2 = "-";
    screenBelow.textContent = num2;
  }
}

function addDecimalPoint() {
  if (!screenBelow.textContent.includes(".")) {
    update(".");
  } else if (operator && !num2.includes(".")) {
    num2 += ".";
    screenBelow.textContent = num2;
  }
}

function handleDelete() {
  if (operator && screenBelow.textContent === num2) {
    num2 = num2.substring(0, num2.length - 1);
    screenBelow.textContent = num2;
  } else if (operator && screenBelow.textContent) {
    num1 = num1.substring(0, num1.length - 1);
    screenBelow.textContent = screenBelow.textContent.substring(
      0,
      screenBelow.textContent.length - 1
    );
  } else {
    num1 = num1.substring(0, num1.length - 1);
    screenBelow.textContent = num1;
  }
}

numbers.map((button) => {
  button.addEventListener("click", () => update(button.textContent));
});

operators.map((button) => {
  button.addEventListener("click", () => setOperator(button.textContent));
});

decimal.addEventListener("click", () => addDecimalPoint());

equal.addEventListener("click", () => calculateResult());

clear.addEventListener("click", () => {
  num1 =
    operator =
    num2 =
    screenBelow.textContent =
    screenAbove.textContent =
      "";
});

del.addEventListener("click", () => handleDelete());

addEventListener("keydown", (e) => {
  key = e.key;
  if (Number(key) || key === "0") {
    update(key);
  } else if ("=Enter".includes(key)) {
    calculateResult();
  } else if ("+x/-*".includes(key)) {
    setOperator(key);
  } else if (key === ".") {
    addDecimalPoint();
  } else if (key === "Backspace") {
    handleDelete();
  }
});
