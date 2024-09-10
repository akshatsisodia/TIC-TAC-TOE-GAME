let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let count = 0;

let winpatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetBtn = () => {
  turn0 = true;
  count = 0;
  enableBtns();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `The game is Draw`;
  msgContainer.classList.remove("hide");
  disableBtns();
};

const disableBtns = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBtns = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBtns();
};

const checkWinner = () => {
  for (let patterns of winpatterns) {
    let posVal1 = boxes[patterns[0]].innerText;
    let posVal2 = boxes[patterns[1]].innerText;
    let posVal3 = boxes[patterns[2]].innerText;

    if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
      if (posVal1 == posVal2 && posVal2 == posVal3) {
        showWinner(posVal1);
        return true;
      }
    }
  }
};

newBtn.addEventListener("click", resetBtn);
reset.addEventListener("click", resetBtn);
