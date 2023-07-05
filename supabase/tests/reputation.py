import httpx
import asyncio

# Set up your Supabase credentials
SUPABASE_URL = '#'
SUPABASE_API_KEY = '#'

async def update_profiles():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f'{SUPABASE_URL}/table/posts_duplicates?select=author,planets2',
            headers={'apikey': SUPABASE_API_KEY}
        )
        response_data = response.json()
        
        print(response_data)

        profiles_to_update = {}
        for entry in response_data:
            user_id = entry['author']
            planets = entry['planets2']

            if user_id not in profiles_to_update:
                profiles_to_update[user_id] = set()

            profiles_to_update[user_id].update(planets)

        for user_id, planets in profiles_to_update.items():
            # Update the user's experience, reputation, and level here
            # You need to implement the logic to calculate and update these values
            # based on the unique planets the user has posted on
            # For example:
            user_experience = len(planets)
            user_reputation = len(planets)
            user_level = user_experience // 3  # For every 3 experience points, level up

            # Update the user's profile in Supabase
            update_payload = {
                'experience': user_experience,
                'reputation': user_reputation,
                'level': user_level
            }
            update_response = await client.patch(
                f'{SUPABASE_URL}/table/profiles?select=id&id=eq.{user_id}',
                headers={'apikey': SUPABASE_API_KEY},
                json=update_payload
            )
            if update_response.status_code != 200:
                print(f"Error updating profile for user {user_id}")

# Run the asyncio event loop
asyncio.run(update_profiles())