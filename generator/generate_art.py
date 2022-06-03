import enum
from tracemalloc import start
from PIL import Image, ImageDraw # pillow library
import random

# Create a random colour that will be used for each line in the image
def random_color():
    return (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))

# Function for the blend/fade visual effect
def interpolate(start_color, end_color, factor: float):
    # 0 = closer to start colour; 1 = closer to end colour - create a blend between the lines based on a number between 0,1
    recip = 1 - factor # always adds up to 1
    return(
        int(start_color[0] * recip + end_color[0] * factor),
        int(start_color[1] * recip + end_color[1] * factor),
        int(start_color[2] * recip + end_color[2] * factor)
    )

def generate_art():
    print("Generating art")
    image_size_px = 128

    # Image colour setup
    image_bg_color = (0, 0, 0)
    # Create startng & ending colours so that a blend/fade can be applied, making the overall image more uniform
    start_color = random_color()
    end_color = random_color()

    # Generate image params
    image = Image.new(
        "RGB",
        size=(image_size_px, image_size_px),
        color=image_bg_color) # type, size/dimensions, colour

    # Create negative space
    padding_px = 12 # 10% -> can render between 12px and width/height-12

    # Draw lines for the images
    draw = ImageDraw.Draw(image)
    points = []

    # Generate the points
    for _ in range(10): # this is repeated 10 times -> 10 lines
        random_point = (
            random.randint(padding_px, image_size_px - padding_px),
            random.randint(padding_px, image_size_px - padding_px))
        points.append(random_point)

    # Draw bounding box - to center image
    min_x = min([p[0] for p in points]) # for every point in array
    max_x = max([p[0] for p in points])
    min_y = min([p[1] for p in points])
    max_y = max([p[1] for p in points])
    #draw.rectangle((min_x, min_y, max_x, max_y), outline=(230, 230, 230))

    # Center image/bounding box
    delta_x = min_x - (image_size_px - max_x)
    delta_y = min_y - (image_size_px - max_y)

    for i, point in enumerate(points):
        points[i] = (point[0] - delta_x // 2, point[1] - delta_y // 2)

    # Draw the points
    thickness = 0
    n_points = len(points) - 1
    for i, point in enumerate(points): #// Loop through point array
        p1 = point

        # Check if at the end of list
        if i == len(points) - 1:
            p2 = points[0]
        else:
            p2 = points[i + 1]

        line_xy = (p1, p2)
        color_factor = i / n_points
        line_color = interpolate(start_color, end_color, color_factor)
        thickness += 1
        draw.line(line_xy, fill=line_color, width=thickness)

    image.save("test_image.png")

if __name__ == "__main__":
    generate_art()

"""
As of right now, we have abstract generative art. How do we turn this into abstract pixel art, abstract game art (as in a more realistic/high-def art style, like what we have in Unity 3D) for the drop?
Let's use this generative art as a placeholder, add some special effects (layers) like stars, etc
"""