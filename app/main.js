const { app, BrowserWindow } = require('electron/main');
const path = require('node:path');
const { spawn, spawnSync } = require('child_process');
const fs = require('fs');

let mainWindow;
let pythonCommand = null; // This will hold the working Python command
let lastMarkerData = null; // This will hold the last marker data implemented

// Function to find a working Python command
const findPythonCommand = () => {
    const pythonCommands = ['python3', 'python', 'py']; // List of commands to check

    // Check each command synchronously
    for (let command of pythonCommands) {
        const result = spawnSync(command, ['--version']);

        // Log the result for debugging
        console.log(`Checking command: ${command}`);
        console.log('stdout:', result.stdout ? result.stdout.toString() : 'No stdout');
        console.log('stderr:', result.stderr ? result.stderr.toString() : 'No stderr');

        // If the command was found and stdout contains something useful (not empty), set pythonCommand
        if (result.stdout != 'No stdout') {
            console.log(`Python command found: ${command}`);
            pythonCommand = command;  // Set pythonCommand to the working one
            break;  // Exit loop once the valid command is found
        }
    }

    // If no valid Python command was found, log the error
    if (!pythonCommand) {
        console.error('No valid Python command found.');
        return false;  // Return false if no valid Python command was found
    }

    return true;  // Return true if a valid Python command was found
};

// Function to start the Python script
const startPythonScript = () => {
    if (!pythonCommand) {
        console.error('Python command not found. Cannot start Python script.');
        return;
    }

    const pythonScriptPath = path.join(__dirname, 'aruco_detection.py');
    if (!fs.existsSync(pythonScriptPath)) {
        console.error(`Python script not found: ${pythonScriptPath}`);
        return;
    }

    console.log(`Starting Python script using command: ${pythonCommand}`);
    const pythonProcess = spawn(pythonCommand, [pythonScriptPath]);

    pythonProcess.stdout.on('data', (data) => {
        try {
            const markerData = JSON.parse(data.toString().trim());
            const markerId = markerData.ids[0];  // Get the first ID from the ids array
        
            // Check the conditions: First marker or different marker and the ID is less than 12
            if (((lastMarkerData === null || markerId !== lastMarkerData) && markerId < 12)) {
                console.log(`Marker Data: ${markerId}`);  // Log just the first ID
                mainWindow.webContents.send('arucoDetected', markerId);
                lastMarkerData = markerId; // Update the last marker ID
            }
        } catch (err) {
            console.error(`Error parsing data: ${err.message}`);
        }
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
    });

    app.on('before-quit', () => {
        pythonProcess.kill();
    });
};

// Create the Electron window
const createWindow = () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        width: 1024,
        height: 576,
    });

    mainWindow.loadFile('./client/index.html');
    startPythonScript();
};

// Start the application after finding a valid Python command
const startApp = () => {
    console.log("Finding Python command...");
    const pythonFound = findPythonCommand();

    if (!pythonFound) {
        console.error('No valid Python command found. Exiting application.');
        app.quit(); // Exit Electron if no Python command is found
        return;
    }

    console.log("Python command found. Starting Electron...");
    createWindow();
};

// Start the app when Electron is ready
app.whenReady().then(startApp);

// Quit the app when all windows are closed (for non-macOS platforms)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
