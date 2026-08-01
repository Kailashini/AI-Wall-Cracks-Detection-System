<<<<<<< HEAD
import { useState, useRef, useEffect, useCallback } from "react";
=======
import { useState, useRef } from "react";
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
import { analyzeWall } from "../services/api";

function UploadSection({
  wallDetails,
  customEstimate,
  result,
  setResult,
  originalImage,
  setOriginalImage,
<<<<<<< HEAD
  loading,
  setLoading,
  setAnalyzeHandler,
  loadDashboard,
  loadHistory,
=======
   loadDashboard,
  loadHistory
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
}) {
  
  // ================= State =================
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [capturedBlob, setCapturedBlob] = useState(null);
<<<<<<< HEAD
=======
  
  const [loading, setLoading] = useState(false);
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f

  // ================= Refs =================
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // ================= Upload Image =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setCapturedBlob(null);

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
      setOriginalImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // ================= Open Camera =================
  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error(error);
      alert("Camera access denied");
    }
  };

  // ================= Capture Image =================
  const handleCaptureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      alert("Please open camera first");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    setPreview(imageData);
    setOriginalImage(imageData);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          setCapturedBlob(blob);
          setImage(null);
        }
      },
      "image/png"
    );
  };
// ================= Analyze =================
<<<<<<< HEAD
  const handleAnalyze = useCallback(async () => {
    console.log("Analyze button clicked");
    try {
      setLoading(true);
      console.log("Wall Details:", wallDetails);
=======
  const handleAnalyze = async () => {
    console.log("Analyze button clicked");
    try {
      setLoading(true);
console.log("Wall Details:", wallDetails);
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
      const formData = new FormData();
      
formData.append(
    "wall_length",
    wallDetails.wallLength
);

formData.append(
    "wall_width",
    wallDetails.wallWidth
);

formData.append(
    "crack_length",
    wallDetails.crackLength
);

formData.append(
    "crack_width",
    wallDetails.crackWidth
);

formData.append(
    "crack_depth",
    wallDetails.crackDepth
);
formData.append(
    "wall_length_unit",
    wallDetails.wallLengthUnit
);

formData.append(
    "wall_width_unit",
    wallDetails.wallWidthUnit
);

formData.append(
    "crack_length_unit",
    wallDetails.crackLengthUnit
);

formData.append(
    "crack_width_unit",
    wallDetails.crackWidthUnit
);

formData.append(
    "crack_depth_unit",
    wallDetails.crackDepthUnit
);
formData.append(
    "wall_type",
    wallDetails.wallType
);

formData.append(
    "wall_material",
    wallDetails.wallMaterial
);

formData.append(
    "putty",
    wallDetails.putty
);

formData.append(
    "existing_paint_type",
    wallDetails.existingPaintType
);

formData.append(
    "paint_type",
    wallDetails.paintType
);

formData.append(
    "coat_type",
    wallDetails.coatType
);

formData.append(
    "surface_coating",
    wallDetails.surfaceCoating
);
formData.append(
  "custom_estimate",
  customEstimate.enabled
);

formData.append(
  "cement_price",
  customEstimate.cementPrice
);

formData.append(
  "putty_price",
  customEstimate.puttyPrice
);

formData.append(
  "primer_price",
  customEstimate.primerPrice
);

formData.append(
  "paint_price",
  customEstimate.paintPrice
);

formData.append(
  "thinner_price",
  customEstimate.thinnerPrice
);
      if (capturedBlob) {
        formData.append("image", capturedBlob, "captured.png");
      } else if (image) {
        formData.append("image", image);
      } else {
        alert("Please upload or capture an image.");
        setLoading(false);
        return;
      }

      const data = await analyzeWall(formData);

      console.log(data);

      setResult(data);
      loadDashboard();
<<<<<<< HEAD
      loadHistory();
=======
loadHistory();
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
    } catch (error) {
      console.error(error);
      alert("Failed to connect to Flask backend.");
    } finally {
      setLoading(false);
    }
<<<<<<< HEAD
  }, [capturedBlob, customEstimate, image, loadDashboard, loadHistory, setLoading, setResult, wallDetails]);

  useEffect(() => {
    if (setAnalyzeHandler) {
      setAnalyzeHandler(() => handleAnalyze);
    }
  }, [handleAnalyze, setAnalyzeHandler]);
=======
  };
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f

  return (
    <section id="upload" className="content-card">
      <div className="section-header">
        <div>
          <h2>📷 Upload Wall Image</h2>
          <p>
            Capture a live image using your camera or upload an existing wall
            image for AI analysis.
          </p>
        </div>
      </div>

      <div className="upload-grid">
        {/* Camera */}
        <div className="camera-card">
          <h3>Live Camera</h3>

          <div className="camera-preview">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: "100%" }}
            />
          </div>

          <div className="camera-actions">
            <button
              type="button"
              className="primary-btn"
              onClick={handleStartCamera}
            >
              📷 Open Camera
            </button>

            <button
              type="button"
              className="success-btn"
              onClick={handleCaptureImage}
            >
              📸 Capture Image
            </button>
          </div>
        </div>

        {/* Upload */}
        <div className="upload-card">
          <h3>Upload Image</h3>

          <label htmlFor="imageInput" className="upload-area">
            <div className="upload-icon">📁</div>

            <h3>Drag & Drop Image</h3>

            <p>JPG • PNG • JPEG • ZIP</p>

            <span className="browse-btn">Browse Files</span>
          </label>

          <input
  id="imageInput"
  type="file"
  accept=".zip,image/*"
  hidden
  onChange={handleImageChange}
/>
        </div>
      </div>
            {/* Preview */}
      <div className="preview-card">
        <h3>🖼 Image Preview</h3>

        <div className="preview-box">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              id="preview"
              style={{
                width: "100%",
                maxWidth: "500px",
                display: "block",
                margin: "0 auto",
                borderRadius: "10px",
              }}
            />
          ) : (
            <p style={{ textAlign: "center" }}>
              No Image Selected
            </p>
          )}

          <canvas
            ref={canvasRef}
            style={{ display: "none" }}
          />
        </div>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          
        </div>
      </div>
<<<<<<< HEAD
      {result && (
        <div className="result-card">
          <h2>Analysis Result</h2>

          <p>
            <strong>Crack Type:</strong>{" "}
            {result.crack_type}
          </p>

          <p>
            <strong>Severity:</strong>{" "}
            {result.severity}
          </p>

          <p>
            <strong>Confidence:</strong>{" "}
            {result.confidence}
          </p>

          <p>
            <strong>Total Cost:</strong>{" "}
            {result.total_cost}
          </p>

          <p>
            <strong>Estimated Days:</strong>{" "}
            {result.repair_duration}
          </p>
        </div>
      )}
=======
       <div className="button-section">

<button
  type="button"
  className="analyze-btn"
  onClick={handleAnalyze}
  disabled={loading}
>
  {loading
    ? "⏳ AI Analyzing..."
    : "🤖 Analyze with AI"}
</button>

</div>
      
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
    </section>
  );
}

export default UploadSection;