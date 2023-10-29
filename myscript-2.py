import sys

with open("./public/txtfile-2.txt", "w") as file:
    # Write the desired text to the file
    file.write("hello from python")
    file.write(sys.argv[1])
