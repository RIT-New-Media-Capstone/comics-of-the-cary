const dice = [
  {
    image: "dice1",
    x: 0,
    y: 0,
  },
  {
    image: "dice2",
    x: 0,
    y: 0,
  },
  {
    image: "dice3",
    x: 0,
    y: 0,
  },
  {
    image: "dice4",
    x: 0,
    y: 0,
  },
  {
    image: "dice5",
    x: 0,
    y: 0,
  },
]

export const casey = {
  background: "../media/casey/casey-background.svg",
  speechBubble: "CLICK TO ROLL THE DICE!",
  images: {
    cover: "./src/media/casey/cover2.jpg",
    dice1: "./src/media/casey/Dice-06.png",
    dice2: "./src/media/casey/Dice-07.png",
    dice3: "./src/media/casey/Dice-09.png",
    dice4: "./src/media/casey/Dice-11.png",
    dice5: "./src/media/casey/Dice1.png",
  },
  init: (images) => {
    for (const die of dice) {
      die.image = images[die.image];
      die.x = Math.random();
      die.y = Math.random();
    }
  },
  draw: (ctx, images, bounds) => {
    for (const die of dice) {
      ctx.drawImage(die.image, die.x * ctx.canvas.width, die.y * ctx.canvas.height);
    }
  },
  update: (deltaTime) => {
    console.log('hi max' + deltaTime);
  },
  onMouseUp: () => {
    for (const die of dice) {
      die.x = Math.random();
      die.y = Math.random();
    }
  }
}