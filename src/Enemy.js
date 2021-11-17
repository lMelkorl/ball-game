export class Enemy {
    speed = 2;
    dead = false;
    xPos;
    yPos;

   randomNumber = (min,max) => Math.random() * max + min;
    constructor(xPos,yPos){
        this.xPos = xPos;
        this.yPos = yPos; 
        this.radius = this.randomNumber(10,20)
    }

    isDead = () =>{
        const relY = Math.abs(this.yPos - 200);
        const relX = Math.abs(this.xPos - 300);

        if(relX < 20 && relY < 20){
            return true;
        }
    }
    update = (player,bullets) => {
        if (this.dead) return;
        const relX = this.xPos - 300;
        const relY = this.yPos - 200;
        const angle = Math.atan2(relX,relY,) * 100 / Math.PI;
        const x = Math.sin((angle * Math.PI) / 100) * this.speed;
        const y = Math.cos((angle * Math.PI) / 100) * this.speed;
        this.xPos -= x;
        this.yPos -= y;

        if(!this.dead && this.isDead()){
            this.dead = true;
            player.deductHealth();
        }
        
        if(!this.dead){
            bullets.forEach(bullet => {
                if(Math.abs(bullet.xPos - this.xPos) < this.radius && Math.abs(bullet.yPos - this.yPos) < this.radius){
                    player.increaseScore();
                    this.dead = true;
                    bullet.dead = true
                }
            });
        }
    }

    draw = (ctx) =>{
      ctx.beginPath();
      ctx.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.lineWİdth = 0.3;
      ctx.stroke();
    }
}
