const background = document.querySelector('.play-section');
const grass = `<div class='grass'></div>`;
const snake = `<div class='snake'></div>`;
const pasteScore = document.querySelector('.curren-score');
const endGame = document.querySelector('.end-game');
const scoresection = document.querySelector('.perfect-score');
const mainSection = document.querySelector('.start-section');
const startBtn = document.querySelector('.start-game');
const endButton = document.querySelector('.main-menu-button');
const shopButton = document.querySelector('.start-shop');
const shopSection = document.querySelector('.shop-section');
const backMenu = document.querySelector('.shop-button__main');
const currMoney = document.querySelector('.money');
const pasteMoney = document.querySelector('.current-money');
const itemsShop = document.querySelectorAll('.shop-wrap');

for (const iterator of itemsShop) {
  iterator.addEventListener('click', buyItem)
}

console.log(localStorage.getItem('UserData'));

if (localStorage.getItem('UserData')) {
  var userData = JSON.parse(localStorage.getItem('UserData'));
}
else {
  var userData = {
    money: 0,
    bufFruit: false,
    horizontal: false,
    vertical: false,
    suit: false,
  }
}
backMenu.addEventListener('click', goMainFromShop)
shopButton.addEventListener('click', goShop)
endButton.addEventListener('click', goMainMenu);
startBtn.addEventListener('click', startGame);

