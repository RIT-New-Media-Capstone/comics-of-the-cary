/**
 * This file contains code that interacts with the
 * TeachableMachine we will train to sense when a specific
 * comic is being shown on the webcam.
 * 
 * This code is active on the client side.
 * 
 * TODO: Once all of the comics are complete,
 * we need to train a model that recognizes each of them.
 */

import { handleNewComic } from './display-switch.js';

// the link to the model folder, which contains the TeachableMachine data
const URL = "./model/";

// change this to force a specific comic
// for testing
// or make it "" to not force a comic
// the name should appear exactly as it does in
// the switch statement of display-switch.js
const forcedComic = "kubert";

let model, webcam, textOutput, maxPredictions;

let currentComic = undefined;
let lastPredictionMax = "";
let numberOfDifferences = 0;

// Load the image model and setup the webcam
export const startPredictions = async () => {
    
    if (forcedComic) {
        handleNewComic(forcedComic);
        return;
    }
    
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Note: "tmImage" comes from other script tags in index.html
    model = await tmImage.load(modelURL, metadataURL);

    // Get total number of classes in the model
    // Note: checkout "labels" in model/metadata.json for list of class names
    maxPredictions = model.getTotalClasses();

    // setup a webcam
    const flip = true; // flip the webcam, TeachableMachine was trained with the camera flipped
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop); // continually refresh the webcam

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
}

const loop = async () => {
    webcam.update(); // update the webcam frame
    await predict();

    // request a new prediction every 50 milliseconds (can probably be adjusted)
    setTimeout(() => { window.requestAnimationFrame(loop); }, 25);
}

// run the webcam image through the image model
const predict = async () => {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);

    // prediction is an array of objects,
    // the array has as many entries as classes in the model.
    // this will prob be 13 total classes => 12 comics, 1 "blank camera"
    // prediction[i].className gets name of class,
    // prediction[i].probability.toFixed(2) gets number >= 0, <= 1, 1 is match

    let currentMax = 0;
    let nameOfCurrentMax = "Nothing";

    for (let i = 0; i < maxPredictions; i++) {
        // get maximum probability
        let probability = prediction[i].probability.toFixed(2);
        if (probability > currentMax) {
            currentMax = probability;
            nameOfCurrentMax = prediction[i].className;
        }
    }

    // check if current sensed maximum is above 0.7 (confidence)
    if (currentMax >= 0.7) {
        // check if the currently sensed comic
        // is different than the one currently displayed, and is the same as the previous prediction
        if (nameOfCurrentMax != currentComic && nameOfCurrentMax == lastPredictionMax) {
            // increase the count of times that
            // a difference has occurred in a row
            numberOfDifferences++;
            if (numberOfDifferences > 30) {
                // enough differences have been sensed to
                // confidently swap the display
                currentComic = nameOfCurrentMax;
                handleNewComic(currentComic);
            }
        } else {
            numberOfDifferences = 0;
        }
    } else {
        numberOfDifferences = 0;
    }

    lastPredictionMax = nameOfCurrentMax;
}

window.onload = startPredictions;