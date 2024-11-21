export const fred = {
    // background: "https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x4.jpg",
    speechBubble: "Tap to change the color palette",
    images: {
      cover: "./src/media/fred/Artboard 2.svg",
      fred1: "./src/media/fred/Artboard 2.svg",
    },
    draw: (ctx, images, bounds) => {
      /*
      const svgImage = new Image();
      svgImage.src = images.fred1;
      svgImage.onload = () => {
        const imageAspectRatio = svgImage.width / svgImage.height;
        const boundsAspectRatio = bounds.width / bounds.height;
        let scaledWidth, scaledHeight;
        if (imageAspectRatio > boundsAspectRatio) {
          scaledWidth = bounds.width;
          scaledHeight = bounds.width / imageAspectRatio;
        } else {
          scaledHeight = bounds.height;
          scaledWidth = bounds.height * imageAspectRatio;
        }
        const offsetX = bounds.left + bounds.width * 0.5 - scaledWidth * 0.5;
        const offsetY = bounds.top + bounds.height * 0.5 - scaledHeight * 0.5;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(svgImage, offsetX, offsetY, scaledWidth, scaledHeight);
      };
      */
    },
    update: (deltaTime) => {
      console.log('hi max' + deltaTime);
    }
  }