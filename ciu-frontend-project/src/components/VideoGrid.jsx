import React, { useEffect, useRef } from 'react';

const VideoGrid = ({ peerRefs }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
    {Object.keys(peerRefs).map((key, index) => {
      const peerRef = peerRefs[key];
      
      // Ensuring that the video element displays the stream of the peer
      useEffect(() => {
        if (peerRef.current && peerRef.current.srcObject !== peerRef.current.stream) {
          peerRef.current.srcObject = peerRef.current.stream;
        }
      }, [peerRef]);

      return (
        <video
          key={index}
          ref={peerRef} // Use peerRef from the hook's return value
          autoPlay
          playsInline
          style={{ width: '100%' }}
        />
      );
    })}
  </div>
);

export default VideoGrid;
