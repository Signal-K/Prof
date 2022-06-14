from avatar_generator import AvatarGenerator

def generate_avatar():
    generator = AvatarGenerator("./images")
    generator.generate_avatar()

if __name__ == "__main__": # If script is being run (i.e. was invoked by user)
    generate_avatar()