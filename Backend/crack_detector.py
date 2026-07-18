from ultralytics import YOLO
import cv2
import os


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "best.pt"
)

model = YOLO(MODEL_PATH)


def detect_crack(image_path):

    image = cv2.imread(image_path)

    if image is None:
        return {
            "crack_type": "Invalid Image",
            "severity": "-",
            "repair": "-",
            "cost": "₹0",
            "time": "-",
            "suggested_paint_type": "-",
            "description": "Invalid image uploaded.",
            "paint_quantity": "-",
            "confidence": "0%"
        }


        # ===============================
    # YOLO Detection
    # ===============================

    results = model(image)

    # Save detected image
    annotated_image = results[0].plot()

    static_folder = os.path.join(BASE_DIR, "static")
    os.makedirs(static_folder, exist_ok=True)

    output_path = os.path.join(static_folder, "detected.jpg")

    cv2.imwrite(output_path, annotated_image)

    detected_class = "No-Crack"
    confidence = 0

    for result in results:
        for box in result.boxes:

            cls_id = int(box.cls[0])
            confidence = float(box.conf[0])
            if confidence < 0.5:
             detected_class = "No-Crack"
            detected_class = model.names[cls_id]


    confidence_percent = round(confidence * 100, 2)

    print("Detected:", detected_class)
    print("Confidence:", confidence_percent, "%")


    # ===============================
    # Class Based Result
    # ===============================


    if detected_class == "No-Crack":

        return {
            "crack_type": "No Crack",
            "severity": "None",
            "repair": "No repair required",
            "cost": "₹0",
            "time": "0 Days",
            "suggested_paint_type": "No Paint Required",
            "description": "No visible wall crack detected.",
            "paint_quantity": "-",
            "detected_image": "/static/detected.jpg",
            "confidence": f"{confidence_percent}%"
        }


    elif detected_class == "Hairline-Crack":

        return {
            "crack_type": "Hairline Crack",
            "severity": "Low",
            "repair": "Fill crack with putty and repaint.",
            "cost": "₹850",
            "time": "1-2 Days",
            "suggested_paint_type": "Asian Paints Royale",
            "description": "Minor hairline crack detected. Putty filling and repainting recommended.",
            "paint_quantity": "2 kg Putty + 1 L Paint",
            "detected_image": "/static/detected.jpg",
            "confidence": f"{confidence_percent}%"
        }


    elif detected_class == "Diagonal Crack":

        return {
            "crack_type": "Diagonal Crack",
            "severity": "Medium",
            "repair": "Seal crack and repair affected area.",
            "cost": "₹3000",
            "time": "3-5 Days",
            "suggested_paint_type": "Berger Easy Clean",
            "description": "Diagonal wall crack detected. Repair and reinforcement recommended.",
            "paint_quantity": "5 kg Putty + 2 L Paint",
            "detected_image": "/static/detected.jpg",
            "confidence": f"{confidence_percent}%"
        }


    elif detected_class == "Horizontal Settlement Crack":

        return {
            "crack_type": "Horizontal Settlement Crack",
            "severity": "Medium",
            "repair": "Wall inspection and reinforcement required.",
            "cost": "₹3500",
            "time": "5-10 Days",
            "suggested_paint_type": "Berger WeatherCoat",
            "description": "Settlement crack detected. Structural checking recommended.",
            "paint_quantity": "5 kg Putty + 3 L Paint",
            "detected_image": "/static/detected.jpg",
            "confidence": f"{confidence_percent}%"
        }


    elif detected_class == "Vertical Crack":

        return {
            "crack_type": "Vertical Crack",
            "severity": "Medium",
            "repair": "Fill crack and inspect wall stability.",
            "cost": "₹4000",
            "time": "5-7 Days",
            "suggested_paint_type": "Asian Paints Apex",
            "description": "Vertical crack detected. Wall condition inspection recommended.",
            "paint_quantity": "5 kg Putty + 3 L Paint",
            "detected_image": "/static/detected.jpg",
            "confidence": f"{confidence_percent}%"
        }


    elif detected_class == "Structural-Crack":

        return {
            "crack_type": "Structural Crack",
            "severity": "High",
            "repair": "Immediate structural repair required.",
            "cost": "₹8000",
            "time": "10-15 Days",
            "suggested_paint_type": "Dulux WeatherShield",
            "description": "Major structural crack detected. Immediate inspection and repair required.",
            "paint_quantity": "10 kg Putty + 5 L Paint",
            "detected_image": "/static/detected.jpg",
            "confidence": f"{confidence_percent}%"
        }


    else:

        return {
            "crack_type": detected_class,
            "severity": "Unknown",
            "repair": "Manual inspection required.",
            "cost": "₹0",
            "time": "-",
            "suggested_paint_type": "-",
            "description": "Unknown crack type detected.",
            "paint_quantity": "-",
            "confidence": f"{confidence_percent}%"
        }