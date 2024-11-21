let dragging;

const draggableOptions = [
  {
    id: "paper",
    width: 0.92,
    left: 595,
    top: 1200,
  },
  {
    id: "ink",
    width: 0.25,
    left: 745,
    top: 1523,
  },
  {
    id: "stamp",
    width: 0.28,
    left: 745,
    top: 1523,
  },
  {
    id: "portrait",
    width: 0.38,
    left: 202,
    top: 906,
  },
  {
    id: "tile1",
    width: 0.38,
    left: 72,
    top: 1400,
  },
  {
    id: "tile2",
    width: 0.38,
    left: 72,
    top: 1400,
  },
  {
    id: "tile3",
    width: 0.38,
    left: 72,
    top: 1400,
  },
  {
    id: "tile4",
    width: 0.38,
    left: 72,
    top: 1400,
  },
  {
    id: "tile5",
    width: 0.38,
    left: 72,
    top: 1400,
  },
  {
    id: "tile6",
    width: 0.38,
    left: 72,
    top: 1400,
  },
  {
    id: "tile8",
    width: 0.38,
    left: 72,
    top: 1400,
  },
  {
    id: "tile9",
    width: 0.38,
    left: 72,
    top: 1400,
  },
  {
    id: "tile10",
    width: 0.38,
    left: 72,
    top: 1400,
  },
  {
    id: "dollas",
    width: 0.49,
    left: 554,
    top: 981,
  },
  {
    id: "dollasCopy",
    width: 0.49,
    left: 629,
    top: 1092,
  },
  {
    id: "aldus",
    width: 0.31,
    left: 437,
    top: 1300,
  },
  {
    id: "chancery",
    width: 0.31,
    left: 437,
    top: 1300,
  },
  {
    id: "optima",
    width: 0.31,
    left: 437,
    top: 1300,
  },
  {
    id: "palatino",
    width: 0.31,
    left: 437,
    top: 1300,
  },
  {
    id: "zapfino",
    width: 0.31,
    left: 437,
    top: 1300,
  },
  {
    id: "dingbats",
    width: 0.31,
    left: 437,
    top: 1300,
  },
  {
    id: "pen",
    width: 0.67,
    left: 369,
    top: 850,
  },
];

const createDraggable = (image, id) => {
  document.body.appendChild(image);
  image.id = id;
  image.classList.add("draggable");
};

const init = (images) => {
  let offsetX = 0;
  let offsetY = 0;
  for (const { id, width, left, top } of draggableOptions) {
    const image = images[id];

    createDraggable(image, id);
    image.style.setProperty("--left", `${left}px`);
    image.style.setProperty("--top", `${top}px`);
    image.style.setProperty("--width", `${85 * width}%`);
    image.style.setProperty("--rotation", `${20 * (Math.random() - 0.5)}deg`);

    image.addEventListener("mousedown", (e) => {
      if (dragging) return;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      dragging = image;
      e.preventDefault();
      return false;
    });
  }

  window.addEventListener("mouseup", (e) => {
    dragging = null;
  });

  const cover = document.querySelector(".cover-template");
  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    dragging.style.setProperty("--top", `${e.clientY - offsetY}px`);
    dragging.style.setProperty("--left", `${e.clientX - offsetX}px`);
  });
};

export const zapf = {
  // background: "https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x4.jpg",
  speechBubble: "DRAG AROUND TO EXPLORE THE DESK!",
  images: {
    cover: "./src/media/zapf/background.png",
    aldus: "./src/media/zapf/aldus.png",
    chancery: "./src/media/zapf/chancery.png",
    dingbats: "./src/media/zapf/dingbats.png",
    dollasCopy: "./src/media/zapf/dollas copy.png",
    dollas: "./src/media/zapf/dollas.png",
    ink: "./src/media/zapf/ink.png",
    optima: "./src/media/zapf/optima.png",
    palatino: "./src/media/zapf/palatino.png",
    paper: "./src/media/zapf/paper.png",
    pen: "./src/media/zapf/pen.png",
    portrait: "./src/media/zapf/portrait.png",
    ratio: "./src/media/zapf/ratio.png",
    stamp: "./src/media/zapf/stamp.png",
    tile1: "./src/media/zapf/tile_1.png",
    tile2: "./src/media/zapf/tile_2.png",
    tile3: "./src/media/zapf/tile_3.png",
    tile4: "./src/media/zapf/tile_4.png",
    tile5: "./src/media/zapf/tile_5.png",
    tile6: "./src/media/zapf/tile_6.png",
    tile8: "./src/media/zapf/tile_8.png",
    tile9: "./src/media/zapf/tile_9.png",
    tile10: "./src/media/zapf/tile_10.png",
    title: "./src/media/zapf/title.png",
    zapfino: "./src/media/zapf/zapfino.png",
  },
  init,
  draw: (ctx, images, bounds) => {
    ctx.drawImage(images.title, bounds.left + 80, bounds.top + 50, images.title.width * 0.4, images.title.height * 0.4);
    ctx.drawImage(images.ratio, bounds.left + 80, bounds.top + 400, images.ratio.width * 0.4, images.ratio.height * 0.4);
  },
};
