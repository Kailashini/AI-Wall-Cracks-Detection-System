<<<<<<< HEAD
import { useRef } from "react";

function WallDetails({wallDetails, setWallDetails}) {
  const fieldRefs = useRef([]);
  const toMeter = {
    m: 1,
    cm: 0.01,
    mm: 0.001,
    ft: 0.3048,
    in: 0.0254,
  };

  const focusNextField = (index) => {
    const next = fieldRefs.current[index + 1];
    if (next) {
      next.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      focusNextField(index);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
=======
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
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f

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
<<<<<<< HEAD
  onKeyDown={(e) => handleKeyDown(e, 0)}
  ref={(el) => (fieldRefs.current[0] = el)}
=======
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
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
<<<<<<< HEAD
  onKeyDown={(e) => handleKeyDown(e, 1)}
  ref={(el) => (fieldRefs.current[1] = el)}
=======
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
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
<<<<<<< HEAD
  onKeyDown={(e) => handleKeyDown(e, 2)}
  ref={(el) => (fieldRefs.current[2] = el)}
=======
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
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
<<<<<<< HEAD
  onKeyDown={(e) => handleKeyDown(e, 3)}
  ref={(el) => (fieldRefs.current[3] = el)}
=======
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
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
<<<<<<< HEAD
  onKeyDown={(e) => handleKeyDown(e, 4)}
  ref={(el) => (fieldRefs.current[4] = el)}
=======
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
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
<<<<<<< HEAD
    onKeyDown={(e) => handleKeyDown(e, 5)}
    ref={(el) => (fieldRefs.current[5] = el)}
=======
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
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

<<<<<<< HEAD
          <select
    id="wallMaterial"
    value={wallDetails.wallMaterial}
    onChange={handleChange}
    onKeyDown={(e) => handleKeyDown(e, 6)}
    ref={(el) => (fieldRefs.current[6] = el)}
>
=======
          <select id="Wall_Material">
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
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

<<<<<<< HEAD
          <select
    id="putty"
    value={wallDetails.putty}
    onChange={handleChange}
    onKeyDown={(e) => handleKeyDown(e, 7)}
    ref={(el) => (fieldRefs.current[7] = el)}
>
=======
          <select id="Putty">
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
            <option>Single coat putty</option>
            <option>Double Coat putty</option>
          </select>
        </div>

        {/* Existing Paint */}

        <div className="form-group">
          <label>Existing Paint</label>

<<<<<<< HEAD
          <select
    id="existingPaintType"
    value={wallDetails.existingPaintType}
    onChange={handleChange}
    onKeyDown={(e) => handleKeyDown(e, 8)}
    ref={(el) => (fieldRefs.current[8] = el)}
>
=======
          <select id="Existing_paint_type">
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
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

<<<<<<< HEAD
          <select
    id="coatType"
    value={wallDetails.coatType}
    onChange={handleChange}
    onKeyDown={(e) => handleKeyDown(e, 9)}
    ref={(el) => (fieldRefs.current[9] = el)}
>
=======
          <select id="coat_type">
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
            <option>Single</option>
            <option>Double</option>
            <option>No Putty</option>
          </select>
        </div>

        {/* New Paint */}

        <div className="form-group">
          <label>New Paint</label>

<<<<<<< HEAD
          <select
    id="paintType"
    value={wallDetails.paintType}
    onChange={handleChange}
    onKeyDown={(e) => handleKeyDown(e, 10)}
    ref={(el) => (fieldRefs.current[10] = el)}
>
=======
          <select id="Paint_type">
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
            <option>Economy-Waterproof</option>
            <option>Premium-Waterproof</option>
            <option>No Waterproof</option>
          </select>
        </div>

        {/* Surface Coating */}

        <div className="form-group">
          <label>Surface Coating</label>

<<<<<<< HEAD
          <select
    id="surfaceCoating"
    value={wallDetails.surfaceCoating}
    onChange={handleChange}
    onKeyDown={(e) => handleKeyDown(e, 11)}
    ref={(el) => (fieldRefs.current[11] = el)}
>
=======
          <select id="Surface_coating">
>>>>>>> 75c0599b1d8640f7aa905a6499523808c4d3379f
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