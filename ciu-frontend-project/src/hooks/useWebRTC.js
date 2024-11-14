import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

export function useWebRTC(roomId) {
  const [socket, setSocket] = useState(null); // Add state for socket
  const peers = useRef({});

  useEffect(() => {
    const socketInstance = io('http://localhost:3000'); // Initialize socket connection
    setSocket(socketInstance); // Store the socket instance

    // Emit a signal to join the room once socket is ready
    socketInstance.emit('join-room', roomId);

    // Handle the incoming WebRTC signals
    socketInstance.on('webrtc-signal', ({ senderId, signal }) => {
      if (!peers.current[senderId]) {
        const peer = new Peer({ initiator: false, trickle: false });

        // Respond to the signaling data with the signal
        peer.signal(signal);

        // Emit back a signal response to the server
        peer.on('signal', data => {
          socketInstance.emit('webrtc-signal', { room: roomId, signal: data, senderId: socketInstance.id });
        });


        // Handle incoming stream
        peer.on('stream', (stream) => {
            const peerRef = peers.current[senderId];
            if (peerRef && peerRef.current) {
              peerRef.current.srcObject = stream; // Attach the stream to the video element
            }
        });


        // Store the peer connection in refs
        peers.current[senderId] = peer;

        // Setup cleanup when the peer connection is destroyed
        peer.on('close', () => {
          delete peers.current[senderId];  // Remove peer from the list when closed
        });
      }
    });

    // Cleanup on unmount or roomId change
    return () => {
      // Properly clean up the peer connections
      Object.values(peers.current).forEach((peer) => {
        if (peer && peer.destroy) {
          peer.destroy(); // Proper cleanup of the peer instance
        }
      });

      // Only disconnect socket when component unmounts
      socketInstance.disconnect(); 
    };
  }, [roomId]); // Re-run when roomId changes

  return peers.current;  // Return the reference to peers
}
