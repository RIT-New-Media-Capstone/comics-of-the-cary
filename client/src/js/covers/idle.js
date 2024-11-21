// coly heatn was here

let elapsedSeconds = 0;
let imgHeight;
let imgWidth;

let topRow = [];
let bottomRow = [];
let sprites = [];

let thumbnailWidth = 1400 / 6 - 20;
let thumbnailHeight = thumbnailWidth * 16 / 9;


class Thumbnail {
  constructor(index, isTop) {
    this.index = index;
    this.isTopRow = isTop;

    this.x = index * 1400 / 6;

    this.mySprite = index;

    if (isTop) this.mySprite += 6;

  }

  update() {
    this.x += 1;
    if (this.x > 1400) {
      this.x %= 1400;
      //this.getNewSprite();
    }
  }

  display(ctx) {
    let myY = 30;
    let myX = this.x;
    
    if (!this.isTopRow) {
      myY += thumbnailHeight + 30;
      myX = 1400 - myX;
    }

    myX -= 160;

    ctx.save();
    ctx.translate(
      myX,
      myY
    );

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.beginPath(); // Start a new path
    ctx.rect(0, 0, thumbnailWidth, thumbnailHeight);
    ctx.fill(); // Render the path

    ctx.translate(
      10,
      10
    );

    ctx.drawImage(sprites[this.mySprite], 0, 0, thumbnailWidth - 20, thumbnailHeight - 20);

    ctx.restore();
  }

  getNewSprite() {
    let randSprite = Math.floor(Math.random() * 12);
    while (this.doIMatchOthers(randSprite)) {
      randSprite = Math.floor(Math.random() * 12);
    }

    this.mySprite = randSprite;
  }

  doIMatchOthers(numToCheck) {
    let checkArr = (this.isTopRow) ? topRow : bottomRow;

    checkArr.forEach(thumb => {
      if (thumb.matchMySprite(numToCheck)) {
        return true;
      }
    });

    return false;
  }

  matchMySprite(compare) {
    return compare == this.mySprite;
  }
}

for (let i = 0; i < 6; i++) {
  topRow.push(new Thumbnail(i, true));
  bottomRow.push(new Thumbnail(i, false));
}

export const idle = {
  background: "../media/idle/idle.svg",
  speechBubble: " ",
  images: {
    text: "./src/media/idle/text.svg",
    background: "./src/media/idle/idle.svg",
    logo: "./src/media/idle/logo.svg",
    cloud: "./src/media/idle/cloud.svg",
    splash: "./src/media/idle/splash.svg",

    ritchie: "./src/media/idle/ritchie.png",
    fred: "./src/media/idle/fred.png",
    kenedy: "./src/media/idle/kenedy.png",
    kubert: "./src/media/idle/kubert.png",
    marinetti: "./src/media/idle/marinetti.png",
    pp1: "./src/media/idle/pp1.png",
    pp2: "./src/media/idle/pp2.png",
    rudolph: "./src/media/idle/harak.png",
    smoke: "./src/media/idle/smoke.png",
    tomaszewski: "./src/media/idle/tomaszewski.png",
    zapf: "./src/media/idle/zapf.png",
    ellsworth: "./src/media/idle/ellsworth.png",
  },
  draw: (ctx, images, bounds) => {
    ctx.drawImage(images.background, 0, 0, 1080, 1920);

    if (!sprites.length) {
      sprites = [
        images.ritchie,
        images.fred,
        images.kenedy,
        images.kubert,
        images.marinetti,
        images.pp1,
        images.pp2,
        
        images.smoke,
        images.rudolph,
        images.tomaszewski,
        images.zapf,
        images.ellsworth
      ];
    }

    // splash
    imgHeight = 740;
    imgWidth = 1080;
    ctx.save();
    ctx.translate(
      1080 / 2,
      1920 * 0.31
    );
    ctx.drawImage(images.splash, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
    ctx.restore();

    // scrolling banners
    ctx.save();
    ctx.translate(
      -100,
      1920 * 0.45
    );
    ctx.rotate(-0.075);
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.beginPath(); // Start a new path
    ctx.rect(0, 0, 1280, 860);
    ctx.fill(); // Render the path

    for (let i = 0; i < 6; i++) {
      topRow[i].display(ctx);
      bottomRow[i].display(ctx);
    }

    ctx.restore();

    // logo
    imgHeight = 740;
    imgWidth = 1080;
    imgHeight += Math.sin(elapsedSeconds) * 30;
    imgWidth += Math.sin(elapsedSeconds * 0.8) * 30;
    ctx.save();
    ctx.translate(
      1080 / 2,
      1920 * 0.29
    );
    ctx.drawImage(images.logo, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
    ctx.restore();


    // word banner
    imgWidth = 1120;
    imgHeight = 250;
    ctx.save();
    ctx.translate(
      1080 / 2,
      1920 * 0.65
    );
    ctx.rotate(Math.sin(elapsedSeconds * 0.7) / 12 - 0.1);
    ctx.drawImage(images.text, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
    ctx.restore();

    // cloud
    imgHeight = 280;
    imgWidth = 1080;
    ctx.save();
    ctx.translate(
      1080 / 2,
      1920 * 0.935
    );
    ctx.drawImage(images.cloud, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
    ctx.restore();
  },
  update: (deltaTime) => {
    elapsedSeconds += deltaTime / 1000;
    elapsedSeconds %= 10000;

    for (let i = 0; i < 6; i++) {
      topRow[i].update();
      bottomRow[i].update();
    }

  }
}