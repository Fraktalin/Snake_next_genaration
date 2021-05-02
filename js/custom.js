

const background = document.querySelector('.play-section');
const grass = `<div class='grass'></div>`;
const snake = `<div class='snake'></div>`;
const pasteScore = document.querySelector('.curren-score');
const endGame = document.querySelector('.end-game');
let direction = 'ArrowRight'

function createFloor() {
  for (let i = 0; i < 144; i++) {
    background.innerHTML += grass;
  }
}
createFloor();

let excel = document.getElementsByClassName('grass');
let x = 1;
let y = 12;

for (let i = 0; i < excel.length; i++) {
  if (x > 12) {
    x = 1;
    y--
  }
  excel[i].setAttribute('posX', x);
  excel[i].setAttribute('posY', y);
  x++
}

function generateSnake() {
  let posX = 6;
  let posY = 6;
  return [posX, posY]
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX= "' + coordinates[0] + '"][posY="' + coordinates[1] + '"]'),
document.querySelector('[posX= "' + (coordinates[0] - 1) + '"][posY="' + coordinates[1] + '"]')];

console.log(snakeBody);

for (let i = 0; i < snakeBody.length; i++) {
  if (i === 0) {
    snakeBody[0].classList.add('snake');
  }
  else {
    snakeBody[i].classList.add('body-snake');
  }
}


let food;

function createFood() {
  function generateFood() {
    let posX = Math.round(Math.random() * (12 - 1) + 1);
    let posY = Math.round(Math.random() * (12 - 1) + 1);
    return [posX, posY];
  }
  let foodCoordinates = generateFood();
  food = [document.querySelector('[posX= "' + foodCoordinates[0] + '"][posY="' + foodCoordinates[1] + '"]')];
  while (food[0].classList.contains('snakeBody')) {
    let foodCoordinates = generateFood();
    food = [document.querySelector('[posX= "' + foodCoordinates[0] + '"][posY="' + foodCoordinates[1] + '"]')];
  }

  food[0].classList.add('food');
}
function gameOver() {
  background.classList.add('game-over')
  endGame.classList.add('active')
  clearInterval(interval)

}

createFood()
let score = 0;
function move() {
  let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
  snakeBody[0].classList.remove('snake');
  snakeBody[snakeBody.length - 1].classList.remove('body-snake');
  snakeBody.pop();

  if (direction === 'ArrowRight') {
    if (snakeCoordinates[0] > 11) {
      gameOver()
    }
    snakeBody.unshift(document.querySelector('[posX= "' + (+snakeCoordinates[0] + 1) + '"][posY="' + snakeCoordinates[1] + '"]'));
    snakeBody[0].style.transform = 'rotate(0deg)';
  }
  else if (direction === 'ArrowLeft') {
    if (snakeCoordinates[0] < 2) {
      gameOver()
    }
    snakeBody.unshift(document.querySelector('[posX= "' + (+snakeCoordinates[0] - 1) + '"][posY="' + snakeCoordinates[1] + '"]'));
    snakeBody[0].style.transform = 'scale(-1, 1)';
  }
  else if (direction === 'ArrowUp') {
    if (snakeCoordinates[1] > 11) {
      gameOver()
    }
    snakeBody.unshift(document.querySelector('[posX= "' + (+snakeCoordinates[0]) + '"][posY="' + (+snakeCoordinates[1] + 1) + '"]'));
    snakeBody[0].style.transform = 'rotate(-90deg)';
  }
  else if (direction === 'ArrowDown') {
    if (snakeCoordinates[1] < 2) {
      gameOver()
    }
    snakeBody.unshift(document.querySelector('[posX= "' + (+snakeCoordinates[0]) + '"][posY="' + (+snakeCoordinates[1] - 1) + '"]'));
    snakeBody[0].style.transform = 'rotate(90deg)';
  }

  if (snakeBody[0].getAttribute('posX') === food[0].getAttribute('posX') && snakeBody[0].getAttribute('posY') === food[0].getAttribute('posy')) {
    food[0].classList.remove('food');
    let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
    let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
    snakeBody.push(document.querySelector('[posX ="' + a + '"][posY ="' + b + '"]'));
    score++
    pasteScore.innerText = score
    console.log(score);
    createFood();
  }
  if (snakeBody[0].classList.contains('body-snake')) {
    gameOver()
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (i === 0) {
      snakeBody[0].classList.add('snake');
    }
    else {
      snakeBody[i].classList.add('body-snake');
    }
  }
}

let interval = setInterval(move, 300);

window.addEventListener('keydown', checkDirection);
function checkDirection(e) {
  switch (e.key) {
    case 'ArrowDown':
      if (direction !== 'ArrowUp') {
        snakeBody[0].style.transform = 'rotate(90deg)';
        direction = e.key
      }
      break
    case 'ArrowUp':
      if (direction !== 'ArrowDown') {
        snakeBody[0].style.transform = 'rotate(-90deg)';
        direction = e.key
      }
      break
    case 'ArrowLeft':
      if (direction !== 'ArrowRight') {
        snakeBody[0].style.transform = 'scale(-1, 1)';
        direction = e.key
      }
      break
    case 'ArrowRight':
      if (direction !== 'ArrowLeft') {
        snakeBody[0].style.transform = 'rotate(0deg)';
        direction = e.key
      }
      break
    default: direction = 'ArrowRight';
      console.log(direction);
  }
}