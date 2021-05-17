const background = document.querySelector('.play-section');
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
const startRouletteButton = document.querySelector('.start');
const cards_block = document.querySelector('.cards');
const shopBlocks = document.querySelectorAll('.shop-block');
const shopButtonsBlock = document.querySelectorAll('.shop-button');
const profileButton = document.querySelector('.profile-button');
const skinsInputs = document.querySelectorAll('.input-wrap');
const radioChoice = document.querySelectorAll('.radio-choice');
const headsInputs = document.querySelectorAll('.input-wrap-head');
const radioHeadChoice = document.querySelectorAll('.radio-head-choice');
const shopListBuffs = document.querySelector('.shop-list-buffs');
const shopListCosmetics = document.querySelector('.shop-list-cosmetics');
var audioCasino = new Audio('../multimedia/casino.mp3');
var audioBuy = new Audio('../multimedia/buy.mp3');
var audioEat = new Audio('../multimedia/apple.mp3');
var audioGameOver = new Audio('../multimedia/gameover.mp3');
var interval;
let cards;
var itemsShop;
var dataItems;
var dataCosmetics;
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

readTextFile("../data/items.json", function (text) {
  dataItems = JSON.parse(text);
  console.log(dataItems);
});

readTextFile("../data/cosmetics.json", function (text) {
  dataCosmetics = JSON.parse(text);
  console.log(dataCosmetics);
});

for (let iterator of radioChoice) {
  iterator.addEventListener('change', radioSelectSkin);
}
for (let iterator of radioHeadChoice) {
  iterator.addEventListener('change', radioSelectHead);
}

if (localStorage.getItem('UserData')) {
  var userData = JSON.parse(localStorage.getItem('UserData'));
}
else {
  var userData = {
    money: 5000,
    bufFruit: false,
    horizontal: false,
    vertical: false,
    suit: false,
    skins: {
      lgbt: false,
      cyber: false,
      punk: false,
      zebra: false,
    },
    heads: {
      black: false,
      pink: false,
      vampire: false,
      vampireHat: false,
    },
    selectBodySkin: 'body-snake',
    selectHeadSkin: 'snake',
  };
}

for (let i of shopButtonsBlock) {
  i.addEventListener('click', swapShopBlock);
}
startRouletteButton.addEventListener('click', startRoulette);
backMenu.addEventListener('click', goMainFromShop);
shopButton.addEventListener('click', goShop);
endButton.addEventListener('click', goMainMenu);
startBtn.addEventListener('click', startGame);
profileButton.addEventListener('click', drawSkins);
profileButton.addEventListener('click', drawHeads);

function swapShopBlock() {
  for (let i of shopButtonsBlock) {
    i.classList.remove('shop-button--active');
  }
  this.classList.add('shop-button--active');
  for (let i of shopBlocks) {
    i.classList.remove('active');
    i.classList.add('hide');
    if (this.textContent === i.attributes[0].value) {
      i.classList.remove('hide');
      i.classList.add('active');
    }
  }
  if (this.classList.contains('shop-button__skins') || this.classList.contains('shop-button__skills')) {
    checkItem();
  }
}

