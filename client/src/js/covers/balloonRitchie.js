export const balloonRitchie = {
    background: "../media/balloonRitchie/back.svg",
    speechBubble: "Drag across the cover to animate!",
    images: {
      myCover: "./src/media/balloonRitchie/Artboard 1 copy 6.png"
    },
    draw: (ctx, images, bounds) => {
      ctx.save();
      ctx.translate(
        bounds.left + bounds.width * 0.5,
        bounds.top + bounds.height * 0.5
      );
      ctx.rotate(0.057);
      ctx.drawImage(
        images.myCover,
        -bounds.width * 0.4,
        -bounds.height * 0.5,
        bounds.width * 0.8,
        bounds.height
      );
      ctx.restore();
    },
    update: (deltaTime) => {
      
    }
  }