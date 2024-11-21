const floaters = [
  {
    image: "batsignal",
    x: .37,
    y: .5,
    offset: 0,
  },
  {
    image: "subtitle",
    x: .4,
    y: .39,
    offset: 0,
  },
  {
    image: "superman",
    x: .45,
    y: .13,
    offset: 0,
  },
  {
    image: "dudes",
    x: .15,
    y: .48,
    offset: 0,
  },
  {
    image: "woman",
    x: .53,
    y: .39,
    offset: 0,
  },
  {
    image: "joker",
    x: .13,
    y: .63,
    offset: 0,
  },
  {
    image: "oldDude",
    x: .2,
    y: .5,
    offset: 0,
  },
  {
    image: "title",
    x: .18,
    y: .27,
    offset: 0,
  },
];

let time = 0;

export const ellsworth = {
  // background: "https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x4.jpg",
  // speechBubble: "this is a test",
  images: {
    cover: "./src/media/ellsworth/ellsworthbg.png",
    batsignal: "./src/media/ellsworth/ellsworth01.png",
    woman: "./src/media/ellsworth/ellsworth02.png",
    superman: "./src/media/ellsworth/ellsworth03.png",
    joker: "./src/media/ellsworth/ellsworth04.png",
    oldDude: "./src/media/ellsworth/ellsworth05.png",
    dudes: "./src/media/ellsworth/ellsworth06.png",
    subtitle: "./src/media/ellsworth/textbody.png",
    title: "./src/media/ellsworth/ellsworth.png"
  },
  init: (images) => {
    for (const floater of floaters) {
      floater.offset = Math.random();
    }
  },
  draw: (ctx, images, bounds) => {
    for (const floater of floaters) {
      ctx.drawImage(
        images[floater.image],
        floater.x * ctx.canvas.width,
        floater.y * ctx.canvas.height + 5 * Math.sin(0.002 * time + 5 * floater.offset),
        images[floater.image].width * 0.6,
        images[floater.image].height * 0.6
      );
    }
  },
  update: (deltaTime) => {
    time += deltaTime;
    console.log("hi max" + deltaTime);
  },
};
