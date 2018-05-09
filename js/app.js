// Game class

class Game {
  constructor() {
    this.score = 0;
  }

  initialize() {
    this.hideWindow("#gaming", "#game-over", "#win-game");
  }

  startGame() {
    this.score = 0;
    this.hideWindow("#begin", "#game-over", "#win-game");
    this.showWindow("#gaming");

    stopRender = false;

    player.reset();
    player.lives = 3;
    showHearts(player.lives);

    for (const enemy of allEnemies) {
      enemy.reset();
    }

    scoreId.innerHTML = "";
    scoreId.insertAdjacentHTML("beforeend", "Score: " + game.score);

    addCanvasEventListener();
  }

  stopGame() {
    this.hideWindow("#gaming");
    stopRender = true;
    removeCanvasEventListener();
  }

  gameOver() {
    this.stopGame();
    this.showWindow("#game-over");
  }

  winGame() {
    this.stopGame();
    this.showWindow("#win-game");
  }

  hideWindow() {
    for (const argument of arguments) {
      document.querySelector(argument).style.display = "none";
    }
  }

  showWindow(windowName) {
    document.querySelector(windowName).style.display = "";
  }
}

// Enemy class
class Enemy {
  constructor() {
    this.row = getRandomInt(1, 3);
    this.x = -getRandomInt(100, 300);
    this.y = this.row * 83 - 20;
    this.speed = getRandomInt(190, 550);
    this.sprite = "images/enemy-bug.png";
  }

  reset() {
    this.x = -getRandomInt(100, 300);
    this.row = getRandomInt(1, 3);
    this.y = this.row * 83 - 20;
    this.speed = getRandomInt(190, 550);
  }

  update(dt) {
    this.x += this.speed * dt;
    if (this.x > 7 * 101) this.reset();
  }

  collision() {
    if (
      this.row == player.row &&
      this.x > player.col * 101 - 50 &&
      this.x < player.col * 101 + 50 &&
      !stopMoves
    ) {
      player.sprite = "images/bam.png";
      stopMoves = true;
      setTimeout(function() {
        player.reset();
        player.sprite = "images/char-pink-girl.png";
        stopMoves = false;
        player.lives--;
        showHearts(player.lives);
      }, 1000);
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Player class
class Player {
  constructor() {
    this.lives = 3;
    this.row = 5;
    this.col = 3;
    this.sprite = "images/char-pink-girl.png";
  }

  reset() {
    this.row = 5;
    this.col = 3;
  }

  render() {
    ctx.drawImage(
      Resources.get(this.sprite),
      this.col * 101,
      this.row * 83 - 20
    );
  }

  handleInput(key) {
    if (key == "left" && this.col > 0) this.col--;
    if (key == "right" && this.col < 6) this.col++;
    if (key == "up" && this.row > 0) this.row--;
    if (key == "down" && this.row < 5) this.row++;
  }
}


// DOM elements

const scoreId = document.querySelector("#score");
const startGame = document.querySelector("#start-game");
const tryAgain = document.querySelector("#try-again");
const playAgain = document.querySelector("#play-again");

// Variables

let stopMoves = false;
let stopRender = false;

const player = new Player();

const allEnemies = [];
for (i = 1; i < 7; i++) allEnemies.push(new Enemy());

const game = new Game();

const allowedKeys = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
};

const keyUpEvent = function(e) {
  if (!stopMoves) player.handleInput(allowedKeys[e.keyCode]);
};

/**
 * Adding event listener to canvas
 */
function addCanvasEventListener() {
  document.addEventListener("keyup", keyUpEvent);
}

/**
 * Deleting event listener from canvas
 */
function removeCanvasEventListener() {
  document.removeEventListener("keyup", keyUpEvent);
}

/**
 * Show heart (player's life)
 */
function showHeart() {
  for (const argument of arguments) {
    document.querySelector(
      argument
    ).innerHTML = `<img src="images/Heart.png" width=40 height=60 align=center>`;
  }
}

/**
 * Hide heart (player's life)
 */
function hideHeart() {
  for (const argument of arguments) {
    document.querySelector(argument).innerHTML = ``;
  }
}

/**
 * Show needed number of hearts
 */
function showHearts(numberOfLives) {
  if (numberOfLives == 1) {
    hideHeart("#heart-2", "#heart-3");
  } else if (numberOfLives == 2) {
    hideHeart("#heart-3");
  } else if (numberOfLives == 3) {
    showHeart("#heart-1", "#heart-2", "#heart-3");
  }
}