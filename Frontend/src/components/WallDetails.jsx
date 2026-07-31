function WallDetails({wallDetails, setWallDetails}) {
const toMeter = {
  m: 1,
  cm: 0.01,
  mm: 0.001,
  ft: 0.3048,
  in: 0.0254,
};
  const handleChange = (e) => {
  const { id, value } = e.target;

  setWallDetails((prev) => {
    let updated = {
      ...prev,
      [id]: value,
    };
const unitMap = {
  wallLengthUnit: "wallLength",
  wallWidthUnit: "wallWidth",
  crackLengthUnit: "crackLength",
  crackWidthUnit: "crackWidth",
  crackDepthUnit: "crackDepth",
};

if (unitMap[id]) {
  const valueField = unitMap[id];

  const oldValue = parseFloat(prev[valueField]);

  if (!isNaN(oldValue)) {
    const oldUnit = prev[id];
    const newUnit = value;

    const valueInMeter = oldValue * toMeter[oldUnit];
    const convertedValue = valueInMeter / toMeter[newUnit];

    updated[valueField] = Number(convertedValue.toFixed(4));
  }
}
    return updated;
  });
};

  return (
    <section id="wall-details" className="content-card">

      <div className="section-header">
        <div>
          <h2>🏠 Wall Information</h2>

          <p>
            Enter wall dimensions and crack details for accurate AI estimation.
          </p>
        </div>
      </div>

      <div className="details-grid">

        {/* Wall Length */}

        <div className="form-group">
          <label>Wall Length</label>

          <div className="input-group">
           <input
  type="number"
  id="wallLength"
  placeholder="Enter Length"
  value={wallDetails.wallLength}
  onChange={handleChange}
/>

            <select
  id="wallLengthUnit"
  value={wallDetails.wallLengthUnit}
  onChange={handleChange}
>
              <option value="ft">Feet</option>
              <option value="cm">CM</option>
              <option value="mm">MM</option>
              <option value="in">Inch</option>
              <option value="m">Meter</option>
            </select>
          </div>
        </div>

        {/* Wall Width */}

        <div className="form-group">
          <label>Wall Width</label>

          <div className="input-group">
           <input
  type="number"
  id="wallWidth"
  placeholder="Enter width"
  value={wallDetails.wallWidth}
  onChange={handleChange}
/>

            <select
  id="wallWidthUnit"
  value={wallDetails.wallWidthUnit}
  onChange={handleChange}
>
              <option value="ft">Feet</option>
              <option value="cm">CM</option>
              <option value="mm">MM</option>
              <option value="in">Inch</option>
              <option value="m">Meter</option>
            </select>
          </div>
        </div>

        {/* Crack Length */}

        <div className="form-group">
          <label>Crack Length</label>

          <div className="input-group">
            <input
  type="number"
  id="crackLength"
  placeholder="Enter Crack Length"
  value={wallDetails.crackLength}
  onChange={handleChange}
/>

            <select
  id="crackLengthUnit"
  value={wallDetails.crackLengthUnit}
  onChange={handleChange}
>
              <option value="ft">Feet</option>
              <option value="cm">CM</option>
              <option value="mm">MM</option>
              <option value="in">Inch</option>
              <option value="m">Meter</option>
            </select>
          </div>
        </div>

        {/* Crack Width */}

        <div className="form-group">
          <label>Crack Width</label>

          <div className="input-group">
            <input
  type="number"
  id="crackWidth"
  placeholder="Enter Crack Width"
  value={wallDetails.crackWidth}
  onChange={handleChange}
/>

            <select
  id="crackWidthUnit"
  value={wallDetails.crackWidthUnit}
  onChange={handleChange}
>
              <option value="ft">Feet</option>
              <option value="cm">CM</option>
              <option value="mm">MM</option>
              <option value="in">Inch</option>
              <option value="m">Meter</option>
            </select>
          </div>
        </div>

        {/* Crack Depth */}

        <div className="form-group">
          <label>Crack Depth</label>

          <div className="input-group">
            <input
  type="number"
  id="crackDepth"
  placeholder="Enter Depth"
  value={wallDetails.crackDepth}
  onChange={handleChange}
/>

            <select
  id="crackDepthUnit"
  value={wallDetails.crackDepthUnit}
  onChange={handleChange}
>
              <option value="ft">Feet</option>
              <option value="cm">CM</option>
              <option value="mm">MM</option>
              <option value="in">Inch</option>
              <option value="m">Meter</option>
            </select>
          </div>
          </div>
                  {/* Wall Type */}

        <div className="form-group">
          <label>Wall Type</label>

          <select
    id="wallType"
    value={wallDetails.wallType}
    onChange={handleChange}
>
            <option>Interior Wall</option>
            <option>Exterior Wall</option>
            <option>Tile</option>
            <option>Concrete Surface</option>
          </select>
        </div>

        {/* Wall Material */}

        <div className="form-group">
          <label>Wall Material</label>

          <select id="Wall_Material">
            <option>Brick</option>
            <option>Wire Brick</option>
            <option>Box Brick</option>
            <option>Fly Ash Brick</option>
            <option>Concrete Brick</option>
            <option>AAC Block</option>
            <option>Stone</option>
            <option>Tile</option>
          </select>
        </div>

        {/* Putty */}

        <div className="form-group">
          <label>Putty</label>

          <select id="Putty">
            <option>Single coat putty</option>
            <option>Double Coat putty</option>
          </select>
        </div>

        {/* Existing Paint */}

        <div className="form-group">
          <label>Existing Paint</label>

          <select id="Existing_paint_type">
            <option>Emulsion Paint</option>
            <option>Enamel Paint</option>
            <option>Epoxy Paint</option>
            <option>Acrylic Paint-artist</option>
            <option>Oil Paint</option>
            <option>Primer</option>
          </select>
        </div>

        {/* New Coat */}

        <div className="form-group">
          <label>New Coat</label>

          <select id="coat_type">
            <option>Single</option>
            <option>Double</option>
            <option>No Putty</option>
          </select>
        </div>

        {/* New Paint */}

        <div className="form-group">
          <label>New Paint</label>

          <select id="Paint_type">
            <option>Economy-Waterproof</option>
            <option>Premium-Waterproof</option>
            <option>No Waterproof</option>
          </select>
        </div>

        {/* Surface Coating */}

        <div className="form-group">
          <label>Surface Coating</label>

          <select id="Surface_coating">
            <option>None</option>
            <option>Waterproof</option>
            <option>Weather Shield</option>
            <option>Anti Fungus</option>
          </select>
        </div>

      </div>
    </section>
  );
}

export default WallDetails;