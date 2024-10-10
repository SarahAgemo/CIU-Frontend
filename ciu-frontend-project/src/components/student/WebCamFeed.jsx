import React, { useEffect } from "react";

const WebcamFeed = ({ videoRef, isVisible }) => {
  useEffect(() => {
    if (isVisible && videoRef.current) {
      // Request camera access
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((err) => {
          console.error("Error accessing webcam: ", err);
        });
    }
  }, [isVisible, videoRef]);

  return (
    <div>
      {isVisible ? (
        <video ref={videoRef} style={{ width: "100%", height: "auto" }} />
      ) : (
        <p>Webcam not enabled</p>
      )}
    </div>
  );
};

export default WebcamFeed;
