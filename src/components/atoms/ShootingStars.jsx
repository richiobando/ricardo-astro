import React, { useEffect, useRef } from 'react';
// import 
function shootingStars(canvas, bg) {
  const ctx = canvas.getContext('2d');

  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;
  const color = '#fff';
  let radius = 2;
  let starsIndex = 0;
  let stars = [];
  let TWO_PI = Math.PI * 2;
  let starRadius = null;
  let starX = null;
  let starY = null;
  let numStars = 200;
  let mouse = { x: null, y: null };
  let starX_dir = 0;
  let starY_dir = 0;
  let x = 0;
  let y = 0;
  let z = 0;
  for (let i = 0; i < numStars; i++) {
    [x, y] = randomPosition();
  }
  function draw() {
    ctx.beginPath();
    ctx.arc(starX, starY, starRadius, 0, TWO_PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
  function update() {
    starX = this.x;
    starY = this.y;

    this.z++;
    starRadius = radius * Math.abs(Math.sin(this.z / 50));
    starX += starX_dir;
    starY += starY_dir;
    draw();
  }
  function updateShooting() {
    starX = this.x;
    starY = this.y;
    starRadius = 2;
    this.x += -5 * this?.director.x;
    this.y += -5 * this?.director.y;
    radius = 2;
    draw();
  }

  function star(x, y, z) {
    const starObj = {
      x: x,
      y: y,
      z: z,
      color: '#fff',
      draw: draw,
      id: 0,
      radius: radius,
      update: update,
      shooting: false,
    };

    stars[starsIndex] = starObj;
    starsIndex++;
    starObj.id = starsIndex;
  }

  function randomPosition() {
    const x = -innerWidth + Math.random() * innerWidth * 2;
    const y = Math.random() * innerHeight;
    const z = Math.random() * innerWidth;
    star(x, y, z);
    return [x, y, z];
  }
  function directors() {
    const directorX = Math.abs(Math.sin(Math.random() * TWO_PI));
    const directorY = Math.sin(Math.random() * TWO_PI);
    return { x: directorX, y: directorY };
  }
  // shoot a shooting star
  canvas.addEventListener('click', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    const starObj = {
      x: x,
      y: y,
      z: 0,
      color: '#fff',
      draw: draw,
      id: 0,
      radius: 3,
      update: update,
      shooting: true,
      director: directors(),
      updateShooting,
    };
    stars[starsIndex] = starObj;
    starsIndex++;
    starObj.id = starsIndex;
  });

  canvas.addEventListener('wheel', (e) => {
    mouse.x = e.deltaX;
    mouse.y = e.deltaY;
    if (e.deltaY > 0) {
      starX_dir += 2;
    }
    if (e.deltaY < 0) {
      starX_dir -= 2;
    }
  });
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    for (let i in stars) {
      stars[i].update();
      if (stars[i].shooting) {
        stars[i].updateShooting();
      }
    }
  }
  animate();
}

export default function ShootingStars(props) {
  const { bg } = props
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    shootingStars(canvas,bg );
  }, []);


  return (
      <canvas ref={canvasRef} />
  );
}