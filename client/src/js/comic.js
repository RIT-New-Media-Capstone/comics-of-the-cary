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
  const speechBubble = document.querySelector('.speech-bubble > p');
  speechBubble.replaceChildren(document.createTextNode(text));
}

const updateScreenBackground = (url) => {
  document.body.style.setProperty('--background-url', `url(${url}`);
}

export const startCover = async (coverOptions) => {
  const images = await loadImages(coverOptions.images);
  const canvas = document.querySelector("canvas");
  updateSpeechBubbleText(coverOptions.speechBubble ?? "uhmm colby where's the speech bubble");
  updateScreenBackground(coverOptions.background);
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext("2d");

  const coverBounds = {
    left: 78 / 720 * canvas.width,
    right: 642 / 720 * canvas.width,
    top: 242 / 1280 * canvas.height,
    bottom: 1097 / 1280 * canvas.height,
    width: 642 / 720 * canvas.width - 78 / 720 * canvas.width,
    height: 1097 / 1280 * canvas.height - 242 / 1280 * canvas.height
  };
  const draw = () => {
    ctx.drawImage(images.cover, coverBounds.left, coverBounds.top, coverBounds.width, coverBounds.height);
    coverOptions.draw(ctx, images, coverBounds);
  }

  setTimeout(() => {
    coverOptions.update(30);
    draw();
  }, 30);
}
