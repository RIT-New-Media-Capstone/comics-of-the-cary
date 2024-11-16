
// This function is configured to be called whenever
// a new comic is scanned. 
// comicName is a string corresponding to the name of the scanned comic.
// Implementation is up to you, but a switch statement should work fine.
// This function should change out what's displayed on the HTML
// page to reflect the new comic.

export const handleNewComic = (comicName) => {
    
    // this is just a test
    document.querySelector('p').textContent = comicName;

    // Note: checkout "labels" in model/metadata.json for list of all possible class names

};