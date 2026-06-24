# ============================================================
# SPRINT 2 — SQL METADATA DATABASE
# Pluto's Repawsitory · Group 2 · Dog Breed Classification
# Written by: Dre (Group Lead)
# ============================================================

# ── STEP 1: IMPORTS ──────────────────────────────────────────
# These are the tools we need. All of these are already installed.
# pandas = for reading the CSV and working with data as a table
# sqlite3 = built into Python, lets us create a SQL database file
# PIL (Pillow) = opens image files and reads their properties
# os = for working with file paths and names
# numpy = we only need this for the random seed

import pandas as pd
import sqlite3
from PIL import Image
import os
import numpy as np

# Set random seed at the top of every notebook — Jonathan required this
# This makes sure everyone on the team gets the same results
np.random.seed(42)

print("✓ Imports done")


# ── STEP 2: LOAD CAMERON'S CSV ───────────────────────────────
# Cameron's cleaned file has 3 columns:
#   filepaths → the path to each image on disk
#   labels    → the breed name (our target/class)
#   data set  → whether the image is train, valid, or test

df = pd.read_csv('dogs_updated.csv')

# Rename columns to match our database schema
# (cleaner names, no spaces)
df = df.rename(columns={
    'filepaths': 'file_path',
    'labels':    'label',
    'data set':  'split'
})

print(f"✓ CSV loaded: {len(df)} rows")
print(df.head(3))


# ── STEP 3: EXTRACT METADATA FROM EACH IMAGE ─────────────────
# For every image in the CSV, we open it with PIL and read:
#   - height and width in pixels
#   - number of channels (3 = color RGB, 1 = grayscale)
#   - file format (JPEG or PNG)
#   - whether it failed to open (corrupted)
#
# We DON'T store the actual pixel data — just the metadata (info about the file)
# This is exactly what Jonathan said: store descriptions, not raw pixels

records = []

for idx, row in df.iterrows():
    file_path = row['file_path']
    label     = row['label']
    split     = row['split']

    # Pull just the filename from the full path
    # Example: "train/shih_tzu/001.jpg" → "001.jpg"
    file_name = os.path.basename(file_path)

    # Default values — we'll fill these in if the image opens successfully
    height   = None
    width    = None
    channels = None
    fmt      = None
    corrupted = False

    try:
        # Try to open the image
        img = Image.open(file_path)

        # .size gives us (width, height) — note the order
        width, height = img.size

        # .getbands() returns the color channels, e.g. ('R', 'G', 'B')
        # len() counts them → 3 for color, 1 for grayscale
        channels = len(img.getbands())

        # .format is JPEG or PNG — sometimes None if PIL can't detect it
        # In that case we fall back to reading the file extension
        if img.format:
            fmt = img.format
        else:
            ext = os.path.splitext(file_path)[1]   # gets ".jpg" or ".png"
            fmt = ext.upper().replace('.', '')       # turns it into "JPG" or "PNG"

    except Exception:
        # If PIL throws any error, the file is corrupted or unreadable
        corrupted = True

    # Add this image's full record to our list
    records.append({
        'file_name':        file_name,
        'file_path':        file_path,
        'label':            label,
        'split':            split,
        'height':           height,
        'width':            width,
        'channels':         channels,
        'format':           fmt,
        'duplicate_flagged':  False,  # we'll calculate this next
        'corrupted_flagged':  corrupted
    })

# Turn our list of dictionaries into a DataFrame (like a spreadsheet in memory)
metadata_df = pd.DataFrame(records)

print(f"\n✓ Metadata extracted for {len(metadata_df)} images")
print(f"  Corrupted files found: {metadata_df['corrupted_flagged'].sum()}")


# ── STEP 4: FLAG DUPLICATES ───────────────────────────────────
# duplicated() checks if the same file_path appears more than once
# keep=False means flag ALL copies, not just the second one
# This way we can see both instances in the database
#
# IMPORTANT: We are NOT deleting anything.
# Jonathan's rule: flag it, don't delete it.
# The original data stays untouched. We just mark which rows are duplicates.

metadata_df['duplicate_flagged'] = metadata_df['file_path'].duplicated(keep=False)

print(f"  Duplicate files found: {metadata_df['duplicate_flagged'].sum()}")


# ── STEP 5: SAVE TO SQLITE DATABASE ──────────────────────────
# SQLite is a database that lives in a single file on your computer.
# No server needed. No setup. Just a .db file.
# This is the right choice for our project — Jonathan confirmed this is fine for local ML work.
#
# sqlite3.connect() creates the file if it doesn't exist, or opens it if it does.
# to_sql() writes our DataFrame into the database as a table called "images"
#   if_exists='replace' → if the table already exists, overwrite it (safe to re-run)
#   index=True, index_label='image_id' → uses the row number as our primary key

db_path = 'pluto_repository.db'
conn = sqlite3.connect(db_path)

metadata_df.to_sql(
    name='images',
    con=conn,
    if_exists='replace',
    index=True,
    index_label='image_id'
)

conn.close()

print(f"\n✓ Database saved: {db_path}")


# ── STEP 6: VERIFY — QUERY THE DATABASE ──────────────────────
# Now we prove it worked by opening the database and running SQL queries.
# This is what "your Jupyter notebook will pull data from SQL" looks like in practice.

conn = sqlite3.connect(db_path)

# Query 1: Look at the first 5 rows
print("\n── First 5 rows ──")
sample = pd.read_sql("SELECT * FROM images LIMIT 5", conn)
print(sample.to_string())

# Query 2: Count images per split (should match Cameron's numbers)
# train=7325, valid=687, test=682
print("\n── Images per split ──")
splits = pd.read_sql("""
    SELECT split, COUNT(*) as count
    FROM images
    GROUP BY split
    ORDER BY count DESC
""", conn)
print(splits.to_string())

# Query 3: Pull only training images — this is how Manuela/Ozor will use it
print("\n── Training images (first 5) ──")
train_only = pd.read_sql("""
    SELECT file_path, label, height, width, channels, format
    FROM images
    WHERE split = 'train'
      AND duplicate_flagged = 0
      AND corrupted_flagged = 0
    LIMIT 5
""", conn)
print(train_only.to_string())

# Query 4: Summary stats
print("\n── Database summary ──")
summary = pd.read_sql("""
    SELECT
        COUNT(*) as total_images,
        COUNT(DISTINCT label) as total_breeds,
        SUM(corrupted_flagged) as corrupted_count,
        SUM(duplicate_flagged) as duplicate_count
    FROM images
""", conn)
print(summary.to_string())

conn.close()

print("\n✓ All done. Database is built and verified.")
print(f"  File location: {os.path.abspath(db_path)}")
