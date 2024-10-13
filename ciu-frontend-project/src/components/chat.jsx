import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3001');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [senderId, setSenderId] = useState(1); // Default sender ID
  const [receiverId, setReceiverId] = useState(2); // Default receiver ID

  useEffect(() => {
    // Fetch initial messages from the REST API
    const fetchMessages = async () => {
      const response = await axios.get(`http://localhost:3001/chat/${senderId}/${receiverId}`);
      setMessages(response.data);
    };

    fetchMessages();

    // Listen for incoming messages from WebSocket
    socket.on('messageReceived', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('messageReceived');
    };
  }, [senderId, receiverId]);

  const handleSendMessage = async () => {
    if (content.trim()) {
      // Send message via WebSocket
      socket.emit('sendMessage', { senderId, receiverId, content });

      // Optionally, you can also save it to the database via REST API
      await axios.post('http://localhost:3001/chat/send', {
        senderId,
        receiverId,
        content,
      });

      setContent(''); // Clear input after sending
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div>
        <h3>Messages:</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.senderId}: </strong>{msg.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
