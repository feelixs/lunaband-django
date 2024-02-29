import os
import json

# Provided list of image files
image_files = [
    '068A62F9.webp', 'P1001442.webp', '468D91AF.webp', 'P1001211.webp', 'P1001437.webp',
    'P1001384.webp', 'P1001197.webp', 'P1001430.webp', 'P1001262.webp', 'P1001396.webp',
    'P1001427.webp', 'P1001195.webp', 'P1000427.webp', 'P1000708.webp', 'P1001406.webp', 'P1001446.webp'
]

# Initialize a list to hold the dictionary of image files and their alts
pictures_list = []

# Traverse all files in the current directory
for file in os.listdir('.'):
    if file.endswith('.txt'):
        # Read the content of the text file to use as alt text
        with open(file, 'r') as f:
            alt_text = f.read().strip()

        # Assuming each text file corresponds to the images in order provided, pop the first image and use it
        if image_files:
            image_file = image_files.pop(0)
            pictures_list.append({"url": "https://trioluna.com/static/images/gallery/" + image_file, "alt": alt_text})

# Construct the final JSON
result_json = {"pictures": pictures_list}

# Print out the resulting JSON
print(json.dumps(result_json, indent=4))
