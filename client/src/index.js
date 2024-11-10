
// This function is configured to be called whenever
// a new comic is scanned. 
// comicName is a string corresponding to the name of the scanned comic.
// Implementation is up to you, but a switch statement should work fine.
// This function should change out what's displayed on the HTML
// page to reflect the new comic.
const handleNewComic = (comicName) => {
    
    // this is just a test
    document.querySelector('p').textContent = comicName;

}

const init = () => {

    // Whenever app/main.js emits the "newComic" event,
    // handle it with the "handleNewComic" function.
    // This line shouldn't need to be changed.
    window.electronAPI.newComic(handleNewComic);

};

window.onload = init;