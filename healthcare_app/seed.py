import sqlite3

conn = sqlite3.connect("app.db")
cursor = conn.cursor()

with open("seed_data.sql", "r") as f:
    cursor.executescript(f.read())

conn.commit()
conn.close()

print("Seed data inserted successfully!")