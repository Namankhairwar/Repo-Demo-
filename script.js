const display = document.getElementById("display");
const keys = document.querySelector(".keys");
const themeToggle = document.getElementById("theme-toggle");

let current = "0";
let previous = null;
let operator = null;

function updateDisplay() {
  display.value = current;
}

function clearAll() {
  current = "0";
  previous = null;
  operator = null;
  updateDisplay();
}

function applyOperation(a, b, op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? 0 : a / b;
  return b;
}

function chooseOperator(nextOperator) {
  if (previous === null) {
    previous = Number(current);
  } else if (operator) {
    previous = applyOperation(previous, Number(current), operator);
  }
  operator = nextOperator;
  current = "0";
  updateDisplay();
}

function inputNumber(value) {
  current = current === "0" ? value : current + value;
  updateDisplay();
}

function calculateResult() {
  if (operator === null || previous === null) return;
  current = String(applyOperation(previous, Number(current), operator));
  previous = null;
  operator = null;
  updateDisplay();
}

keys.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  const value = button.textContent;

  if (action === "number") inputNumber(value);
  if (action === "operator") chooseOperator(value);
  if (action === "equals") calculateResult();
  if (action === "clear") clearAll();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
});
