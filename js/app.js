const cols = 11;
// Enemies our player must avoid
class Enemy {
    constructor(row, speed){
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.row = getRandomInt(1, 3);
        this.x = -100;
        this.y = this.row*83-20;
        this.speed = getRandomInt(7, 15);
        this.sprite = 'images/enemy-bug.png'; 
    }

    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x+=this.speed;
        if (this.x > cols*101) {
          this.x = -100;
          this.row = getRandomInt(1, 3);
          this.y = this.row * 83 - 20;
          this.speed = getRandomInt(7,15);
        }
        
        if ((this.row == player.row) && (this.x > player.col * 101 - 50) && (this.x < player.col * 101 + 50)) {
        player.row = 5;
        player.col = Math.floor(cols / 2);
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
    constructor(){
        this.x = 200;
        this.y = 373;
        this.row = 5;
        this.col = Math.floor(cols / 2);
        this.sprite = 'images/char-boy.png'; 
    }

    // Update the player's position
    update() {

    }

    // Draw the enemy on the screen,
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.col*101, this.row*83-20); 
    }

    handleInput(key) {
      
        if (key == "left") {
           if (this.col>0) this.col--;
        }
        if (key == "right") {
           if (this.col < cols-1) this.col++;
        }
        if (key == "up") {
            if (this.row > 0) this.row--;
            if (this.row == 0) { this.row = 5; this.col = Math.floor(cols / 2);}
        }
        if (key == "down") {
            if (this.row < 5) this.row++;
        }
    }
}

const enemy = new Enemy();
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const enemy4 = new Enemy();

const player = new Player();

const allEnemies = [enemy , enemy1, enemy2, enemy3, enemy4];
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
