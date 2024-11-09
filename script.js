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
  if (num2 === 0) return "LMAO";
  else return num1 / num2;
}

function operate(num1, operator, num2) {
  return operator === "+"
    ? add(num1, num2)
    : operator === "-"
    ? subtract(num1, num2)
    : operator === "×"
    ? multiply(num1, num2)
    : operator === "÷"
    ? divide(num1, num2)
    : NaN;
}

let num1 = "";
let operator = "";
let num2 = "";

const numbers = Array.from(document.querySelectorAll(".num"));
const operators = Array.from(document.querySelectorAll(".operator"));
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");
let screenAbove = document.querySelector(".previous");
let screenBelow = document.querySelector(".current");

numbers.map((button) => {
  button.addEventListener("click", () => {
    if (operator) {
      if (screenBelow.textContent === num1) {
        screenBelow.textContent = button.textContent;
      } else {
        screenBelow.textContent += button.textContent;
      }
      num2 += button.textContent;
    } else {
      num1 += button.textContent;
      screenBelow.textContent += button.textContent;
    }
  });
});

operators.map((button) => {
  button.addEventListener("click", () => {
    if (operator === "") {
      operator = button.textContent;
      screenAbove.textContent = num1 + " " + operator;
    }
  });
});

equal.addEventListener("click", () => {
  if (num1 && operator && num2) {
    result = +operate(Number(num1), operator, Number(num2)).toFixed(10);
    screenBelow.textContent = String(result);
    screenAbove.textContent = `${num1} ${operator} ${num2} =`;
    num1 = String(result);
    operator = num2 = "";
  }
});

clear.addEventListener("click", () => {
  num1 =
    operator =
    num2 =
    screenBelow.textContent =
    screenAbove.textContent =
      "";
});

del.addEventListener("click", () => {
  if (operator && screenBelow.textContent === num2) {
    console.log("ran");
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
});
