let stop = false;
const scoreid = document.querySelector("#score");


class Game {
    constructor() {
        this.score = 0;
        this.colomns = 11;
        this.rows = 5;
    }

    startGame() {
        this.score = 0;
    }

    gameOver() {
        
    }

    resetGame() {


    }
}

class Enemy {
    constructor() {
        this.row = getRandomInt(1, 3);
        this.x = -getRandomInt(100, 600);
        this.y = this.row * 83 - 20;
        this.speed = getRandomInt(190, 550);
        this.sprite = "images/enemy-bug.png";
    }

    update(dt) {
        this.x += (this.speed*dt);
        if (this.x > 7 * 101) {
            this.x = -100;
            this.row = getRandomInt(1, 3);
            this.y = this.row * 83 - 20;
            this.speed = getRandomInt(190, 550);
        }
    }

    collision() {
        if (
            this.row == player.row &&
            this.x > player.col * 101 - 50 &&
            this.x < player.col * 101 + 50
        ) {
            player.sprite = "images/bam.png";
            stop = true;
            setTimeout(function () {
                player.row = 5;
                player.col = 3;
                player.sprite = "images/char-pink-girl.png";
                stop = false;
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
        this.row = 5;
        this.col = 3;
        this.sprite = "images/char-pink-girl.png";
    }

    // Update the player's position
    update() { 
        
    }

    reset() {
        this.row = 5;
        this.col = 3;
    }
    // Draw the enemy on the screen,
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
for (i = 1; i<10; i++) allEnemies.push(new Enemy());

const game = new Game();

document.addEventListener("keyup", function (e) {
    if (!stop) {
        var allowedKeys = {
            37: "left",
            38: "up",
            39: "right",
            40: "down"
        };
        player.handleInput(allowedKeys[e.keyCode]);
    }
});