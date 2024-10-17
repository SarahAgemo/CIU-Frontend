import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, HelpCircle, MessageSquare, AlertCircle, Globe, Phone, Mail } from 'lucide-react';
import Support from './SupportContent.module.css'

export default function SupportContent() {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <main className={Support["support-content"]}>
      <div className={Support["support-banner"]}>
        <div className={Support["image-banner"]}>
          <img src="/call-center-concept-flat-design (2).png" alt="Support Illustration" />
        </div>
        <div className={Support["image-content"]}>
          <h2>Welcome to Support</h2>
          <div className={Support["lookup-bar"]}>
            <input type="text" placeholder="Search..." />
            <Search size={20} />
          </div>
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
          onClick={() => handleCardClick('/student/support/faqs')}
        />
        <SupportCard 
          icon={<AlertCircle size={48} />} 
          title="Live Chat" 
          onClick={() => handleCardClick('/student/support/live-chat')}
        />
        <SupportCard 
          icon={<AlertCircle size={48} />} 
          title="Report Issue" 
          onClick={() => handleCardClick('/student/support/report-issue')}
        />
      </div>
      <div className={Support["contact-info"]}>
        <div className={Support["contact-item"]}>
          <Globe size={20} />
          <a href="https://ciu.ac.ug" target="_blank" rel="noopener noreferrer">https://ciu.ac.ug</a>
        </div>
        <div className={Support["contact-item"]}>
          <Phone size={20} />
          <span>(+256)-323-301-640</span>
        </div>
        <div className={Support["contact-item"]}>
          <Mail size={20} />
          <a href="mailto:info@ciu.ac.ug">info@ciu.ac.ug</a>
        </div>
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
