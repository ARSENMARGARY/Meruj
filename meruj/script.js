const imagePath = {
    character: {
        small: "./assets/character2.png",
        big: "./assets/character.png",
    },
    textures: {
        mushroom: './assets/temporaryMushroom.webp',
        enemy: './assets/enemy.png'
    }
};


let controller = {
    left: false,
    right: false,
    up: false,
    down: false,
    keyListener: function (event) {

        let key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

            case 37:
                controller.left = key_state;
                break;
            case 32:
                controller.up = key_state;
                break;
            case 39:
                controller.right = key_state;
                break;
            case 40:
                controller.down = key_state;
                break;

        }

    }
};
let canvasWidth = 1200;
let canvasHeight = 500;

let spriteWidth = 864;
let spriteHeight = 280;
let turn = true;
let rows = 2;
let cols = 8;

let trackRight = 0;
let trackLeft = 0;
let DownUp = 1;

let width = spriteWidth / cols;
let height = spriteHeight / rows;

let curFrame = 0;
let u = 0;
let u1 = 0;
let frameCount = 8;

let x = 100;
let y = 350;

let srcX = width;
let srcY = height;

let left = false;
let right = true;

let speed = 24;

let canvas = document.getElementById('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let ctx = canvas.getContext("2d");

let character = new Image();
character.src = imagePath.character.small;

let mushroom = new Image();
mushroom.src = imagePath.textures.mushroom;

let enemy = new Image();
enemy.src = imagePath.textures.enemy;

function updateFrame() {
    curFrame = ++curFrame % (frameCount - 4);
    drawTexture([mushroom, 600, 350, 60, 60]);

    u = ((++u % 2) + 2);
    u1 = ((++u1 % 2) + 4);
    ctx.clearRect(x, y, width, height);
    if (turn === true) {
        srcX = 3 * width;
        srcY = 0;
    }
    else {
        srcX = 4 * width;
        srcY = 0;

    }

    if (controller.left && x > 0) {

        srcX = (curFrame + 4) * width;
        srcY = trackLeft * height;
        x -= speed;
        turn = false;
    }



    if (controller.right && x < canvasWidth - width) {

        srcX = curFrame * width;
        srcY = trackRight * height;
        x += speed;
        turn = true;
    }
    if (controller.up && turn == false && y > 50) {
        y -= 10;
        srcY = 1 * height;
        srcX = u1 * width;

        // controller.up = true;
    }
    else if (controller.up && turn == true && y > 50) {
        y -= 10;
        srcY = 1 * height;
        srcX = u * width;

        // controller.up = true;
    }


    else {
        y = 350;
    }

    if (controller.down && y == 350 && turn == true) {
        // height = spriteHeight / (2 * rows);
        srcX = 1 * width;
        srcY = height;
    }
    else if (controller.down && y === 350 && turn === false) {
        // height = spriteHeight / (2 * rows);
        srcX = 6 * width;
        srcY = height;
    }
    else if (controller.down == false) {
        height = spriteHeight / rows;
        y = y - spriteHeight / (2 * rows);
    }
    if(x >= 500 && x <= 600) {
        ctx.clearRect(600, y + 70, 60, 60);
        character.src = imagePath.character.big;

    }
    if(x >= 700) {
        character.src = imagePath.character.small;
    }

}

function draw() {
    updateFrame();
    drawTexture([enemy, 800, 350, 60, 60]);
    ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height);
}

function drawTexture(renderer) {
    ctx.drawImage(...renderer);
}

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);

setInterval(draw, 100);
