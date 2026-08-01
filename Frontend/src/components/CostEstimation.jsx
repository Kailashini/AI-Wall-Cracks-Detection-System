import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function CostEstimation({ result, wallDetails, originalImage,detectedImage }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Convert ₹ string to number
  const cleanAmount = (value) => {
    if (!value) return 0;

    return (
      Number(
        String(value)
          .replace("₹", "")
          .replace(",", "")
          .trim()
      ) || 0
    );
  };

  // Chart
  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "doughnut",

      data: {
        labels: [
          "Putty",
          "Cement",
          "Primer",
          "Paint",
          "Thinner",
          "Labour",
        ],

        datasets: [
          {
            data: [
              cleanAmount(result?.putty_cost),
              cleanAmount(result?.cement_cost),
              cleanAmount(result?.primer_cost),
              cleanAmount(result?.paint_cost),
              cleanAmount(result?.thinner_cost),
              cleanAmount(result?.labour_cost),
            ],
          },
        ],
      },

      options: {
        responsive: true,

        plugins: {
          legend: {
            position: "bottom",
          },

          title: {
            display: true,
            text: "Repair Cost Distribution",
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [result]);

  const materialCost =
    cleanAmount(result?.putty_cost) +
    cleanAmount(result?.cement_cost) +
    cleanAmount(result?.primer_cost) +
    cleanAmount(result?.paint_cost) +
    cleanAmount(result?.thinner_cost);

  const labourCost = cleanAmount(result?.labour_cost);

  const finalCost = materialCost + labourCost;
  const getImageBase64 = (url) => {

  return new Promise((resolve, reject) => {

    const img = new Image();

    img.crossOrigin = "Anonymous";

    img.onload = () => {

      const canvas = document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);

      resolve(
        canvas.toDataURL("image/jpeg")
      );

    };

    img.onerror = reject;

    img.src = url;

  });

};
const downloadPDF = async () => {

  const pdf = new jsPDF();

  pdf.setFontSize(20);
  pdf.text("AI Wall Crack Detection Report", 20, 20);

  // ================= CRACK ANALYSIS =================

let y = 35;

// Section Title
pdf.setFont("helvetica", "bold");
pdf.setFontSize(15);
pdf.setTextColor(25, 118, 210);

pdf.text("CRACK ANALYSIS", 20, y);

y += 10;

// Image Titles
pdf.setFont("helvetica", "bold");
pdf.setFontSize(11);
pdf.setTextColor(0, 0, 0);

pdf.text("Original Wall Image", 20, y);
pdf.text("AI Detected Image", 115, y);

y += 5;

// Image Boxes
pdf.setDrawColor(150, 150, 150);

pdf.rect(
  20,
  y,
  75,
  60
);

pdf.rect(
  115,
  y,
  75,
  60
);

// Original Image
if (originalImage) {

  pdf.addImage(
    originalImage,
    "JPEG",
    20,
    y,
    75,
    60
  );

}

// AI Detected Image
// (இதுல அடுத்த step-ல detected image add பண்ணுவோம்)
if (detectedImage) {

  try {

    const detectedBase64 =
      await getImageBase64(
        `http://127.0.0.1:5000${detectedImage}`
      );

    pdf.addImage(
      detectedBase64,
      "JPEG",
      115,
      y,
      75,
      60
    );

  }
  catch(error){

    console.log(error);

  }

}
if (detectedImage) {

  try {

    const detectedBase64 =
      await getImageBase64(
        `http://127.0.0.1:5000${detectedImage}`
      );

    pdf.addImage(
      detectedBase64,
      "JPEG",
      115,
      y,
      75,
      60
    );

  }
  catch(error){

    console.log(error);

  }

}
// Next Section Start Position
y += 75;
  pdf.setFontSize(12);

  pdf.text(`Crack Type : ${result?.crack_type || "-"}`, 20, y);
  y += 10;

  pdf.text(`Severity : ${result?.severity || "-"}`, 20, y);
  y += 10;

  pdf.text(`Confidence : ${result?.confidence || "-"}`, 20, y);
  y += 10;

  pdf.text(`Repair : ${result?.repair || "-"}`, 20, y);
  y += 10;

  pdf.text(`Estimated Cost : ${result?.total_cost || "-"}`, 20, y);
  y += 10;

  pdf.text(`Repair Time : ${result?.time || "-"}`, 20, y);

  pdf.save("AI_Wall_Crack_Report.pdf");
};
  return (
    <section id="cost" className="content-card">
      <div className="section-header">
        <div>
          <h2>💰 Repair Cost Estimation</h2>

          <p>
            Material quantity and repair cost generated using AI estimation.
          </p>
        </div>
      </div>

      {/* Summary */}

      <div className="summary-grid">
        <div className="summary-card">
          <h4>📐 Wall Area</h4>

          <h2>{result?.wall_area || "-"}</h2>
        </div>

        <div className="summary-card">
          <h4>🛠 Crack Area</h4>

          <h2>{result?.crack_area || "-"}</h2>
        </div>

        <div className="summary-card">
          <h4>💵 Total Cost</h4>

          <h2>{result?.total_cost || "₹0"}</h2>
        </div>
      </div>

      {/* Cost Layout */}

      <div className="cost-layout">
        {/* Materials */}

        <div className="material-card">
          <h3>📦 Materials Required</h3>

          <ul>
            <li>
              Putty <span>{result?.putty_qty || "-"}</span>
            </li>

            <li>
              Cement <span>{result?.cement_qty || "-"}</span>
            </li>

            <li>
              Primer <span>{result?.primer_qty || "-"}</span>
            </li>

            <li>
              Paint <span>{result?.paint_qty || "-"}</span>
            </li>

            <li>
              Thinner <span>{result?.thinner_qty || "-"}</span>
            </li>
          </ul>
        </div>

        {/* Cost Breakdown */}

        <div className="material-card">
          <h3>💳 Cost Breakdown</h3>

          <ul>
            <li>
              Putty <span>{result?.putty_cost || "-"}</span>
            </li>

            <li>
              Cement <span>{result?.cement_cost || "-"}</span>
            </li>

            <li>
              Primer <span>{result?.primer_cost || "-"}</span>
            </li>

            <li>
              Paint <span>{result?.paint_cost || "-"}</span>
            </li>

            <li>
              Thinner <span>{result?.thinner_cost || "-"}</span>
            </li>

              <li>
  Labour <span>₹0</span>
</li>
          </ul>
        </div>

        {/* Chart */}

        <div className="chart-card">
          <h3>📊 Cost Distribution</h3>

          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Labour Note */}

      <div className="labour-note">
        💡 <strong>Note:</strong> Labour cost is optional and may vary depending
        on the location and repair work.
      </div>

      {/* Final Summary */}

      <div className="final-summary">
        <div>
          <h3>Total Material Cost</h3>

          <h2>₹{materialCost.toFixed(2)}</h2>
        </div>

        <div>
          <h3>Labour Cost</h3>

<h2>₹0.00</h2>
        </div>

        <div>
          <h3>Final Cost</h3>

          <h1>₹{finalCost.toFixed(2)}</h1>
        </div>
      </div>

      {/* Download */}

      <div className="download-section">
       
    <button
      className="download-btn"
      onClick={downloadPDF}
    >
      📄 Download PDF
    </button>          
      </div>
    </section>
  );
}

export default CostEstimation;