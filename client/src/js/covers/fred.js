
function currentImage(ctx, images, offsetX, offsetY, scaledWidth, scaledHeight, current) {
  if(current == 1) {
    ctx.drawImage(images.fred1, offsetX + 150, offsetY + 300, scaledWidth * 1.05, scaledHeight * 1.05)
  } else if (current == 2) {
    ctx.drawImage(images.fred2, offsetX + 150, offsetY + 300, scaledWidth * 1.05, scaledHeight * 1.05)
  } else if (current == 3) {
    ctx.drawImage(images.fred3, offsetX + 150, offsetY + 300, scaledWidth * 1.05, scaledHeight * 1.05)
  } else if (current == 4) {
    ctx.drawImage(images.fred4, offsetX + 150, offsetY + 300, scaledWidth * 1.05, scaledHeight * 1.05)
  }
  
}




export const fred = {
    // background: "https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x4.jpg",
    speechBubble: "Tap to change the color palette!",
    images: {
      cover: "./src/media/fred/Artboard 2.png",
      fred1: "./src/media/fred/Artboard 2.png",
      fred2: "./src/media/fred/Artboard 2 copy 3.png",
      fred3: "./src/media/fred/Artboard 2 copy 4.png",
      fred4: "./src/media/fred/Artboard 2 copy 5.png",
    },
    draw: (ctx, images, bounds) => {
      const imageAspectRatio = images.cover.width / images.cover.height;
      const canvasAspectRatio = bounds.width / bounds.height;
      let scaledWidth, scaledHeight;
      if (imageAspectRatio > canvasAspectRatio) {
        scaledWidth = bounds.width;
        scaledHeight = bounds.width / imageAspectRatio;
      } else {
        scaledHeight = bounds.height;
        scaledWidth = bounds.height * imageAspectRatio;
      }
      const offsetX = (bounds.width - scaledWidth) / 2;
      const offsetY = (bounds.height - scaledHeight) / 2;
      let current = 1;
      
      ctx.save();
      ctx.rotate(0.057);
      ctx.fillStyle = "white";
      ctx.fillRect(bounds.left + 50, bounds.top - 30, bounds.width, bounds.height);
      currentImage(ctx, images, offsetX, offsetY, scaledWidth, scaledHeight, current);
      ctx.restore();
    },
    update: (deltaTime) => {

    },
    onMouseDown: (x, y) => {
      
    }
  }