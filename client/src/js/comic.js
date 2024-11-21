const loadImages = async (images) => {
  const imageElements = {};

  for (const [id, url] of Object.entries(images)) {
    imageElements[id] = await loadImage(url);
  }

  return imageElements;
};

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

  canvas.addEventListener('mousedown', e => {
    if (!coverOptions.onMouseDown) return;
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX / rect.width * 1080;
    let y = e.clientY / rect.height * 1920;
    coverOptions.onMouseDown(x, y);
  })

  canvas.addEventListener('mouseup', e => {
    if (!coverOptions.onMouseUp) return;
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX / rect.width * 1080;
    let y = e.clientY / rect.height * 1920;
    coverOptions.onMouseUp(x, y);
  });

  canvas.addEventListener('mousemove', e => {
    if (!coverOptions.onMouseMove) return;
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX / rect.width * 1080;
    let y = e.clientY / rect.height * 1920;
    coverOptions.onMouseMove(x, y);
  });

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

  setInterval(() => {
    if (coverOptions.update) coverOptions.update(30);
    draw();
  }, 30);
};
