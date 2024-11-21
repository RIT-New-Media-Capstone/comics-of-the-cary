export const harak = {
    // background: "https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x4.jpg",
    speechBubble: "Click the shapes to interact!",
    images: {
      cover: "./src/media/harak/HARAK_starting_composition_reference.png",
      dots: "./src/media/harak/dots.gif",
      box1: "./src/media/harak/box-1.png",
      circle1: "./src/media/harak/circle1.gif"
    },
    draw: (ctx, images, bounds) => {
      /*
      function adjustColors(imageData, brighteningFactor, contrastFactor) {
        const data = imageData.data;
        const midpoint = 128;
        for (let i = 0; i < data.length; i += 4) {
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];
          r = Math.min(r * brighteningFactor, 255);
          g = Math.min(g * brighteningFactor, 255);
          b = Math.min(b * brighteningFactor, 255);
          r = ((r - midpoint) * contrastFactor) + midpoint;
          g = ((g - midpoint) * contrastFactor) + midpoint;
          b = ((b - midpoint) * contrastFactor) + midpoint;
          data[i] = Math.min(Math.max(r, 0), 255);
          data[i + 1] = Math.min(Math.max(g, 0), 255);
          data[i + 2] = Math.min(Math.max(b, 0), 255);
        }
      }

      function drawRestoredImage(ctx, image, x, y, width, height, brighteningFactor, contrastFactor) {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = image.width;
        tempCanvas.height = image.height;
        tempCtx.drawImage(image, 0, 0);
        const imageData = tempCtx.getImageData(0, 0, image.width, image.height);
        adjustColors(imageData, brighteningFactor, contrastFactor);
        tempCtx.putImageData(imageData, 0, 0);
        ctx.drawImage(tempCanvas, 0, 0, image.width, image.height, x, y, width, height);
      }

      const imageAspectRatio = images.dots.width / images.dots.height;
      const boundsAspectRatio = bounds.width / bounds.height;
      let scaledWidth, scaledHeight;
      if (imageAspectRatio > boundsAspectRatio) {
          scaledWidth = bounds.width;
          scaledHeight = bounds.width / imageAspectRatio;
      } else {
          scaledHeight = bounds.height;
          scaledWidth = bounds.height * imageAspectRatio;
      }
      const offsetX = -scaledWidth * 0.5;
      const offsetY = -scaledHeight * 0.5;
      
      ctx.save();
      ctx.globalCompositeOperation = "source-over";

      ctx.translate(bounds.left + bounds.width * 0.5, bounds.top + bounds.height * 0.5);
      ctx.rotate(0.057);

      ctx.beginPath();
      ctx.rect(-bounds.width * 0.5, -bounds.height * 0.5, bounds.width, bounds.height);
      ctx.clip();

      ctx.globalAlpha = 0.5;
      const brighteningFactor = 1.1;
      const contrastFactor = 2.0;
      drawRestoredImage(ctx, images.dots, offsetX - 45, offsetY - 55, scaledWidth / 2, scaledHeight / 2, brighteningFactor, contrastFactor);
      drawRestoredImage(ctx, images.box1, offsetX + 500, offsetY - 150, scaledWidth / 2, scaledHeight / 2, brighteningFactor, contrastFactor);
      drawRestoredImage(ctx, images.circle1, offsetX + 325, offsetY + 40, scaledWidth, scaledHeight, brighteningFactor, contrastFactor);

      ctx.restore();
      */
    },
    update: (deltaTime) => {

    }
  }