let direction = 'ArrowRight';
function startGame() {
  background.classList.remove('hide');
  mainSection.classList.add('hide');
  mainSection.classList.remove('active');
  scoresection.classList.remove('hide');
  if (userData.horizontal === true) background.classList.add('border-left');
  if (userData.vertical === true) background.classList.add('border-top');
  function createFloor() {
    for (let i = 0; i < 144; i++) {
      background.innerHTML += `<div class='grass'></div>`;
    }
    background.innerHTML +=`<audio src="./multimedia/kalambur.mp3" preload loop autoplay></audio>`
  }
  createFloor();

  let excel = document.getElementsByClassName('grass');
  let x = 1;
  let y = 12;

  for (let i = 0; i < excel.length; i++) {
    if (x > 12) {
      x = 1;
      y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;
  }
  x = 1;
  y = 12;
  function generateSnake() {
    let posX = 6;
    let posY = 6;
    return [posX, posY];
  }

  let coordinates = generateSnake();
  let snakeBody = [document.querySelector('[posX= "' + coordinates[0] + '"][posY="' + coordinates[1] + '"]'),
  document.querySelector('[posX= "' + (coordinates[0] - 1) + '"][posY="' + coordinates[1] + '"]')];

  console.log(snakeBody);

  for (let i = 0; i < snakeBody.length; i++) {
    if (i === 0) {
      snakeBody[0].classList.add(userData.selectHeadSkin);
    }
    else {
      snakeBody[i].classList.add(userData.selectBodySkin);
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
    while (food[0].classList.contains(userData.selectBodySkin)) {
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

  createFood();
  var score = 0;
  pasteScore.innerText = score;
  function move() {
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove(userData.selectHeadSkin);
    snakeBody[snakeBody.length - 1].classList.remove(userData.selectBodySkin);
    snakeBody.pop();

    if (direction === 'ArrowRight') {
      if (snakeCoordinates[0] > 11 && userData.horizontal === false) {
        clearInterval(interval);
        gameOver();
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
        clearInterval(interval);
        gameOver();
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
        clearInterval(interval);
        gameOver();
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
        clearInterval(interval);
        gameOver();
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
        score += 4;
      }
      if (food[0].classList)
        food[0].classList.remove('food');
      let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
      let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
      snakeBody.push(document.querySelector('[posX ="' + a + '"][posY ="' + b + '"]'));
      score++;
      audioEat.play();
      pasteScore.innerText = score;
      createFood();
    }
    if (snakeBody[0].classList.contains(userData.selectBodySkin)) {
      gameOver();
    }
    for (let i = 0; i < snakeBody.length; i++) {
      if (i === 0) {
        snakeBody[0].classList.add(userData.selectHeadSkin);
      }
      else {
        snakeBody[i].classList.add(userData.selectBodySkin);
      }
    }
  }

  interval = setInterval(move, 300);

  window.addEventListener('keydown', checkDirection);
  function checkDirection(e) {
    switch (e.key) {
      case 'ArrowDown':
        if (direction !== 'ArrowUp') {
          snakeBody[0].style.transform = 'rotate(90deg)';
          direction = e.key;
        }
        break;
      case 'ArrowUp':
        if (direction !== 'ArrowDown') {
          snakeBody[0].style.transform = 'rotate(-90deg)';
          direction = e.key;
        }
        break;
      case 'ArrowLeft':
        if (direction !== 'ArrowRight') {
          snakeBody[0].style.transform = 'scale(-1, 1)';
          direction = e.key;
        }
        break;
      case 'ArrowRight':
        if (direction !== 'ArrowLeft') {
          snakeBody[0].style.transform = 'rotate(0deg)';
          direction = e.key;
        }
        break;
      default: direction = 'ArrowRight';
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
  if (userData.suit === true) {
    userData.money = userData.money + +pasteScore.textContent;
    localStorage.setItem("UserData", JSON.stringify(userData));
  }
  else {
    clearInterval(interval);
    audioGameOver.play();
    while (background.firstChild) {
      background.removeChild(background.firstChild);
    }
    background.classList.add('hide');
    endGame.classList.remove('hide');
    endGame.classList.add('active');
    userData.money = userData.money + +pasteScore.textContent;
    localStorage.setItem("UserData", JSON.stringify(userData));
    scoresection.classList.add('hide');
  }
}
function goShop() {
  drawShop(shopListBuffs, dataItems);
  drawShop(shopListCosmetics, dataCosmetics);
  drawRoulette(true, dataItems);
  drawRoulette(false, dataCosmetics);
  itemsShop = document.querySelectorAll('.shop-wrap');
  for (let iterator of itemsShop) {
    iterator.addEventListener('click', buyItem);
  }
  currMoney.classList.add('active');
  currMoney.classList.remove('hide');
  shopSection.classList.remove('hide');
  shopSection.classList.add('active');
  mainSection.classList.add('hide');
  checkItem();
  pasteMoney.innerText = userData.money;
}
function checkItem() {
  if (userData.bufFruit === true) {
    itemsShop[0].classList.add('shop-wrap-active');
    itemsShop[0].lastElementChild.innerText = 'Sold';
    itemsShop[0].removeEventListener('click', buyItem);
  }
  if (userData.horizontal === true) {
    itemsShop[1].classList.add('shop-wrap-active');
    itemsShop[1].lastElementChild.innerText = 'Sold';
    itemsShop[1].removeEventListener('click', buyItem);
  }
  if (userData.vertical === true) {
    itemsShop[2].classList.add('shop-wrap-active');
    itemsShop[2].lastElementChild.innerText = 'Sold';
    itemsShop[2].removeEventListener('click', buyItem);
  }
  if (userData.suit === true) {
    itemsShop[3].classList.add('shop-wrap-active');
    itemsShop[3].lastElementChild.innerText = 'Sold';
    itemsShop[3].removeEventListener('click', buyItem);
  }
  if (userData.skins.cyber === true) {
    itemsShop[4].classList.add('shop-wrap-active');
    itemsShop[4].lastElementChild.innerText = 'Sold';
    itemsShop[4].removeEventListener('click', buyItem);
  }
  if (userData.skins.punk === true) {
    itemsShop[5].classList.add('shop-wrap-active');
    itemsShop[5].lastElementChild.innerText = 'Sold';
    itemsShop[5].removeEventListener('click', buyItem);
  }
  if (userData.skins.zebra === true) {
    itemsShop[6].classList.add('shop-wrap-active');
    itemsShop[6].lastElementChild.innerText = 'Sold';
    itemsShop[6].removeEventListener('click', buyItem);
  }
  if (userData.skins.lgbt === true) {
    itemsShop[7].classList.add('shop-wrap-active');
    itemsShop[7].lastElementChild.innerText = 'Sold';
    itemsShop[7].removeEventListener('click', buyItem);
  }
  if (userData.heads.black === true) {
    itemsShop[8].classList.add('shop-wrap-active');
    itemsShop[8].lastElementChild.innerText = 'Sold';
    itemsShop[8].removeEventListener('click', buyItem);
  }
  if (userData.heads.pink === true) {
    itemsShop[9].classList.add('shop-wrap-active');
    itemsShop[9].lastElementChild.innerText = 'Sold';
    itemsShop[9].removeEventListener('click', buyItem);
  }
  if (userData.heads.vampire === true) {
    itemsShop[10].classList.add('shop-wrap-active');
    itemsShop[10].lastElementChild.innerText = 'Sold';
    itemsShop[10].removeEventListener('click', buyItem);
  }
  if (userData.heads.vampireHat === true) {
    itemsShop[11].classList.add('shop-wrap-active');
    itemsShop[11].lastElementChild.innerText = 'Sold';
    itemsShop[11].removeEventListener('click', buyItem);
  }
}
function buyItem() {
  if (userData.money - +this.lastElementChild.textContent >= 0) {
    userData.money = userData.money - +this.lastElementChild.textContent;
    audioBuy.play();
    if (this.classList.contains('item-watermelon')) {
      userData.bufFruit = true;
    }
    else if (this.classList.contains('item-horizont')) {
      userData.horizontal = true;
      background.classList.add('border-left');
    }
    else if (this.classList.contains('item-vertical')) {
      userData.vertical = true;
      background.classList.add('border-top');
    }
    else if (this.classList.contains('item-suit')) {
      userData.vertical = true;
      background.classList.add('border-top');
      userData.horizontal = true;
      background.classList.add('border-left');
      userData.suit = true;
      for (let i of itemsShop) {
        if (i.classList.contains('item-vertical') || i.classList.contains('item-horizont')) {
          i.classList.add('shop-wrap-active');
          i.lastElementChild.innerText = 'Sold';
          i.removeEventListener('click', buyItem);
        }
      }
    }
    else if (this.classList.contains('item-cyber')) {
      userData.skins.cyber = true;
    }
    else if (this.classList.contains('item-punk')) {
      userData.skins.punk = true;
    }
    else if (this.classList.contains('item-zebra')) {
      userData.skins.zebra = true;
    }
    else if (this.classList.contains('item-lgbt')) {
      userData.skins.lgbt = true;
    }
    else if (this.classList.contains('item-skin-black')) {
      userData.heads.black = true;
    }
    else if (this.classList.contains('item-skin-pink')) {
      userData.heads.pink = true;
    }
    else if (this.classList.contains('item-skin-vampire')) {
      userData.heads.vampire = true;
    }
    else if (this.classList.contains('item-head-vampire-hat')) {
      userData.heads.vampireHat = true;
    }
    localStorage.setItem("UserData", JSON.stringify(userData));
    this.classList.add('shop-wrap-active');
    this.lastElementChild.innerText = 'Sold';
    this.removeEventListener('click', buyItem);
  }
  console.log(this);
  pasteMoney.innerText = userData.money;
}

function drawSkins() {
  for (let i of skinsInputs) {
    if (userData.skins.lgbt === true && i.classList.contains('item-skin-lgbt')) {
      i.firstElementChild.disabled = false;
    }
    if (userData.skins.zebra === true && i.classList.contains('item-skin-zebra')) {
      i.firstElementChild.disabled = false;
    }
    if (userData.skins.punk === true && i.classList.contains('item-skin-punk')) {
      i.firstElementChild.disabled = false;
    }
    if (userData.skins.cyber === true && i.classList.contains('item-skin-cyber')) {
      i.firstElementChild.disabled = false;
    }
  }
}
function drawHeads() {
  for (let i of headsInputs) {
    if (userData.heads.black === true && i.classList.contains('item-head-black')) {
      i.firstElementChild.disabled = false;
    }
    console.log(i);
    if (userData.heads.pink === true && i.classList.contains('item-head-pink')) {
      i.firstElementChild.disabled = false;
    }
    if (userData.heads.vampire === true && i.classList.contains('item-head-vampire')) {
      i.firstElementChild.disabled = false;
    }
    if (userData.heads.vampireHat === true && i.classList.contains('item-head-vampire-hat')) {
      i.firstElementChild.disabled = false;
    }
  }
}

function startRoulette() {
  cards = document.querySelectorAll('.cards-item');
  if (userData.money - 100 >= 0) {
    userData.money = userData.money - 100;
    audioBuy.play();
    audioCasino.play();
    localStorage.setItem("UserData", JSON.stringify(userData));
    pasteMoney.innerText = userData.money;
  }
  let random = Math.floor(Math.random() * cards.length);
  console.log(random);
  cards_block.style.left = -random * 105 + 'px';
  setTimeout(function () {
    random++;
    cards[random].style.background = 'rgb(60, 255, 0)';
    cards[random].style.color = 'black';
    if (cards[random].firstElementChild.classList[1]) {
      getRouletteItem(cards[random].firstElementChild);
    }
  }, 5000);
  for (let i of cards) {
    i.style.background = 'white';
  }
}
function getRouletteItem(prize) {
  if (prize.classList.contains('item-watermelon')) {
    userData.bufFruit = true;
  }
  else if (prize.classList.contains('item-horizont')) {
    userData.horizontal = true;
    background.classList.add('border-left');
  }
  else if (prize.classList.contains('item-vertical')) {
    userData.vertical = true;
    background.classList.add('border-top');
  }
  else if (prize.classList.contains('item-suit')) {
    userData.vertical = true;
    background.classList.add('border-top');
    userData.horizontal = true;
    background.classList.add('border-left');
    userData.suit = true;
    for (let i of itemsShop) {
      if (i.classList.contains('item-vertical') || i.classList.contains('item-horizont')) {
        i.classList.add('shop-wrap-active');
        i.lastElementChild.innerText = 'Sold';
        i.removeEventListener('click', buyItem);
      }
    }
  }
  else if (prize.classList.contains('item-cyber')) {
    userData.skins.cyber = true;
  }
  else if (prize.classList.contains('item-punk')) {
    userData.skins.punk = true;
  }
  else if (prize.classList.contains('item-zebra')) {
    userData.skins.zebra = true;
  }
  else if (prize.classList.contains('item-lgbt')) {
    userData.skins.lgbt = true;
  }
  else if (prize.classList.contains('item-skin-black')) {
    userData.heads.black = true;
  }
  else if (prize.classList.contains('item-skin-pink')) {
    userData.heads.pink = true;
  }
  else if (prize.classList.contains('item-skin-vampire')) {
    userData.heads.vampire = true;
  }
  else if (prize.classList.contains('item-head-vampire-hat')) {
    userData.heads.vampireHat = true;
  }
  localStorage.setItem("UserData", JSON.stringify(userData));
}
function radioSelectSkin() {
  userData.selectBodySkin = this.value;
  localStorage.setItem("UserData", JSON.stringify(userData));
}
function radioSelectHead() {
  userData.selectHeadSkin = this.value;
  localStorage.setItem("UserData", JSON.stringify(userData));
}

function drawShop(block, fromFile) {
  while (block.firstChild) {
    block.removeChild(block.firstChild);
  }
  for (let i = 0; i < fromFile.length; i++) {
    let shopItem = `
    <li class="shop-list-item">
      <div class="shop-wrap ${fromFile[i].class}">
        <img class="shop-image" src="${fromFile[i].image}" alt="">
        <span>${fromFile[i].name}</span>
        <span class="cost-text">cost: </span>
        <span class="cost">${fromFile[i].cost}</span>
      </div>
    </li>`;
    block.innerHTML += shopItem;
  }
}

function drawRoulette(erase, fromFile) {
  if (erase === true) {
    while (cards_block.firstChild) {
      cards_block.removeChild(cards_block.firstChild);
    }
  }
  var rouletteItem;
  for (let i = 0; i < fromFile.length; i++) {
    let random = Math.random() * 100;
    if (random >= 40) {
      rouletteItem = `
                      <li class="cards-item">
                        <span class="roulette-text">try again</span>
                      </li>`;
      i--;
    }
    else {
      rouletteItem = `
      <li class="cards-item">
        <div class="roulette-item-wrap ${fromFile[i].class}">
          <img class="shop-image" src="${fromFile[i].image}" alt="">
        </div>
      </li>`;
    }
    cards_block.innerHTML += rouletteItem;
  }
}