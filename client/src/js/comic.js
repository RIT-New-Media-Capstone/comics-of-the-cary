const loadImages = async (images) => {
  const imageElements = {};

  for (const [id, url] of Object.entries(images)) {
    imageElements[id] = await loadImage(url);
  }

  return imageElements;
};

let myInterval = undefined;
let mouseDownFunc = undefined;
let mouseMoveFunc = undefined;
let mouseUpFunc = undefined;
let touchDownFunc = undefined;
let touchMoveFunc = undefined;
let touchUpFunc = undefined;

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;

    image.onload = () => {
      console.log("i guess colby didn't fuck it up");
      resolve(image);
    };

    image.onerror = () => {
      reject(new Error("god fucking damnit colby"));
    };
  });
};

const updateSpeechBubbleText = (text) => {
  let speechBubbleDiv = document.querySelector(".speech-bubble");
  if (text === " ") {
    // hide bubble
    speechBubbleDiv.style.visibility = "hidden";
  } else {
    speechBubbleDiv.style.visibility = "visible";
  }

  const speechBubble = document.querySelector(".speech-bubble > p");
  speechBubble.replaceChildren(document.createTextNode(text));
};

const updateScreenBackground = (url) => {
  document.body.style.setProperty("--background-url", `url(${url}`);
};

export const startCover = async (coverOptions) => {
  const images = await loadImages(coverOptions.images);
  const canvas = document.querySelector("canvas");
  if (coverOptions.speechBubble)
    updateSpeechBubbleText(coverOptions.speechBubble);
  if (coverOptions.background) updateScreenBackground(coverOptions.background);
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext("2d");

  if (mouseDownFunc) {
    canvas.removeEventListener("mousedown", mouseDownFunc);
    canvas.removeEventListener("touchstart", touchDownFunc);
  } 
  if (mouseMoveFunc) {
    canvas.removeEventListener("mousemove", mouseMoveFunc);
    canvas.removeEventListener("touchmove", touchMoveFunc);

  }
  if (mouseUpFunc) {
    canvas.removeEventListener("mouseup", mouseUpFunc);
    canvas.removeEventListener("touchend", touchUpFunc);
  }

  mouseDownFunc = (e) => {
    if (!coverOptions.onMouseDown) return;
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX / rect.width * 1080;
    let y = e.clientY / rect.height * 1920;
    coverOptions.onMouseDown(x, y);
  };

  mouseMoveFunc = (e) => {
    if (!coverOptions.onMouseMove) return;
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX / rect.width * 1080;
    let y = e.clientY / rect.height * 1920;
    coverOptions.onMouseMove(x, y);
  };

  mouseUpFunc = (e) => {
    if (!coverOptions.onMouseUp) return;
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX / rect.width * 1080;
    let y = e.clientY / rect.height * 1920;
    coverOptions.onMouseUp(x, y);
  };

  touchDownFunc = (e) => {
    if (!coverOptions.onMouseDown) return;
    let rect = canvas.getBoundingClientRect();
    let x = e.touches[0].clientX / rect.width * 1080;
    let y = e.touches[0].clientY / rect.height * 1920;
    coverOptions.onMouseDown(x, y);
  };

  touchMoveFunc = (e) => {
    if (!coverOptions.onMouseMove) return;
    let rect = canvas.getBoundingClientRect();
    let x = e.touches[0].clientX / rect.width * 1080;
    let y = e.touches[0].clientY / rect.height * 1920;
    coverOptions.onMouseMove(x, y);
  };

  touchUpFunc = (e) => {
    if (!coverOptions.onMouseUp) return;
    let rect = canvas.getBoundingClientRect();
    let x = e.touches[0].clientX / rect.width * 1080;
    let y = e.touches[0].clientY / rect.height * 1920;
    coverOptions.onMouseUp(x, y);
  };

  canvas.addEventListener('mousedown', mouseDownFunc);
  canvas.addEventListener('touchstart', touchDownFunc);
  canvas.addEventListener('mouseup', mouseUpFunc);
  canvas.addEventListener('touchend', touchUpFunc);
  canvas.addEventListener('mousemove', mouseMoveFunc);
  canvas.addEventListener('touchmove', touchMoveFunc);

  if (coverOptions.init) coverOptions.init(images);

  const coverBounds = {
    left: (78 / 720) * canvas.width,
    right: (642 / 720) * canvas.width,
    top: (242 / 1280) * canvas.height,
    bottom: (1097 / 1280) * canvas.height,
    width: (642 / 720) * canvas.width - (78 / 720) * canvas.width,
    height: (1097 / 1280) * canvas.height - (242 / 1280) * canvas.height,
  };
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (images.cover) {
      ctx.save();
      ctx.translate(
        coverBounds.left + coverBounds.width * 0.5,
        coverBounds.top + coverBounds.height * 0.5
      );
      ctx.rotate(0.057);
      ctx.drawImage(
        images.cover,
        -coverBounds.width * 0.5,
        -coverBounds.height * 0.5,
        coverBounds.width,
        coverBounds.height
      );
      ctx.restore();
    }
    coverOptions.draw(ctx, images, coverBounds);
  };

  if (myInterval) {
    clearInterval(myInterval);
  }

  myInterval = setInterval(() => {
    if (coverOptions.update) coverOptions.update(30);
    draw();
  }, 30);
};
