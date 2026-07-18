import sqlite3


def create_database():

    conn = sqlite3.connect("wall_crack.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS crack_reports (
        serial_no INTEGER PRIMARY KEY AUTOINCREMENT,
        crack_type TEXT,
        confidence TEXT,
        severity TEXT,
        repair TEXT,
        cost TEXT,
        time TEXT,
        suggested_paint_type TEXT,
        description TEXT,
        paint_quantity TEXT
    )
    """)

    conn.commit()
    conn.close()



def save_report(result):

    conn = sqlite3.connect("wall_crack.db")
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO crack_reports
    (
        crack_type,
        confidence,
        severity,
        repair,
        cost,
        time,
        suggested_paint_type,
        description,
        paint_quantity
       
    )

    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

    """,
    (
        result.get("crack_type"),
        result.get("confidence"),
        result.get("severity"),
        result.get("repair"),
        result.get("cost"),
        result.get("time"),
        result.get("suggested_paint_type"),
        result.get("description"),
        result.get("paint_quantity")
    ))

    conn.commit()
    print("SAVED HISTORY:", result.get("crack_type"))
    conn.close()
    


def delete_all_reports():

    conn = sqlite3.connect("wall_crack.db")
    cursor = conn.cursor()


    cursor.execute("DELETE FROM crack_reports")


    cursor.execute("""
    DELETE FROM sqlite_sequence
    WHERE name = 'crack_reports'
    """)


    conn.commit()
    conn.close()