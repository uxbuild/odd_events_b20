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
const inputHowMany = document.querySelector("#input-how-many");
const btnHowMany = document.querySelector("#btn-how-many");
const lblHowMany = document.querySelector("#lbl-how-many");
const slider = document.querySelector("#slider");

/* extension */
const btnAddRandom = document.querySelector("#btn-random");
const inputNum = document.querySelector("#number");

/* EVENT LISTENERS */
frmAddNum.addEventListener("submit", function (e) {
  //do something..
  // console.log("submit form");
  e.preventDefault();
  const numStr = e.target.elements["number"].value;
  // if (!isNaN(parseInt(numStr))) addToBank(parseInt(numStr));
  if (!isNaN(parseInt(numStr))) addAllToBank();
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

/* add list of nums from bank */
function addAllToBank() {
  // list of nums
  console.log("addAllToBank..");

  const nums = inputNum.value.split(",").filter((n) => n !== "");
  console.log(`nums: ${nums}`);
  state.bank = [...state.bank, ...nums];
  console.log(`state.bank: ${state.bank}`);
  render();
}

function sortOne() {
  if (state.bank.length > 0) {
    const num = state.bank.shift();
    sortNum(num);
    console.log(`state.bank: ${state.bank}`);
    console.log(`state.evens: ${state.evens}`);
    render();
  }
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
    sortOrder(state.evens);
  } else {
    state.odds.push(n);
    sortOrder(state.odds);
  }
}

const selectOrder = document.querySelector("#select-order");
function sortOrder(stateList) {
  const order = selectOrder.value;
  if (stateList.length > 1) {
    switch (order) {
      case "sortA":
        stateList.sort();
        break;
      case "sortD":
        stateList.sort((a, b) => {
          return b - a;
        });

        break;
      default:
        stateList.sort();
    }
  }
}

function render() {
  renderState(outputBank, state.bank);
  renderState(outputEvens, state.evens);
  renderState(outputOdds, state.odds);
  updateRangeSelector();
  clearInput();
}

function updateRangeSelector() {
  if (state.bank.length > 0) {
    slider.min = 0;
    slider.max = state.bank.length;
  } else {
    slider.min = 0;
    slider.max = 0;
  }
  slider.value = slider.max;
  lblHowMany.innerHTML = slider.max;
}

function clearInput() {
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
function parseInput() {
  // parse input
  const arr = inputNum.value.split(",");
  // must allow for strings in input field.. remove validation?
  //
}

const keysAllowed = [
  "Enter",
  "Tab",
  "Backspace",
  "Digit1",
  "Digit2",
  "Digit3",
  "Digit4",
  "Digit5",
  "Digit6",
  "Digit7",
  "Digit8",
  "Digit9",
  "Digit0",
  "Comma",
];
/* prevent keys other than integers, comma, and backspace */
inputNum.addEventListener("keydown", (e) => {
  const code = e.code;
  // console.log(`keycode: ${e.code}`);

  if (keysAllowed.indexOf(code) == -1) {
    e.preventDefault();
    e.stopPropagation();
  }
});

console.log(`slider: ${slider}`);

slider.addEventListener("change", function (e) {
  console.log(`slider change..`);
  console.log(e.target.value);
  lblHowMany.innerHTML = e.target.value;
});

btnHowMany.addEventListener("click", function (e) {
  sortHowMany();
});

function sortHowMany() {
  // get how many..
  const num = slider.value;
  for (let i = 0; i < num; i++) {
    sortOne();
  }
}
