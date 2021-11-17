export class Bullet {
    angle;
    dead = false;
    speed = 5;
    xPos;
    yPos;
    constructor(angle,xPos,yPos){
        this.angle = angle;
        this.xPos = xPos;
        this.yPos = yPos;
    }

    update = () => {
        const x = Math.sin((this.angle)) * this.speed;
        const y = Math.cos((this.angle)) * this.speed;
        this.xPos += x;
        this.yPos += y;

        if(this.xPos < 0 || this.xPos > 600){
            this.dead = true
        }
        if(this.yPos < 0 || this.yPos > 400){
            this.dead = true
        }
    }
    
    draw = (ctx) => {
      ctx.beginPath();
      ctx.arc(this.xPos,this.yPos,5,0,2*Math.PI);
      ctx.fillStyle = "gold";
      ctx.fill();
      ctx.lineWİdth = 5;
      ctx.stroke();
    }
}
