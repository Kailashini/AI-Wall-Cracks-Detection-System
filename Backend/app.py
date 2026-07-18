from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import math
import os

from crack_detector import detect_crack
from database import create_database, save_report, delete_all_reports


app = Flask(__name__)
CORS(app)


UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


create_database()



# =====================================================
# UNIT CONVERSION
# =====================================================

def convert_to_meter(value, unit):

    try:
        value = float(value or 0)

    except:
        value = 0


    if unit == "m":
        return value

    elif unit == "cm":
        return value / 100

    elif unit == "mm":
        return value / 1000

    elif unit == "ft":
        return value * 0.3048

    elif unit == "in":
        return value * 0.0254


    return value

# =====================================================
# DEFAULT MATERIAL PRICE
# =====================================================

DEFAULT_PUTTY_PRICE = 650
DEFAULT_CEMENT_PRICE = 390
DEFAULT_PRIMER_PRICE = 280
DEFAULT_THINNER_PRICE = 220

ECONOMY_PAINT = 350
PREMIUM_PAINT = 600



# =====================================================
# HOME ROUTE
# =====================================================

@app.route("/")
def home():

    return "AI Wall Crack Detection Backend Running"




# =====================================================
# ANALYZE IMAGE
# =====================================================

@app.route("/analyze", methods=["POST"])
def analyze():


    if "image" not in request.files:

        return jsonify({
            "error":"Image not uploaded"
        }),400



    image = request.files["image"]


    filepath = os.path.join(
        UPLOAD_FOLDER,
        image.filename
    )


    image.save(filepath)


    
    # =================================================
    # IMAGE AI DETECTION
    # =================================================

    
    result = detect_crack(filepath)

    print("FINAL RESULT:", result)



    if result["crack_type"] == "No Crack":

      result["putty_qty"] = "0 Kg"
      result["cement_qty"] = "0 Kg"
      result["primer_qty"] = "0 L"
      result["paint_qty"] = "0 L"
      result["thinner_qty"] = "0 L"

      result["putty_cost"] = 0
      result["cement_cost"] = 0
      result["primer_cost"] = 0
      result["paint_cost"] = 0
      result["thinner_cost"] = 0

      result["material_cost"] = 0
      result["labour_cost"] = 0
      result["total_cost"] = 0
      result["cost"] = "₹0"
      save_report(result)
      return jsonify(result)

    # =================================================
    # GET WALL DETAILS
    # =================================================


    wall_length = request.form.get(
        "wall_length",
        0
    )


    wall_width = request.form.get(
        "wall_width",
        0
    )


    crack_length = request.form.get(
        "crack_length",
        0
    )


    crack_width = request.form.get(
        "crack_width",
        0
    )


    crack_depth = request.form.get(
        "crack_depth",
        0
    )



    wall_length_unit = request.form.get(
        "wall_length_unit",
        "ft"
    )


    wall_width_unit = request.form.get(
        "wall_width_unit",
        "ft"
    )


    crack_length_unit = request.form.get(
        "crack_length_unit",
        "ft"
    )


    crack_width_unit = request.form.get(
        "crack_width_unit",
        "ft"
    )


    crack_depth_unit = request.form.get(
        "crack_depth_unit",
        "ft"
    )



    wall_type = request.form.get(
        "wall_type",
        "-"
    )


    wall_material = request.form.get(
        "wall_material",
        "-"
    )


    paint_type = request.form.get(
        "paint_type",
        "Premium-Waterproof"
    )


    coat_type = request.form.get(
        "coat_type",
        "Single"
    )


    existing_paint_type = request.form.get(
        "existing_paint_type",
        "-"
    )


    surface_coating = request.form.get(
        "surface_coating",
        "-"
    )



    # =================================================
    # CONVERT UNITS
    # =================================================


    wall_length = convert_to_meter(
        wall_length,
        wall_length_unit
    )


    wall_width = convert_to_meter(
        wall_width,
        wall_width_unit
    )
    
    crack_length = convert_to_meter(
        crack_length,
        crack_length_unit
    )


    crack_width = convert_to_meter(
        crack_width,
        crack_width_unit
    )

    

    crack_depth = convert_to_meter(
        crack_depth,
        crack_depth_unit
    )

        # =================================================
    # AREA CALCULATION
    # =================================================

    wall_area = wall_length * wall_width

    crack_area = crack_length * crack_width



    # =================================================
    # CUSTOM PRICE OPTION
    # =================================================

    custom_estimate = (
        str(request.form.get("custom_estimate", "false")).lower()
        == "true"
    )


    def get_price(field_name, default_price):

        if custom_estimate:

            try:
                value = float(request.form.get(field_name, default_price))

                if value > 0:
                    return value

            except:
                pass

        return default_price



    PUTTY_PRICE = get_price(
        "putty_price",
        DEFAULT_PUTTY_PRICE
    )

    CEMENT_PRICE = get_price(
        "cement_price",
        DEFAULT_CEMENT_PRICE
    )

    PRIMER_PRICE = get_price(
        "primer_price",
        DEFAULT_PRIMER_PRICE
    )

    THINNER_PRICE = get_price(
        "thinner_price",
        DEFAULT_THINNER_PRICE
    )



    # =================================================
    # PAINT PRICE
    # =================================================

    if "Economy" in paint_type:

        PAINT_PRICE = ECONOMY_PAINT

    elif "Premium" in paint_type:

        PAINT_PRICE = PREMIUM_PAINT

    else:

        PAINT_PRICE = ECONOMY_PAINT



    if custom_estimate:

        try:

            custom_paint = float(
                request.form.get(
                    "paint_price",
                    PAINT_PRICE
                )
            )

            if custom_paint > 0:
                PAINT_PRICE = custom_paint

        except:
            pass



    # =================================================
    # MATERIAL QUANTITY
    # =================================================

    putty_qty = round(
        wall_area / 8,
        2
    )

    primer_qty = round(
        wall_area / 10,
        2
    )

    paint_qty = round(
        wall_area / 12,
        2
    )

    thinner_qty = round(
    max(paint_qty * 0.10, 0.10),
    2
)

    cement_qty = round(
        crack_area * crack_depth * 150,
        2
    )



    if coat_type.lower() == "double":

        paint_qty *= 2



    # =================================================
    # NUMBER OF PACKS
    # =================================================

    putty_bags = math.ceil(
        putty_qty / 20
    )

    cement_bags = math.ceil(
        cement_qty / 50
    )

    primer_cans = math.ceil(
        primer_qty
    )

    paint_cans = math.ceil(
        paint_qty
    )

    thinner_bottles = math.ceil(
        thinner_qty
    )



    # =================================================
    # MATERIAL COST
    # =================================================

    putty_cost = putty_bags * PUTTY_PRICE

    cement_cost = cement_bags * CEMENT_PRICE

    primer_cost = primer_cans * PRIMER_PRICE

    paint_cost = paint_cans * PAINT_PRICE

    thinner_cost = thinner_bottles * THINNER_PRICE
        # =================================================
    # LABOUR COST CALCULATION
    # =================================================

    if wall_type == "Interior Wall":

        labour_rate = 15


    elif wall_type == "Exterior Wall":

        labour_rate = 20


    elif wall_type == "Tile":

        labour_rate = 25


    else:

        labour_rate = 30



    labour_cost = round(
        wall_area * labour_rate,
        2
    )



    # =================================================
    # TOTAL COST
    # =================================================

    material_cost = (

        putty_cost +
        cement_cost +
        primer_cost +
        paint_cost +
        thinner_cost

    )


    total_cost = (

        material_cost +
        labour_cost

    )



    # =================================================
    # RESPONSE DATA
    # =================================================

    result["wall_area"] = (
        f"{wall_area:.2f} sq.m"
    )


    result["crack_area"] = (
        f"{crack_area:.4f} sq.m"
    )



    # -------------------------
    # Quantity
    # -------------------------

    result["putty_qty"] = (
        f"{putty_qty:.2f} Kg"
    )


    result["cement_qty"] = (
        f"{cement_qty:.2f} Kg"
    )


    result["primer_qty"] = (
        f"{primer_qty:.2f} L"
    )


    result["paint_qty"] = (
        f"{paint_qty:.2f} L"
    )


    result["thinner_qty"] = (
        f"{thinner_qty:.2f} L"
    )



    # -------------------------
    # Numeric Cost Values
    # JavaScript compatible
    # -------------------------


    result["putty_cost"] = putty_cost

    result["cement_cost"] = cement_cost

    result["primer_cost"] = primer_cost

    result["paint_cost"] = paint_cost

    result["thinner_cost"] = thinner_cost


    result["material_cost"] = material_cost


    result["labour_cost"] = labour_cost


    result["total_cost"] = total_cost



    # -------------------------
    # Display Cost
    # -------------------------

    result["cost"] = (
        f"₹{total_cost:,.2f}"
    )



    # =================================================
    # EXTRA DETAILS
    # =================================================

    result["paint_type"] = paint_type

    result["coat_type"] = coat_type

    result["wall_type"] = wall_type

    result["wall_material"] = wall_material

    result["existing_paint_type"] = existing_paint_type

    result["surface_coating"] = surface_coating



    # =================================================
    # SAVE DATABASE
    # =================================================

    save_report(result)



    return jsonify(result)




