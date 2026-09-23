#!/bin/bash

# Check if folder is provided
if [ -z "$1" ]; then
  echo "Usage: ./png2webp.sh <folder>"
  exit 1
fi

folder="$1"

# Loop through all PNG files
for file in "$folder"/*.png; do
  if [ -f "$file" ]; then
    filename=$(basename "$file" .png)
    cwebp -q 80 "$file" -o "$folder/$filename.webp"
    echo "Converted: $file -> $folder/$filename.webp"
  fi
done

echo "All PNG images converted to WebP!"
