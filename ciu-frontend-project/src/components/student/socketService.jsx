
import { io } from 'socket.io-client';

const socket = io('https://c-i-u-backend.onrender.com'); // Your backend URL

export const subscribeToNotifications = (callback) => {
  socket.on('notification', (notification) => {
    callback(notification);
  });

  // You can add more event listeners as needed
};

export const disconnectSocket = () => {
  socket.disconnect();
};
