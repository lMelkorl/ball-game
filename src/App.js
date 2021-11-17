/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Bullet } from './Bullet';
import { Enemy } from './Enemy';
import { Player } from './Player';

function App() {
  let canvas;
  let ctx;
  let maxEnemyCount = 10;
  let lastEnemySpawnAt = Date.now();

  const player = new Player(600 / 2,400 / 2);

  const randomNumber = (min,max) => Math.random() * max + min;

  useEffect(() => {
    canvas = document.getElementById("myCanvas");

    let enemies = [];
    let bullets = [];
    const fireBulletcb = (angle,xpos,ypos) => bullets.push(new Bullet(angle,xpos,ypos));

    setInterval(() => {    
      ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,600,400)

      player.update(fireBulletcb);
      player.draw(ctx);

      const random = randomNumber(0,200);
      const random2 = randomNumber(0,200);
      if(enemies.length < maxEnemyCount && (Date.now() - lastEnemySpawnAt) > 1500){
        enemies.push(new Enemy(
          Math.random() < 0.5 ? 
          randomNumber(-random, 600 / 2 - random)
          :randomNumber(600 + random,600 / 2 + random),
          Math.random() < 0.5 ? 
          randomNumber(-random2, 400 / 2 - random2)
          :randomNumber(400 + random2,400 / 2 + random2),
          ));
          lastEnemySpawnAt = Date.now();
      }
      enemies = enemies.filter((enemy) => !enemy.dead);
      enemies.forEach(enemy => {
        enemy.update(player,bullets);
        enemy.draw(ctx);
      })

      bullets = bullets.filter((bullet) => !bullet.dead);
      bullets.forEach(bullet => {
        bullet.update();
        bullet.draw(ctx);
      })

    }, 1000 / 30);
  })
  return (
    <div style={{
    display:'flex',justifyContent:'center',alignItems:'center',height:'100%',flexDirection:'row'
    }}>
        <canvas id="myCanvas" width="600" height="400" style={{border:'2px solid #000000',marginTop:'48px'}}/>
    </div>
    
  );
}

export default App;
