let background = document.querySelector('.play-section');
let grass = `<div class='grass'></div>`;
let snake = `<div class='snake'></div>`;
let food = `<div class='food'></div>`;
let snakeBody = `<div class='body-snake'></div>`;
let pasteScore = document.querySelector('.curren-score')
function createFloor() {
  for (let i = 0; i < 144; i++) {
    background.innerHTML += grass;
  }
}
createFloor();

let startPos = background.childNodes[66];
let startStraw = background.childNodes[1];
let startbody = background.childNodes[65];

startStraw.innerHTML = food;

let newFood = document.getElementsByClassName("food")[0];
startbody.innerHTML = snakeBody
function createSnake() {
  startPos.innerHTML = snake;
}
createSnake()

let movingBody = document.getElementsByClassName("body-snake")[0];

console.log(movingBody.style);
let movingSnake = document.getElementsByClassName("snake")[0];

var blockTop = 300;
var blockLeft = 250;
document.body.addEventListener("keydown", moveBlock);
document.body.addEventListener("keydown", checkPos);

let direction = "ArrowRight";

let checkDir = 'ArrowRight';
function moveBlock(e) {
  switch (e.key) {
    case 'ArrowDown':
      if (checkDir !== 'ArrowUp') {
        movingBody.style.transform = 'rotate(90deg)'
        movingSnake.style.transform = 'rotate(90deg)'
        direction = e.key
      }
      break
    case 'ArrowUp':
      if (checkDir !== 'ArrowDown') {
        movingSnake.style.transform = 'rotate(-90deg)'
        movingBody.style.transform = 'rotate(-90deg)'
        direction = e.key
      }
      break
    case 'ArrowLeft':
      if (checkDir !== 'ArrowRight') {
        movingSnake.style.transform = 'scale(-1, 1)'
        movingBody.style.transform = 'scale(-1, 1)'
        direction = e.key
      }
      break
    case 'ArrowRight':
      if (checkDir !== 'ArrowLeft') {
        movingSnake.style.transform = 'rotate(0deg)'
        movingBody.style.transform = 'rotate(0deg)'
        direction = e.key
      }
      break
    default: direction = 'ArrowRight';
  }
  checkDir = direction
}

setInterval(function () {
  let bodyTop1 = blockTop
  let bodyLeft1 = blockLeft
  console.log(bodyTop1);
  switch (direction) {
    case 'ArrowDown':
      if (blockTop < 600 - 50) {
        blockTop += 50;
        movingSnake.style.top = blockTop + "px";
        movingBody.style.top = bodyTop1 + 'px';
        movingBody.style.left = bodyLeft1 + 'px';
      }
      break
    case 'ArrowUp':
      if (blockTop > 0) {
        blockTop = blockTop - 50;
        movingSnake.style.top = blockTop + "px";
        movingBody.style.top = bodyTop1 + 'px';
        movingBody.style.left = bodyLeft1 + 'px';
      }
      break
    case 'ArrowLeft':
      if (blockLeft > 0) {
        blockLeft = blockLeft - 50;
        movingSnake.style.left = blockLeft + "px";
        movingBody.style.top = bodyTop1 + 'px';
        movingBody.style.left = bodyLeft1 + 'px';
      }
      break
    case 'ArrowRight':
      if (blockLeft < 600 - 50) {
        blockLeft += 50;
        movingSnake.style.left = blockLeft + "px";
        movingBody.style.top = bodyTop1 + 'px';
        movingBody.style.left = bodyLeft1 + 'px';
      }
      break
    default: blockLeft += 50;
      movingSnake.style.left = blockLeft + "px";
  }
  checkPos()
}, 400);





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
let score = 0
function checkPos(e) {
  if (movingSnake.style.top === newFood.style.top && movingSnake.style.left === newFood.style.left) {
    score++
    pasteScore.innerText = score
    createRandom();
  }
}