import React, { useState } from 'react';
import './upload-picture.scss';

interface UploadPictureProps {
    onChange: (value: any) => void;
    reference: (value: HTMLInputElement) => void;
}

export default function UploadPicture({ onChange, reference }: UploadPictureProps) {
    const [error, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);

    // upload image to the cloudinary server
    const handleUploadPicture = ({ target }: any) => {
        setLoading(true);
        let file = target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        // upload preset name
        formData.append('upload_preset', 'hyf8xicn');
        const options = {
            method: 'POST',
            body: formData,
        };

        // make request with cloudinary url
        return fetch('https://api.cloudinary.com/v1_1/dq13usz8m/upload', options)
            .then(res => res.json())
            .then(res => onChange(res.url))
            .catch((err) => setError(true))
            .finally(() => setLoading(false))
    };

    return (
        <div className="upload-image">
            <label >
                Picture
            </label>
            <input
                ref={reference}
                name="Picture"
                accept="image/*"
                type="file"
                onChange={handleUploadPicture}
                id="icon-button-file"
            />
            {isLoading && (
                <span>Loading...</span>
            )}
            {error && (
                <p className="error">Failed to upload the image. Try again!</p>
            )}
        </div>
    )
}