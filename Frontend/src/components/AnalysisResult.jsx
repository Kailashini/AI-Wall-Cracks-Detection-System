function AnalysisResult({ result }) {
  return (
    <>
      {/* AI Analysis */}
      <section id="analysis" className="content-card">
        <div className="section-header">
          <div>
            <h2>🤖 AI Analysis Result</h2>

            <p>
              AI-generated crack detection report and repair recommendation.
            </p>

            <div className="ai-status">
              {result ? "✅ Analysis Completed" : "🤖 AI Ready"}
            </div>
          </div>
        </div>

        <div className="result-grid">

          {/* Crack Type */}
          <div className="result-card">
            <span className="result-label">
              🧱 Crack Type
            </span>

            <h3>{result?.crack_type || "-"}</h3>
          </div>

          {/* Detected Image */}
          <div className="detected-image-card">

            <h3>🖼 AI Detected Image</h3>

            {result?.detected_image ? (

              <img
                src={`http://127.0.0.1:5000${result.detected_image}`}
                alt="Detected Crack"
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  marginTop: "20px",
                  borderRadius: "12px",
                  border: "2px solid #ddd",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />

            ) : (

              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#777",
                }}
              >
                <p>No detected image</p>
              </div>

            )}

          </div>

          {/* AI Summary */}
          <div className="ai-summary-card">

            <h3>🤖 AI Detection Summary</h3>

            <div className="ai-summary-box">

              <div className="ai-info-card model">
                <h4>AI Model</h4>
                <p>YOLOv8 Nano</p>
              </div>

              <div className="ai-info-card dataset">
                <h4>Dataset</h4>
                <p>Kaggle Wall Crack Dataset</p>
              </div>

              <div className="ai-info-card confidence">

                <h4>Confidence</h4>

                <p>{result?.confidence || "-"}</p>

                <div className="confidence-bar">

                  <div
                    className="confidence-fill"
                    style={{
                      width: `${parseFloat(
                        result?.confidence?.replace("%", "") || 0
                      )}%`,
                    }}
                  ></div>

                </div>

              </div>

              <div className="ai-info-card class">

                <h4>Detected Class</h4>

                <p>{result?.crack_type || "-"}</p>

              </div>

            </div>

          </div>

          {/* Severity */}
          <div className="result-card warning">

            <span className="result-label">
              ⚠ Severity
            </span>

            <h3>{result?.severity || "-"}</h3>

          </div>

          {/* Repair */}
          <div className="result-card success">

            <span className="result-label">
              🛠 Repair Suggestion
            </span>

            <h3>{result?.repair || "-"}</h3>

          </div>

          {/* Cost */}
          <div className="result-card primary">

            <span className="result-label">
              💰 Estimated Cost
            </span>

            <h3>{result?.total_cost || result?.cost || "-"}</h3>

          </div>

          {/* Time */}
          <div className="result-card">

            <span className="result-label">
              ⏱ Repair Time
            </span>

            <h3>{result?.time || "-"}</h3>

          </div>

        </div>

      </section>
    </>
  );
}

export default AnalysisResult;