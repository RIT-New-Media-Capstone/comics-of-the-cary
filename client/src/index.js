// This function is configured to be called whenever new Aruco marker IDs are detected.
// arucoIds is an array of integers corresponding to the detected marker IDs.
// Implementation is up to you, but updating the display works well.
const handleArucoDetected = (markerId) => {
    // Update the content of the `<p>` tag to display detected marker ID
    if (markerId !== undefined) {
        document.querySelector('p').textContent = `Detected Aruco Marker ID: ${markerId}`;
    } else {
        document.querySelector('p').textContent = 'No markers detected.';
    }
};

const init = () => {
    // Whenever app/main.js emits the "arucoDetected" event, handle it with the "handleArucoDetected" function.
    // This line connects the main process event to this function.
    window.electronAPI.arucoDetected(handleArucoDetected);
};

window.onload = init;
