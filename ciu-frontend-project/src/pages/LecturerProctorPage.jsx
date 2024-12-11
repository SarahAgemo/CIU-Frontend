import React, { useState, useEffect, useRef } from 'react';
import { Video } from 'twilio-video';
import axios from 'axios';

const LecturerProctorPage = ({ examId }) => {
  const [roomSid, setRoomSid] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [localParticipant, setLocalParticipant] = useState(null);
  const [remoteParticipants, setRemoteParticipants] = useState([]);
  const videoRefs = useRef({});

  // Create Twilio room on component mount
  useEffect(() => {
    const createExamRoom = async () => {
      try {
        // Fetch room creation endpoint
        const response = await axios.post('/api/exam-monitoring/create-room', { examId });
        setRoomSid(response.data.roomSid);
        
        // Generate token for lecturer
        const tokenResponse = await axios.get('/api/exam-monitoring/generate-token', {
          params: {
            identity: 'lecturer',
            roomName: response.data.roomName
          }
        });

        // Connect to Twilio video room
        const room = await Video.connect(tokenResponse.data.token, {
          name: response.data.roomName
        });

        // Handle local participant
        setLocalParticipant(room.localParticipant);

        // Track remote participants
        room.participants.forEach(handleParticipantConnected);
        room.on('participantConnected', handleParticipantConnected);
        room.on('participantDisconnected', handleParticipantDisconnected);

        // Periodic participant check
        const intervalId = setInterval(async () => {
          try {
            const participantsResponse = await axios.get(`/api/exam-monitoring/room-participants/${roomSid}`);
            setParticipants(participantsResponse.data);
          } catch (error) {
            console.error('Error fetching participants:', error);
          }
        }, 5000);

        return () => {
          clearInterval(intervalId);
          room.disconnect();
        };
      } catch (error) {
        console.error('Error setting up exam room:', error);
      }
    };

    createExamRoom();
  }, [examId]);

  // Participant connection handler
  const handleParticipantConnected = (participant) => {
    setRemoteParticipants(prevParticipants => [...prevParticipants, participant]);

    participant.on('trackSubscribed', track => {
      if (track.kind === 'video') {
        const videoElement = document.createElement('video');
        videoElement.setAttribute('playsinline', '');
        videoRefs.current[participant.identity] = videoElement;
        track.attach(videoElement);
      }
    });
  };

  // Participant disconnection handler
  const handleParticipantDisconnected = (participant) => {
    setRemoteParticipants(prevParticipants => 
      prevParticipants.filter(p => p !== participant)
    );
    
    if (videoRefs.current[participant.identity]) {
      delete videoRefs.current[participant.identity];
    }
  };

  // Suspicious activity detection
  const detectSuspiciousActivity = (participant) => {
    // Placeholder for advanced monitoring logic
    // Could include:
    // - Multiple face detections
    // - Background noise analysis
    // - Screen movement tracking
    return false;
  };

  return (
    <div className="lecturer-monitoring">
      <h1>Exam Monitoring Dashboard</h1>
      
      <div className="exam-details">
        <h2>Exam ID: {examId}</h2>
        <p>Room SID: {roomSid}</p>
      </div>

      <div className="participants-overview">
        <h3>Connected Participants</h3>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants.map(participant => (
              <tr 
                key={participant.identity} 
                className={detectSuspiciousActivity(participant) ? 'suspicious' : ''}
              >
                <td>{participant.identity}</td>
                <td>{participant.status}</td>
                <td>
                  <button>Flag</button>
                  <button>Warn</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="video-grid">
        {remoteParticipants.map(participant => (
          <div key={participant.identity} className="participant-video">
            <h4>{participant.identity}</h4>
            <video 
              ref={el => {
                if (el) videoRefs.current[participant.identity] = el;
              }} 
              autoPlay={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LecturerProctorPage;