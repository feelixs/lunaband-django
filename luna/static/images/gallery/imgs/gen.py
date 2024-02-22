import os

# List all files in the current directory
files = os.listdir('..')

# Format each file name as a list item in Python syntax
file_list_syntax = [f"{file}" for file in files]

print(file_list_syntax)