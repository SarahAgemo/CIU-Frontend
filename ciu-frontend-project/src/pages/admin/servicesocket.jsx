// src/services/socketService.js

import { io } from 'socket.io-client';

let socket;

export const initiateSocket = () => {
  socket = io('https://c-i-u-backend.onrender.com'); // Adjust the URL if different
  console.log(`Connecting socket...`);
};

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
};

export const subscribeToNotifications = (cb) => {
  if (!socket) return (true);
  socket.on('notification', (msg) => {
    console.log('WebSocket event received!', msg);
    return cb(null, msg);
  });
};
