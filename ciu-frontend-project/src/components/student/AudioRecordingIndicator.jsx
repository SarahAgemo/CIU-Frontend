import React from "react";

const AudioRecordingIndicator = ({ isVisible }) => {
  return (
    <div>
      {isVisible ? (
        <p>Audio is being recorded...</p>
      ) : (
        <p>Audio recording not enabled.</p>
      )}
    </div>
  );
};

export default AudioRecordingIndicator;
