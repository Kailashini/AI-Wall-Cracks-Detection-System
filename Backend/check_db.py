import sqlite3

conn = sqlite3.connect("wall_crack.db")

cursor = conn.cursor()

cursor.execute("SELECT * FROM crack_reports")

rows = cursor.fetchall()

print(rows)

conn.close()