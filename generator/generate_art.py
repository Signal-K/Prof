from PIL import Image, ImageDraw # pillow library
import random

def generate_art():
    print("Generating art")
    image_size_px = 128
    image_bg_color = (255, 255, 255)
    image = Image.new(
        "RGB",
        size=(image_size_px, image_size_px),
        color=image_bg_color) # type, size/dimensions, colour

    # Draw lines for the images
    draw = ImageDraw.Draw(image)

    for _ in range(10):
        random_point_1 = (
            random.randint(0, image_size_px),
            random.randint(0, image_size_px))
        random_point_2 = (
            random.randint(0, image_size_px),
            random.randint(0, image_size_px))

        line_xy = (random_point_1, random_point_2)
        line_color = (0, 0, 0)
        draw.line(line_xy, fill=line_color)

    image.save("test_image.png")

if __name__ == "__main__":
    generate_art()

"""
As of right now, we have abstract generative art. How do we turn this into abstract pixel art, abstract game art (as in a more realistic/high-def art style, like what we have in Unity 3D) for the drop?
Let's use this generative art as a placeholder, add some special effects (layers) like stars, etc
"""