let direction = 'ArrowRight'
function startGame() {
  background.classList.remove('hide');
  mainSection.classList.add('hide');
  mainSection.classList.remove('active');
  scoresection.classList.remove('hide');
  if (userData.horizontal === true) background.classList.add('border-left');
  if (userData.vertical === true) background.classList.add('border-top');
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
  x = 1;
  y = 12;
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
    while (food[0].classList.contains('body-snake')) {
      let foodCoordinates = generateFood();
      food = [document.querySelector('[posX= "' + foodCoordinates[0] + '"][posY="' + foodCoordinates[1] + '"]')];
    }
    if (userData.bufFruit === true && (Math.random() * 100) > 90) {
      food[0].classList.add('mega-food');
    }
    else {
      food[0].classList.add('food');
    }
  }

  createFood()
  var score = 0;
  pasteScore.innerText = score
  function move() {
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('snake');
    snakeBody[snakeBody.length - 1].classList.remove('body-snake');
    snakeBody.pop();

    if (direction === 'ArrowRight') {
      if (snakeCoordinates[0] > 11 && userData.horizontal === false) {
        clearInterval(interval)
        gameOver()
      }
      else {
        if (snakeCoordinates[0] < 12) {
          snakeBody.unshift(document.querySelector('[posX= "' + (+snakeCoordinates[0] + 1) + '"][posY="' + snakeCoordinates[1] + '"]'));
          snakeBody[0].style = 'transform: rotate(0 deg)';
        }
        else {
          snakeBody.unshift(document.querySelector('[posX= "1" ][posY="' + snakeCoordinates[1] + '"]'));
        }
      }
    }
    else if (direction === 'ArrowLeft') {
      if (snakeCoordinates[0] < 2 && userData.horizontal === false) {
        clearInterval(interval)
        gameOver()
      }
      else {
        if (snakeCoordinates[0] > 1) {
          snakeBody.unshift(document.querySelector('[posX= "' + (+snakeCoordinates[0] - 1) + '"][posY="' + snakeCoordinates[1] + '"]'));
          snakeBody[0].style.transform = 'scale(-1, 1)';
        }
        else {
          snakeBody.unshift(document.querySelector('[posX= "12" ][posY="' + snakeCoordinates[1] + '"]'));
        }
      }
    }
    else if (direction === 'ArrowUp') {
      if (snakeCoordinates[1] > 11 && userData.vertical === false) {
        clearInterval(interval)
        gameOver()
      }
      else {
        if (snakeCoordinates[1] < 12) {
          snakeBody.unshift(document.querySelector('[posX= "' + (+snakeCoordinates[0]) + '"][posY="' + (+snakeCoordinates[1] + 1) + '"]'));
          snakeBody[0].style.transform = 'rotate(-90deg)';
        }
        else {
          snakeBody.unshift(document.querySelector('[posX= "' + (+snakeCoordinates[0]) + '"][posY="1"]'));
        }
      }
    }
    else if (direction === 'ArrowDown') {
      if (snakeCoordinates[1] < 2 && userData.vertical === false) {
        clearInterval(interval)
        gameOver()
      }
      else {
        if (snakeCoordinates[1] > 1) {
          snakeBody.unshift(document.querySelector('[posX= "' + (+snakeCoordinates[0]) + '"][posY="' + (+snakeCoordinates[1] - 1) + '"]'));
          snakeBody[0].style.transform = 'rotate(90deg)';
        }
        else {
          snakeBody.unshift(document.querySelector('[posX= "' + (+snakeCoordinates[0]) + '"][posY="12"]'));
        }
      }
    }

    if (snakeBody[0].getAttribute('posX') === food[0].getAttribute('posX') && snakeBody[0].getAttribute('posY') === food[0].getAttribute('posY')) {
      if (food[0].classList.contains('mega-food')) {
        food[0].classList.remove('mega-food');
        score += 49;
      }
      if (food[0].classList)
        food[0].classList.remove('food');
      let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
      let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
      snakeBody.push(document.querySelector('[posX ="' + a + '"][posY ="' + b + '"]'));
      score++
      pasteScore.innerText = score
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

  var interval = setInterval(move, 300);

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
}

function goMainMenu() {
  mainSection.classList.add('active');
  mainSection.classList.remove('hide');
  endGame.classList.add('hide');
  endGame.classList.remove('active');
}
function goMainFromShop() {
  currMoney.classList.add('hide');
  currMoney.classList.remove('active');
  mainSection.classList.add('active');
  mainSection.classList.remove('hide');
  shopSection.classList.add('hide');
  shopSection.classList.remove('active');
}
function gameOver() {
  while (background.firstChild) {
    background.removeChild(background.firstChild);
  }
  background.classList.add('hide')
  endGame.classList.remove('hide')
  endGame.classList.add('active')
  userData.money = userData.money + +pasteScore.textContent;
  localStorage.setItem("UserData", JSON.stringify(userData))
  scoresection.classList.add('hide');
}
function goShop() {
  currMoney.classList.add('active');
  currMoney.classList.remove('hide');
  shopSection.classList.remove('hide');
  shopSection.classList.add('active');
  mainSection.classList.add('hide');
  if (userData.bufFruit === true) {
    itemsShop[0].classList.add('shop-wrap-active');
    itemsShop[0].lastElementChild.innerText = 'Sold'
    itemsShop[0].removeEventListener('click', buyItem)
  }
  if (userData.horizontal === true) {
    itemsShop[1].classList.add('shop-wrap-active');
    itemsShop[1].lastElementChild.innerText = 'Sold'
    itemsShop[1].removeEventListener('click', buyItem)
  }
  if (userData.vertical === true) {
    itemsShop[2].classList.add('shop-wrap-active');
    itemsShop[2].lastElementChild.innerText = 'Sold'
    itemsShop[2].removeEventListener('click', buyItem)
  }
  if (userData.suit === true) {
    itemsShop[3].classList.add('shop-wrap-active');
    itemsShop[3].lastElementChild.innerText = 'Sold'
    itemsShop[3].removeEventListener('click', buyItem)
  }
  console.log();
  pasteMoney.innerText = userData.money
}
function buyItem() {
  if (userData.money - +this.lastElementChild.textContent >= 0) {
    userData.money = userData.money - +this.lastElementChild.textContent
    if (this.classList.contains('item-watermelon')) {
      userData.bufFruit = true
    }
    else if (this.classList.contains('item-horizont')) {
      userData.horizontal = true
      background.classList.add('border-left')
    }
    else if (this.classList.contains('item-vertical')) {
      userData.vertical = true
      background.classList.add('border-top')
    }
    else if (this.classList.contains('item-suit')) {
      userData.suit = true
    }
    localStorage.setItem("UserData", JSON.stringify(userData))
    this.classList.add('shop-wrap-active')
    this.lastElementChild.innerText = 'Sold'
    this.removeEventListener('click', buyItem)
  }
  console.log(this);
  pasteMoney.innerText = userData.money
}