import cv2
import json
import sys

# Load the Aruco dictionary and set up parameters
aruco_dict = cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_4X4_50)
parameters = cv2.aruco.DetectorParameters()

# Initialize webcam (0 is the default camera; change if you have multiple)
cap = cv2.VideoCapture(0)

# Check if the webcam opened successfully
if not cap.isOpened():
    print("Error: Could not open webcam.")
    sys.exit(1)

try:
    while True:
        # Capture a frame from the webcam
        ret, frame = cap.read()
        
        # If the frame was not captured correctly, exit
        if not ret:
            print("Failed to grab frame.")
            break

        # Convert the frame to grayscale for Aruco detection
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect Aruco markers in the grayscale image
        corners, ids, _ = cv2.aruco.detectMarkers(gray, aruco_dict, parameters=parameters)

        if ids is not None:
            # Convert IDs to a list and send it as JSON
            detected_markers = {"ids": ids.flatten().tolist()}
            print(json.dumps(detected_markers), flush=True)

except KeyboardInterrupt:
    print("Exiting...")
finally:
    cap.release()
    cv2.destroyAllWindows()