# =====================================================
# DASHBOARD API
# =====================================================

@app.route("/dashboard", methods=["GET"])
def dashboard():


    conn = sqlite3.connect(
        "wall_crack.db"
    )


    cursor = conn.cursor()



    cursor.execute(
        "SELECT COUNT(*) FROM crack_reports"
    )

    total = cursor.fetchone()[0]



    cursor.execute(
        "SELECT COUNT(*) FROM crack_reports WHERE severity='Low'"
    )

    low = cursor.fetchone()[0]



    cursor.execute(
        "SELECT COUNT(*) FROM crack_reports WHERE severity='Medium'"
    )

    medium = cursor.fetchone()[0]



    cursor.execute(
        "SELECT COUNT(*) FROM crack_reports WHERE severity='High'"
    )

    high = cursor.fetchone()[0]



    conn.close()



    return jsonify({

        "total": total,

        "low": low,

        "medium": medium,

        "high": high

    })
# =====================================================
# HISTORY API
# =====================================================

@app.route("/history", methods=["GET"])
def history():

    conn = sqlite3.connect("wall_crack.db")
    cursor = conn.cursor()

    cursor.execute("""
    SELECT 
        serial_no,
        crack_type,
        confidence,
        severity,
        repair,
        cost,
        time,
        suggested_paint_type,
        description,
        paint_quantity
    FROM crack_reports
    ORDER BY serial_no ASC
    """)

    rows = cursor.fetchall()

    conn.close()


    reports = []

    for row in rows:
        reports.append({
            "serial_no": row[0],
            "crack_type": row[1],
            "confidence": row[2],
            "severity": row[3],
            "repair": row[4],
            "cost": row[5],
            "time": row[6],
            "suggested_paint_type": row[7],
            "description": row[8],
            "paint_quantity": row[9]
        })


    return jsonify(reports)


@app.route("/delete-history", methods=["DELETE"])
def delete_history():

    try:
        delete_all_reports()

        return jsonify({
            "success": True,
            "message": "Analysis history deleted successfully"
        }), 200

    except Exception as e:

        print("DELETE HISTORY ERROR:", str(e))

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500



# =====================================================
# ERROR HANDLING
# =====================================================

@app.errorhandler(404)
def page_not_found(error):

    return jsonify({

        "error":
        "Route not found"

    }),404




@app.errorhandler(500)
def internal_error(error):

    return jsonify({

        "error":
        "Internal Server Error"

    }),500




# =====================================================
# RUN APPLICATION
# =====================================================

if __name__ == "__main__":

    app.run(
        debug=True
    )