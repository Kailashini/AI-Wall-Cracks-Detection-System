# AI Wall Cracks Detection System

## Overview

AI Wall Cracks Detection System is an intelligent web application that automatically detects wall cracks using a YOLO-based deep learning model. The system analyzes uploaded wall images, classifies crack types, estimates severity, calculates repair materials and costs, and stores analysis history for future reference.

---

## Features

- AI-based wall crack detection
- Crack classification using YOLO
- Crack severity analysis
- Wall area and crack measurement
- Material quantity estimation
- Repair cost estimation
- Labour cost calculation
- Analysis history
- PDF report generation
- User-friendly web interface

---

## Technology Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap

### Backend
- Python
- Flask

### AI Model
- YOLO (Ultralytics)
- OpenCV

### Database
- SQLite

---

## Project Structure

```
AI-Wall-Cracks-Detection-System/
│
├── backend/
│   ├── app.py
│   ├── detector.py
│   ├── database.py
│   ├── models/
│   ├── static/
│   ├── templates/
│   ├── uploads/
│   └── requirements.txt
│
├── frontend/
│
├── README.md
│
└── .gitignore
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/Kailashini/AI-Wall-Cracks-Detection-System.git
```

### Navigate to Project

```bash
cd AI-Wall-Cracks-Detection-System
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

Windows

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r backend/requirements.txt
```

### Run the Application

```bash
python backend/app.py
```

---

## Modules

- Image Upload
- AI Crack Detection
- Crack Classification
- Severity Analysis
- Material Estimation
- Cost Estimation
- PDF Report
- History Management

---

## Output

The system provides:

- Crack Type
- Severity Level
- Confidence Score
- Repair Recommendation
- Material Estimation
- Labour Cost
- Total Estimated Cost
- PDF Report

---

## Future Enhancements

- Mobile Application
- Cloud Deployment
- Multi-crack Detection
- Real-time Camera Detection
- Email Report Generation
- IoT Integration

---

## Author

**Kailashini M.**

Bachelor of Engineering (Information Technology)

Tagore Engineering College

---

## License

This project is developed for academic and educational purposes.
