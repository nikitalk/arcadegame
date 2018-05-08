let stop = false;
const scoreid = document.querySelector("#score");
const lifesid = document.querySelector("#lifes");
const startGame = document.querySelector("#start-game");
const tryAgain = document.querySelector("#try-again");
const playAgain = document.querySelector("#play-again");

class Game {
    constructor() {
        this.score = 0;
    }

    initialize() {
        this.hideWindow('#gaming');
        this.hideWindow('#game-over');
        this.hideWindow('#win-game');
    }

    startGame() {
        this.score = 0;
        player.lifes = 3;
        this.hideWindow('#begin');
        this.showWindow('#gaming');
        this.hideWindow('#win-game');
        this.hideWindow('#game-over');
        stoprender = false;
        player.reset(); 
        lifesid.innerHTML = "";
        for (const enemy of allEnemies) {
            enemy.reset();
        }
        lifesid.insertAdjacentHTML("beforeend", player.lifes);
        scoreid.innerHTML = "";
               
                scoreid.insertAdjacentHTML("beforeend", game.score);

        addCanvasEventListener();
    }

    gameOver() {
        this.hideWindow('#gaming');
        this.showWindow('#game-over');
        stoprender = true;
    }

    winGame() {
        this.hideWindow('#gaming');
        this.showWindow('#win-game');
        stoprender = true;
    }

    hideWindow(windowName) {
        document.querySelector(windowName).style.display = 'none';
    };
    
    showWindow(windowName) {
        document.querySelector(windowName).style.display = '';
    };
}

class Enemy {
    constructor() {
        this.row = getRandomInt(1, 3);
        this.x = -getRandomInt(100, 600);
        this.y = this.row * 83 - 20;
        this.speed = getRandomInt(190, 550);
        this.sprite = "images/enemy-bug.png";
    }

    reset() {
        this.x = -100;
        this.row = getRandomInt(1, 3);
        this.y = this.row * 83 - 20;
        this.speed = getRandomInt(190, 550);
    }

    update(dt) {
        this.x += (this.speed*dt);
        if (this.x > 7 * 101) this.reset();
    }

    collision() {
        if ((
            this.row == player.row &&
            this.x > player.col * 101 - 50 &&
            this.x < player.col * 101 + 50
        )&& !stop) {
            player.sprite = "images/bam.png";
            stop = true;
            setTimeout(function () {
                player.row = 5;
                player.col = 3;
                player.sprite = "images/char-pink-girl.png";
                stop = false;
                player.lifes--;
            lifesid.innerHTML = "";
               
            lifesid.insertAdjacentHTML("beforeend", player.lifes);
            }, 1000);
            
        }
    }

    // Draw the enemy on the screen
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
        this.lifes = 3;
        this.row = 5;
        this.col = 3;
        this.sprite = "images/char-pink-girl.png";
    }

    update() { 
        
    }

    reset() {
        this.row = 5;
        this.col = 3;
        
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.col * 101, this.row * 83 - 20);
        }

    handleInput(key) {
        if ((key == "left") && (this.col > 0)) this.col--;
        if ((key == "right") && (this.col < 6)) this.col++;
        if ((key == "up") && (this.row > 0)) this.row--;
        if ((key == "down") && (this.row < 5)) this.row++;
    }
}



const player = new Player();

const allEnemies = [];
for (i = 1; i<5; i++) allEnemies.push(new Enemy());

const game = new Game();


const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

const keyUpEvent = function (e) {
    if (!stop) player.handleInput(allowedKeys[e.keyCode]);
};

function addCanvasEventListener() {
    document.addEventListener('keyup', keyUpEvent);
}

function removeCanvasEventListener() {
    document.removeEventListener('keyup', keyUpEvent);
}