export const kenedy = {
    // background: "https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x4.jpg",
    // speechBubble: "this is a test",
    images: {
      cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/220px-Cat_November_2010-1a.jpg",
      image1: "https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg",
      image2: "https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg",
      image3: "https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg"
    },
    draw: (ctx, images, bounds) => {
      ctx.drawImage(images.image1, 100, 200, 400, 400);
      ctx.drawImage(images.image2, 600, 200, 400, 400);
      ctx.drawImage(images.image3, 600, 700, 400, 400);
    },
    update: (deltaTime) => {
      console.log('hi max' + deltaTime);
    }
  }