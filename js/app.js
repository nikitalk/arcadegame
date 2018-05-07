const cols = 11;

let stop = false;
const scoreid = document.querySelector("#score");
let score = 0;

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
    constructor(row, speed) {
        this.row = getRandomInt(1, 3);
        this.x = -100;
        this.y = this.row * 83 - 20;
        this.speed = getRandomInt(90, 250);
        this.sprite = "images/enemy-bug.png";
    }

    update(dt) {
        this.x += (this.speed*dt);
        if (this.x > cols * 101) {
            this.x = -100;
            this.row = getRandomInt(1, 3);
            this.y = this.row * 83 - 20;
            this.speed = getRandomInt(90, 250);
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
                player.col = Math.floor(cols / 2);
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
        this.x = 200;
        this.y = 373;
        this.row = 5;
        this.col = Math.floor(cols / 2);
        this.sprite = "images/char-pink-girl.png";
    }

    // Update the player's position
    update() { }

    // Draw the enemy on the screen,
    render() {
        ctx.drawImage(
            Resources.get(this.sprite),
            this.col * 101,
            this.row * 83 - 20
        );
        }

    handleInput(key) {
        if (key == "left") {
            if (this.col > 0) this.col--;
        }
        if (key == "right") {
            if (this.col < cols - 1) this.col++;
        }
        if (key == "up") {
            if (this.row > 0) this.row--;
            if (this.row == 0) {
                player.sprite = "images/great.png";
                stop = true;
                setTimeout(function () {
                    player.row = 5;
                    player.col = Math.floor(cols / 2);
                    player.sprite = "images/char-pink-girl.png";
                    stop = false;
                    p;
                }, 1000);
                scoreid.innerHTML = "";
                score++;
                scoreid.insertAdjacentHTML("beforeend", score);
                if (score == 5) {
                    score = 0;
                    allEnemies.push(new Enemy());
                    scoreid.insertAdjacentHTML("beforeend", "You win");
                }
            }
        }
        if (key == "down") {
            if (this.row < 5) this.row++;
        }
    }
}

const player = new Player();

const allEnemies = [];

for (i = 1; i<5; i++) {
    allEnemies.push(new Enemy(getRandomInt(1, 3), getRandomInt(150, 350)));
}

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
