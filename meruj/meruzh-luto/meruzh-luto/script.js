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
let floor = {
    x:10,
    y:10,
    width:50,
    height: 50,
    fillreqt: "green"
}
            let canvasWidth = 1200;
            let canvasHeight = 500;
            let spriteWidth = 864;
            let spriteHeight = 280;
            let rows = 2;
            let cols = 8;
            let trackRight = 0;
            let trackLeft = 1;
            let width = spriteWidth / cols;
            let height = spriteHeight / rows;
            let curFrame = 0;
            let frameCount = 8;
            let x = 0;
            let y = 35;
            let srcX = width;
            let srcY = height;
            let left = false;
            let right = true;
            let speed = 30;
            let canvas = document.getElementById("canvas");
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            let ctx = canvas.getContext("2d");
            let character = new Image();
            character.src = "character.png";
            function updateFrame(){
                curFrame = ++curFrame % frameCount;
                ctx.clearRect(x, y, width, height);
                if (controller.left == false || controller.right == false) {
                    srcX = 0;
                    srcY = 0;
                }
                if (controller.left && x > 0) {
                    srcX = curFrame * width;
                    srcY = trackLeft * height;
                    x -= speed;
                }
                if (controller.right && x < canvasWidth - width) {
                    srcX = curFrame * width;
                    srcY = trackRight * height;
                    x += speed;
                }
                if (controller.up && y > 200) {
                    y -= 150;
                    controller.up = false;
                }
                else {
                    y = 350;
                }
                if (controller.down && y == 350) {
                    height = spriteHeight / (2 * rows);
                    controller.down = false;
                }
                else if (controller.down == false) {
                    height = spriteHeight / rows;
                    y = y - spriteHeight / (2 * rows);
                }
            }
            function draw() {
                updateFrame();
                ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height);
                ctx.drawImage(floor, floor.x,floor.y,floor.width,floor.height);
            }
            window.addEventListener("keydown", controller.keyListener)
            window.addEventListener("keyup", controller.keyListener);
            setInterval(draw, 100);