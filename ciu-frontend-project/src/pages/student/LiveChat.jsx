import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/chat'); // Adjust based on your backend URL

function Chat({ chatId, userId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.emit('joinChat', chatId);

    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [chatId]);

  const handleSendMessage = () => {
    socket.emit('sendMessage', {
      chatId,
      senderId: userId,
      content: newMessage,
    });
    setNewMessage(''); // Clear input field
  };

  return (
    <div>
      <h2>Chat</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId === userId ? 'You' : 'Admin'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default Chat;
