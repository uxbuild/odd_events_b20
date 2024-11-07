// TODO: this file! :)

/* STATE */
const state = {
  bank: [],
  odds: [],
  evens: [],
};

/* DOM ELEMENTS */
const frmAddNum = document.querySelector("#frm-number");
const btnAddNum = document.querySelector("#btn-number");
const btnSortOne = document.querySelector("#sortOne");
const btnSortAll = document.querySelector("#sortAll");
const outputBank = document.querySelector("#numberBank output");
const outputOdds = document.querySelector("#odds output");
const outputEvens = document.querySelector("#evens output");

/* extension */
const btnAddRandom = document.querySelector("#btn-random");
const inputNum = document.querySelector("#number");

/* EVENT LISTENERS */
frmAddNum.addEventListener("submit", function (e) {
  //do something..
  // console.log("submit form");
  e.preventDefault();
  const numStr = e.target.elements["number"].value;
  if (!isNaN(parseInt(numStr))) addToBank(parseInt(numStr));
});

btnSortOne.addEventListener("click", function (e) {
  sortOne();
});

btnSortAll.addEventListener("click", function (e) {
  console.log("sortAll button clicked..");
  sortAll();
});

/* FUNCTIONS */

function addToBank(num) {
  state.bank.push(num);
  render();
}

function sortOne() {
  if (state.bank.length > 0) {
    const num = state.bank.shift();
    sortNum(num);
    console.log(`state.bank: ${state.bank}`);
    console.log(`state.evens: ${state.evens}`);
  }
  render();
}

function sortAll() {
  while (state.bank.length > 0) {
    const num = state.bank.shift();
    sortNum(num);
  }
  render();
}

function sortNum(n) {
  if (n % 2 == 0) {
    state.evens.push(n);
  } else {
    state.odds.push(n);
  }
}

function render() {
  renderState(outputBank, state.bank);
  renderState(outputEvens, state.evens);
  renderState(outputOdds, state.odds);
  clearInput();
}

function clearInput(){
  inputNum.value = "";
}
function renderState(output, stateArr) {
  const arrStr = stateArr.toString();
  output.innerHTML = arrStr;
}

/* WORKSHOP EXTENSION */

function getRandomNum(range) {
  const num = Math.floor(Math.random() * range);
  return num;
}

btnAddRandom.addEventListener("click", function (e) {
  addToBank(getRandomNum(1000));
});

/* parse input field, allows for comma-delimited list of numbers. */
function parseInput(){
  // parse input
  const arr = inputNum.value.split(",");
  // must allow for strings in input field.. remove validation?
  // 
}


const keysAllowed = ["Enter", "Tab", "Backspace", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Comma"];
/* prevent keys other than integers, comma, and backspace */
inputNum.addEventListener("keydown", (e)=>{
  const code = e.code;
  console.log(`keycode: ${e.code}`);
  
  if(keysAllowed.indexOf(code)==-1){
    e.preventDefault();
    e.stopPropagation();
  }
});



