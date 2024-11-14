import React from 'react';
import { useWebRTC } from '../hooks/useWebRTC';
import VideoGrid from '../components/VideoGrid';

const LecturerProctorPage = () => {
  const roomId = 'exam-room'; // The shared room ID for signaling

  // useWebRTC hook to initialize multiple feeds for the lecturer
  const peerRefs = useWebRTC(roomId);

  return (
    <div>
      <h2>Live Proctoring</h2>
      <VideoGrid peerRefs={peerRefs} />
    </div>
  );
};

export default LecturerProctorPage;
