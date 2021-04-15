let background = document.querySelector('.play-section');
let grass = `<div class='grass'></div>`;
let snake = `<div class='snake'></div>`;
let food = `<div class='food'></div>`;

function createFloor() {
  for (let i = 0; i < 144; i++) {
    background.innerHTML += grass;
  }
}
createFloor();

let startPos = background.childNodes[66];
let startStraw = background.childNodes[1];

startStraw.innerHTML = food;

let newFood = document.getElementsByClassName("food")[0];

function createSnake() {
  startPos.innerHTML = snake;
}
createSnake()


let movingSnake = document.getElementsByClassName("snake")[0];

var blockTop = 300;
var blockLeft = 250;
document.body.addEventListener("keydown", moveBlock);
document.body.addEventListener("keydown", checkPos);

function moveBlock(e) {
  if (e.key == "ArrowDown" && blockTop < 600 - 50) {
    blockTop += 50;
    movingSnake.style.top = blockTop + "px";
  }
  else if (e.key == "ArrowUp" && blockTop > 0) {
    blockTop = blockTop - 50;
    movingSnake.style.top = blockTop + "px";
  }
  else if (e.key == "ArrowLeft" && blockLeft > 0) {
    blockLeft = blockLeft - 50;
    movingSnake.style.left = blockLeft + "px";
  }
  else if (e.key == "ArrowRight" && blockLeft < 600 - 50) {
    blockLeft += 50;
    movingSnake.style.left = blockLeft + "px";
  }
}


function createRandom() {
  let placeFoodX = Math.round(Math.random() * 550);
  let placeFoodY = Math.round(Math.random() * 550);
  placeFoodX = Math.round(placeFoodX / 50) * 50
  placeFoodY = Math.round(placeFoodY / 50) * 50
  createFood(placeFoodX, placeFoodY)
}
createRandom();

function createFood(x, y) {
  newFood.style.left = x + 'px';
  newFood.style.top = y + 'px';
}


function checkPos(e) {
  if (movingSnake.style.top === newFood.style.top && movingSnake.style.left === newFood.style.left) {
    console.log(1);
    createRandom();
  }
}