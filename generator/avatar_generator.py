from email.mime import image
import os
from typing import List
from layer import Layer
from PIL import Image

class AvatarGenerator:
    def __init__(self, images_path: str):
        self.layers: List[Layer] = self.load_image_layers(images_path)
        self.background_color = (120, 150, 180) # Update this later with things like rarity, stats etc (also do this for colour combos for all the components of the layered avatar)
        self.output_path: str = "./output"
        os.makedirs(self.output_path, exist_ok=True)

    def load_image_layers(self, images_path: str):
        sub_paths = sorted(os.listdir(images_path))
        layers = []
        for sub_path in sub_paths:
            layer_path = os.path.join(images_path, sub_path)
            layer = Layer(layer_path)
            layers.append(layer)
            print(layer_path)
        return layers

    def generate_image_sequence(self):
        image_path_sequence = []
        for layer in self.layers:
            image_path = layer.get_random_image_path()
            image_path_sequence.append(image_path)

        return image_path_sequence

    def render_avatar_image(self, image_path_sequence: List[str]):
        # Create a new image using Pillow
        Image.new("RGBA" (24, 24), self.background_color) # RGB + Alpha (Transparent -> individual layer imgs have transparent content)
        return image

    def save_image(self, image: Image.Image):
        image.save()

    def generate_avatar(self):
        image_path_sequence = self.generate_image_sequence
        image = self.render_avatar_image(image_path_sequence)
        self.save_image(image)