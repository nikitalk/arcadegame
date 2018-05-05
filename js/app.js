// Enemies our player must avoid
class Enemy {
    constructor(){
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.x = 10;
        this.y = 10;
        this.speed = 10;
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
        this.x = 200;
        this.y = 373;
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
           if (this.x>-2) this.x-=101;
        }
        if (key == "right") {
           if (this.x < 402) this.x += 101;
        }
        if (key == "up") {
            if (this.y > -42) this.y -= 83;
            if (this.y == -42) { this.y = 373; this.x = 200;}
        }
        if (key == "down") {
            if (this.y < 373) this.y += 83;
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
