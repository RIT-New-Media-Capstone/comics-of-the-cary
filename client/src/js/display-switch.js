import { startCover } from "./comic.js";
import { templateCover } from "./covers/template.js";
import { kubert } from "./covers/kubert.js";
import { balloonRitchie } from "./covers/balloonRitchie.js";
import { zapf } from "./covers/zapf.js";
import { ellsworth } from "./covers/ellsworth.js";
import { fred } from "./covers/fred.js";
import { elzbieta } from "./covers/elzbieta.js";
import { tomaszewski } from "./covers/tomaszewski.js";
import { kenedy } from "./covers/kenedy.js";
import { harak } from "./covers/harak.js";
import { jacqueline } from "./covers/jacqueline.js";
import { idle } from "./covers/idle.js";

// This function is configured to be called whenever
// a new comic is scanned.
// comicName is a string corresponding to the name of the scanned comic.
// Implementation is up to you, but a switch statement should work fine.
// This function should change out what's displayed on the HTML
// page to reflect the new comic.

export const handleNewComic = (comicName) => {

  switch (comicName) {
    case "Nothing":
      startCover(idle);
      break;
    case "kubert":
      startCover(kubert);
      break;
    case "balloonRitchie":
      startCover(balloonRitchie);
      break;
    case "zapf":
      startCover(zapf);
      break;
    case "ellsworth":
      startCover(ellsworth);
      break;
    case "fred":
      startCover(fred);
      break;
    case "elzbieta":
      startCover(elzbieta);
      break;
    case "tomaszewski":
      startCover(tomaszewski);
      break;
    case "kenedy":
      startCover(kenedy);
      break;
    case "harak":
      startCover(harak);
      break;
    case "jacqueline":
      startCover(jacqueline);
      break;
  }
};
