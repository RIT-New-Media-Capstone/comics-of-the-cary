const maskCanvas = document.createElement('canvas');
const maskCtx = maskCanvas.getContext('2d');
maskCanvas.width = 1080;
maskCanvas.height = 1920;
maskCtx.lineWidth = 50;

const colorCanvas = document.createElement('canvas');
const colorCtx = colorCanvas.getContext('2d');
colorCanvas.width = 1080;
colorCanvas.height = 1920;

let isDrawing = false;
let pX = undefined;
let pY = undefined;

function drawOnMask(x, y) {
  maskCtx.fillStyle = 'black'; // Reveal color where drawn
  maskCtx.filter = "blur(25px)";
  maskCtx.moveTo(pX, pY);
  maskCtx.lineTo(x, y);
  maskCtx.stroke();
  maskCtx.beginPath();
  maskCtx.arc(x, y, 25, 0, Math.PI * 2); // Brush size
  maskCtx.fill();
  pX = x;
  pY = y;
}

export const kubert = {
  // background: "https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x4.jpg",
  speechBubble: "Drag Across the cover to colorize!",
  images: {
    cover: "./src/media/kubert/kubert-grey.png",
    colorCover: "./src/media/kubert/kubert-color.png"
  },
  draw: (ctx, images, bounds) => {

    // Step 2: Draw the colored image
    colorCtx.globalCompositeOperation = 'source-over';
    colorCtx.save();
    colorCtx.translate(
      bounds.left + bounds.width * 0.5,
      bounds.top + bounds.height * 0.5
    );
    colorCtx.rotate(0.057);
    colorCtx.drawImage(
      images.colorCover,
      -bounds.width * 0.5,
      -bounds.height * 0.5,
      bounds.width,
      bounds.height
    );
    colorCtx.restore();

    // Step 3: Apply the mask using destination-in
    colorCtx.globalCompositeOperation = 'destination-in';
    colorCtx.drawImage(maskCanvas, 0, 0, maskCanvas.width, maskCanvas.height);

    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(colorCanvas, 0, 0, maskCanvas.width, maskCanvas.height);

    colorCtx.restore();
  },

  update: (deltaTime) => {
  },

  onMouseDown: (x, y) => {
    isDrawing = true;
    pX = x;
    pY = y;
    drawOnMask(x, y);
  },

  onMouseUp: (x, y) => {
    pX = undefined;
    pY = undefined;
    isDrawing = false;
  },

  onMouseMove: (x, y) => {
    if (isDrawing) drawOnMask(x, y);
  },
}