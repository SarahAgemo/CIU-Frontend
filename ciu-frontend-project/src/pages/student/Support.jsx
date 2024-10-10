import React from 'react';

const SupportPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section */}
      <div style={{ marginBottom: '40px' }}>
        <img
          src="https://example.com/support-image.png" // Replace with actual image URL
          alt="Support Illustration"
          style={{ width: '100px', height: 'auto' }}
        />
        <h1>Welcome to Support</h1>
        {/* Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search..."
            style={{
              padding: '10px',
              width: '40%',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '16px',
            }}
          />
          <button
            style={{
              padding: '10px',
              border: 'none',
              backgroundColor: '#007BFF',
              color: 'white',
              cursor: 'pointer',
              borderRadius: '5px',
              marginLeft: '10px',
            }}
          >
            🔍
          </button>
        </div>
      </div>

      {/* Support Options Section */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <SupportOption title="Self Help Guide" icon="📖" />
        <SupportOption title="FAQs" icon="❓" />
        <SupportOption title="Video Walkthrough" icon="🎥" />
        <SupportOption title="Report Issue" icon="📝" />
        <SupportOption title="Call Support" icon="📞" />
        <SupportOption title="Live Chat" icon="💬" />
      </div>

      {/* Footer Section */}
      <footer style={{ marginTop: '40px', padding: '10px', backgroundColor: '#f9f9f9' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <a href="https://ciu.ac.ug" style={{ textDecoration: 'none', color: '#333' }}>
            🌐 https://ciu.ac.ug
          </a>
          <span>📞 +256-323-301-640</span>
          <span>✉️ info@ciu.ac.ug</span>
        </div>
      </footer>
    </div>
  );
};

// Support Option Component
const SupportOption = ({ title, icon }) => (
  <div
    style={{
      flex: '1 1 30%',
      margin: '20px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '20px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}
  >
    <div style={{ fontSize: '30px', marginBottom: '10px' }}>{icon}</div>
    <h3>{title}</h3>
  </div>
);

export default SupportPage;
