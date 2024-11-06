
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Your backend URL

export const subscribeToNotifications = (callback) => {
  socket.on('notification', (notification) => {
    callback(notification);
  });

  // You can add more event listeners as needed
};

export const disconnectSocket = () => {
  socket.disconnect();
};
