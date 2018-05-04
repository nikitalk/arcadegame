// Enemies our player must avoid
class Enemy {
    constructor(){
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.x = 10;
        this.y = 10;
        this.sprite = 'images/enemy-bug.png'; 
    }

    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    }

    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
    }
}

// Player class
class Player {
    constructor(){
        this.x = 10;
        this.y = 10;
        this.sprite = 'images/char-boy.png'; 
    }

    // Update the player's position
    update() {

    }

    // Draw the enemy on the screen,
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
    }

    handleInput(key) {
        if (key == "left") {
            this.x-=100;
        } else
        if (key == "right") {
            this.x+=100;
        } else
        if (key == "up") {
            this.y-=100;
        } else
        if (key == "down") {
            this.y+=100;
        }
    }
}

const enemy = new Enemy();
const enemy1 = new Enemy();
const player = new Player();

const allEnemies = [enemy, enemy1];
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
