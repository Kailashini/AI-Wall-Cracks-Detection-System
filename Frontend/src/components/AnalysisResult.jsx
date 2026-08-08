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

        <div className="ai-detection-row">
          {/* 1. AI Detected Image Panel */}
          <div className="detected-image-card">
            <h3>🖼 AI Detected Image</h3>

            {result?.detected_image ? (
              <div className="detected-image-wrapper">
                <img
                  src={`http://127.0.0.1:5000${result.detected_image}`}
                  alt="Detected Crack"
                  className="detected-image-img"
                />
              </div>
            ) : (
              <div className="detected-image-placeholder">
                <p>No detected image</p>
              </div>
            )}
          </div>

          {/* 2. Confidence Card (Positioned in horizontal gap between Image & Summary) */}
          <div className="confidence-bridge-card">
            <span className="confidence-label">Confidence</span>
            <h3 className="confidence-value">{result?.confidence || "-"}</h3>
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

          {/* 3. AI Detection Summary */}
          <div className="ai-summary-card">
            <h3>🤖 AI Detection Summary</h3>
            <div className="ai-summary-content">
              <div className="summary-item">
                <span className="summary-item-label">🧱 Crack Type</span>
                <span className="summary-item-value">{result?.crack_type || "-"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-item-label">📋 Overview</span>
                <p className="summary-item-desc">
                  {result?.description || (result ? "Wall surface scan completed." : "No analysis performed yet.")}
                </p>
              </div>
            </div>
          </div>

          {/* 4. Severity Panel */}
          <div className="result-card warning severity-panel">
            <span className="result-label">⚠ Severity</span>
            <h3>{result?.severity || "-"}</h3>
          </div>
        </div>

        {/* Secondary Details Grid */}
        <div className="result-grid secondary-details">
          {/* Repair Suggestion */}
          <div className="result-card success">
            <span className="result-label">🛠 Repair Suggestion</span>
            <h3>{result?.repair || "-"}</h3>
          </div>

          {/* Cost */}
          <div className="result-card primary">
            <span className="result-label">💰 Estimated Cost</span>
            <h3>{result?.total_cost || result?.cost || "-"}</h3>
          </div>

          {/* Time */}
          <div className="result-card">
            <span className="result-label">⏱ Repair Time</span>
            <h3>{result?.time || "-"}</h3>
          </div>
        </div>

      </section>
    </>
  );
}

export default AnalysisResult;