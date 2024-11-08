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
  return (operator === '+') ? add(num1, num2) :
         (operator === '-') ? subtract(num1, num2) :
         (operator === 'x') ? multiply(num1, num2) :
         (operator === '/') ? divide(num1, num2) :
         NaN
}

