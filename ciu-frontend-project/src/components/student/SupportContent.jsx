import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, HelpCircle, MessageSquare, AlertCircle, MessageCircleMore } from 'lucide-react';
import Support from './SupportContent.module.css'

export default function SupportContent() {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <main className={Support["support-cont"]}>
      <div className={Support["support-banner"]}>
        <div className={Support["image-banner"]}>
          <img src="/IMG-20241106-WA0061.jpg" alt="Support Illustration" />
        </div>
        <div className={Support["image-content"]}>
          <h2>Welcome to Support</h2>
          {/* <div className={Support["lookup-bar"]}>
            <input type="text" placeholder="Search..." />
            <Search size={20} />
          </div> */}
        </div>
      </div>
      <div className={Support["support-cards"]}>
        <SupportCard 
          icon={<HelpCircle size={48} />} 
          title="Self Help Guide" 
          onClick={() => handleCardClick('/student/support/self-help')}
        />
        <SupportCard 
          icon={<MessageSquare size={48} />} 
          title="FAQs" 
          onClick={() => handleCardClick('/student/support/FAQ')}
        />
        <SupportCard 
          icon={<MessageCircleMore size={48} />} 
          title="Live Chat" 
          onClick={() => handleCardClick('/student/support/live-chat')}
        />
        <SupportCard 
          icon={<AlertCircle size={48} />} 
          title="Report Issue" 
          onClick={() => handleCardClick('/student/support/message-support')}
        />
      </div>
    </main>
  );
}

function SupportCard({ icon, title, onClick }) {
  return (
    <div className={Support["support-card"]} onClick={onClick}>
      <div className={Support["card-icon"]}>{icon}</div>
      <h3>{title}</h3>
    </div>
  );
}
