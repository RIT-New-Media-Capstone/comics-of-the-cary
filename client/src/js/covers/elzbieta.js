class Particle {
  x;
  y;
  vx;
  vy;
  ax;
  ay;
  age;
  size;
  noise;
  sprite;
  rotation;

  constructor(x, y, vx, vy, ax, ay) {
    this.x = x;
    this.y = y;
    this.vx = vx ?? 0;
    this.vy = vy ?? 0;
    this.ax = ax ?? 0;
    this.ay = ay ?? 0;
    this.age = 0;
    this.size = 100 + Math.random() * 100;
    this.sprite = Math.floor(Math.random() * 7);
    this.rotation = Math.random() * Math.PI * 2;
  }

  update(deltaTime) {
    this.x += this.vx * deltaTime * 0.015;
    this.y += this.vy * deltaTime * 0.015;

    this.vx += this.ax * deltaTime * 0.015;
    this.vy += this.ay * deltaTime * 0.015;

    this.age += 1 * deltaTime * 0.015;
    this.size -= 2 * deltaTime * 0.015;
  }

  render(ctx, images) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = 0.2;
    ctx.drawImage(images[this.sprite], this.size * -0.5, this.size * -0.5, this.size, this.size);
    ctx.restore();
  }
}

class ParticleSystem {
  width;
  height;
  particles;
  GRAVITY = -2;

  constructor() {
    this.width = 1080;
    this.height = 1920;
    this.particles = [];
  }

  addParticle(x, y, noise) {
    noise ??= 0;
    const noiseAngle = Math.random() * 2 * Math.PI;
    const noiseOffset = (Math.random() - 0.5) * noise;

    this.particles.push(
      new Particle(
        x + noiseOffset * Math.cos(noiseAngle) ?? Math.random() * this.width,
        y + noiseOffset * Math.sin(noiseAngle) ?? Math.random() * this.height,
        0,
        0,
        0,
        this.GRAVITY
      )
    );
  }

  update(deltaTime) {
    const survivors = [];

    for (const particle of this.particles) {
      particle.update(deltaTime);
      if (
        particle.x > 0 &&
        particle.y > 0 &&
        particle.x < this.width &&
        particle.y < this.height &&
        particle.size > 0
      )
        survivors.push(particle);
    }

    this.particles = survivors;
  }

  render(ctx, images) {
    for (const particle of this.particles) {
      particle.render(ctx, images);
    }
  }
}

const system = new ParticleSystem();
let mousedown = false;
let mouseX;
let mouseY;

export const elzbieta = {
  background: "../media/elzbieta/page-background.svg",
  speechBubble: "DRAG AROUND TO GENERATE SMOKE!",
  images: {
    cover:
      "./src/media/elzbieta/background.png",
    signature: "./src/media/elzbieta/signature.png",
    smoke1: "./src/media/elzbieta/smoke1.png",
    smoke2: "./src/media/elzbieta/smoke2.png",
    smoke3: "./src/media/elzbieta/smoke3.png",
    smoke4: "./src/media/elzbieta/smoke4.png",
    smoke5: "./src/media/elzbieta/smoke5.png",
    smoke6: "./src/media/elzbieta/smoke6.png",
    smoke7: "./src/media/elzbieta/smoke7.png",
  },
  draw: (ctx, images, bounds) => {
    system.render(ctx, [
      images.smoke1,
      images.smoke2,
      images.smoke3,
      images.smoke4,
      images.smoke5,
      images.smoke6,
      images.smoke7,
    ]);
    ctx.drawImage(images.signature, bounds.left, bounds.top, 765, 1360);
  },
  update: (deltaTime) => {
    system.update(deltaTime);
    if (!mousedown || mouseX === null || mouseY === null) return;
    for (let i = 0; i < 5; i++) {
      system.addParticle(mouseX, mouseY, 300);
    }
  },
  onMouseDown: (x, y) => {
    mousedown = true;
    mouseX = x;
    mouseY = y;
  },
  onMouseUp: () => {
    mousedown = false;
  },
  onMouseMove: (x, y) => {
    if (!mousedown) return;
    mouseX = x;
    mouseY = y;
  },
};