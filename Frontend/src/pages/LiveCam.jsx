import React, { useRef, useState } from 'react';

const LiveCam = () => {
    const videoRef = useRef(null); // Reference to the video element
    const canvasRef = useRef(null); // Reference to the canvas element
    const [imageSrc, setImageSrc] = useState(null); // State to store the captured image

    // Start the camera and stream to the video element
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing the camera:', error);
        }
    };

    // Capture the image from the video stream
    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert the canvas image to a data URL and set it in state
            const imageDataUrl = canvas.toDataURL('image/png');
            setImageSrc(imageDataUrl);
        }
    };

    // Start the camera when the component mounts
    React.useEffect(() => {
        startCamera();
    }, []);

    return (
        <div>
            <h1>Live Image Capture</h1>
            <div>
                <video ref={videoRef} width="640" height="480" autoPlay playsInline />
            </div>
            <button onClick={captureImage}>Capture Image</button>
            <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
            {imageSrc && (
                <div>
                    <h2>Captured Image</h2>
                    <img src={imageSrc} alt="Captured" width="640" height="480" />
                </div>
            )}
        </div>
    );
};

export default LiveCam;