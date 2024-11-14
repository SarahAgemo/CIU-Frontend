import React, { useRef, useEffect } from 'react';
import { useWebRTC } from '../hooks/useWebRTC';

const StudentCameraFeed = ({ roomId }) => {
  const videoRef = useRef();

  // Initialize WebRTC with the signaling room ID
  useWebRTC(roomId, videoRef, true);  // 'true' indicates that this component is broadcasting

  useEffect(() => {
    // Get access to the user's webcam
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        videoRef.current.srcObject = stream;  // Display webcam in the video element
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      style={{ width: '150px', height: 'auto', borderRadius: '8px' }}
    />
  );
};

export default StudentCameraFeed;
