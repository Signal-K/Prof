import { useEffect, useState } from 'react';
import { supabase } from '../auth/supabaseClient';
import Icon from '../assets/Face.png';
import camera from '../assets/camera on.png';

export default function Avatar({
    url, size, onUpload
}) {
    const [avatar, setAvatarUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (url) downloadImage(url);
    }, [url]);

    return (
        <div style={{ width: size }} aria-live="polite" className='container mx-auto text-center'>
            <div class="flex justify-center">
                <div class="flex flex-col justify-center shrink-0 relative">
                    <label for="files" class=" opacity-25 w-full h-full bg-gray-400 rounded-full flex justify-center absolute  cursor-pointer">
                        {/* <img src={camera} alt="" class="w-24 h-24 mt-5" /> */}
                    </label>
                    <img 
                        class="w-18 h-18 object-cover rounded-full" 
                        src={avatarUrl ? avatarUrl : camera}
                        alt={avatarUrl ? 'Avatar' : 'No image'}
                        style={{ height: size, width: size }}
                    />
                    {uploading ? "Uploading..." : (
                        <>
                            <input 
                                type="file" 
                                id="files" 
                                accept="image/*"
                                class="hidden"
                                onChange={uploadAvatar}
                                disabled={uploading}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}