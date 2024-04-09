#!/bin/bash

# Directory where your template files are located
SEARCH_DIR="."

# Find all .html files and exclude files ending with -test.html, then process each file
find "$SEARCH_DIR" -type f -name "*.html" ! -name "*-test.html" -print0 | while IFS= read -r -d $'\0' file; do
    # Extract the base name without the .html extension
    base_name=$(basename "$file" .html)

    # Directory of the file
    dir_name=$(dirname "$file")

    # Construct the new filename with -test appended
    new_file="$dir_name/${base_name}-test.html"

    # Use sed to read from the original file and write to a new file with the modified name
    sed "s|{% static '\([^']*\)' %}|../../static/\1|g" "$file" > "$new_file"
done

echo "Static paths updated."
