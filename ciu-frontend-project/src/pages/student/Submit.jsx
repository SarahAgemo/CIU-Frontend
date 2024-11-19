//dummy display interface

// SampleComponent.jsx

import React from 'react';

const SampleComponent = () => {
  // Sample data to display
  const user = {
    name: "John Doe",
    age: 28,
    occupation: "Software Engineer",
    location: "San Francisco, CA",
    hobbies: ["Coding", "Hiking", "Photography"],
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to the Sample Component</h1>
      {/* <p>This is a simple React component displaying user data.</p>

      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>User Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Occupation:</strong> {user.occupation}</p>
        <p><strong>Location:</strong> {user.location}</p>

        <h3>Hobbies</h3>
        <ul>
          {user.hobbies.map((hobby, index) => (
            <li key={index}>{hobby}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default SampleComponent;
