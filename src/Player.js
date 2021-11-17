export class Player {
    angle = 0;
    health = 100;
    ammo = 100;
    score = 0;
    dead = false;
    fireBullets = [];
    lastFireAt = Date.now();

    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

    fire = () => {
    }

    update = (firecb) => {
        if (this.health <= 0) {
            this.dead = true;
            gameOver(this.score);
        }
        this.angle = (this.angle + 0.07) % 360;

        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 32) {
                if (Date.now() - this.lastFireAt > 250) {
                    firecb(this.angle, 600 / 2, 400 / 2);
                    this.lastFireAt = Date.now();
                }
            }
        });
    }

    deductHealth = () => {
        this.health -= 10;
    }

    increaseScore = () => {
        this.score += 10
    }

    draw = (ctx) => {
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, 25, 0, 2 * Math.PI);
        ctx.fillStyle = "#537EFF";
        ctx.fill();
        ctx.lineWİdth = 0.3;
        ctx.stroke();

        ctx.font = '16px Arial';
        ctx.fillStyle = "black";
        ctx.fillText(`Health: ${this.health}`, 600 - 100, 400 - 15);

        // ctx.font = '16px Arial';
        // ctx.fillStyle = "black";
        // ctx.fillText(`Kurşun: ${this.ammo}`, 600 - 180, 400 - 15);

        ctx.font = '16px Arial';
        ctx.fillStyle = "lightgreen";
        ctx.fillText(`Score: ${this.score}`, 15, 25);

        const relX = this.xPos - 300;
        const relY = this.yPos - 200;
        const angle = Math.atan2(relX, relY,) * 100 / Math.PI;
        const x = Math.sin((angle * Math.PI) / 100) * 5;
        const y = Math.cos((angle * Math.PI) / 100) * 5;
        this.xPos -= x;
        this.yPos -= y;

        const edgeX = Math.sin(this.angle) * 50;
        const edgeY = Math.cos(this.angle) * 50;
        ctx.beginPath();
        drawArrow(ctx, 600 / 2, 400 / 2, 600 / 2 + edgeX, 400 / 2 + edgeY);
        ctx.stroke();
    }
}

function drawArrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

function gameOver(score) {
    document.body.innerHTML = `
    <center>
    <br/>
    <h2>Game Over!</h2>
    <p>Your Score: ${score}</p>
    <button class="btn btn-danger mt-2" onClick="location.reload()">Again</button>
    </center>
    `
}