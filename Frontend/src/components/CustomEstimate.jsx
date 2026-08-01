function CustomEstimate({
  customEstimate,
  setCustomEstimate,
<<<<<<< HEAD
  analyzeHandler,
  loading,
=======
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
}) { 
  const handleChange = (e) => {
  const { id, value, type, checked } = e.target;

  setCustomEstimate((prev) => ({
    ...prev,
    [id]:
      type === "checkbox"
        ? checked
        : value,
  }));
};
  return (
    <section className="content-card">

      <div className="toggle-header">
        <label>
          <input
  type="checkbox"
  id="enabled"
  checked={customEstimate.enabled}
  onChange={handleChange}
/>

          {" "}Customize Estimation
        </label>
      </div>

      <div
  id="customOptions"
  style={{
    display: customEstimate.enabled ? "block" : "none",
  }}
>

        <div className="details-grid">

          {/* Cement */}

          <div className="form-group">
            <label>Cement Bag Price (50 Kg)</label>

            <input
  type="number"
  id="cementPrice"
  placeholder="390"
  value={customEstimate.cementPrice}
  onChange={handleChange}
/>
          </div>

          {/* Putty */}

          <div className="form-group">
            <label>Putty Bag Price (20 Kg)</label>

            <input
  type="number"
  id="puttyPrice"
  placeholder="650"
  value={customEstimate.puttyPrice}
  onChange={handleChange}
/>
          </div>

          {/* Primer */}

          <div className="form-group">
            <label>Primer Price (1 L)</label>

            <input
  type="number"
  id="primerPrice"
  placeholder="280"
  value={customEstimate.primerPrice}
  onChange={handleChange}
/>
          </div>

          {/* Paint */}

          <div className="form-group">
            <label>Paint Price (1 L)</label>

            <input
  type="number"
  id="paintPrice"
  placeholder="350"
  value={customEstimate.paintPrice}
  onChange={handleChange}
/>
          </div>

          {/* Thinner */}

          <div className="form-group">
            <label>Thinner Price</label>

            <input
  type="number"
  id="thinnerPrice"
  placeholder="220"
  value={customEstimate.thinnerPrice}
  onChange={handleChange}
/>

          </div>

        </div>

      </div>

<<<<<<< HEAD
      <div className="custom-estimate-action">
        <button
          type="button"
          className="analyze-btn"
          onClick={analyzeHandler}
          disabled={!analyzeHandler || loading}
        >
          {loading ? "⏳ AI Analyzing..." : "🤖 Analyze with AI"}
        </button>
      </div>

=======
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
    </section>
  );
}

export default CustomEstimate;