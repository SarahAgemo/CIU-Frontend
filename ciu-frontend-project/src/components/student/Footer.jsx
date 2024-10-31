import React from 'react';
import { Globe, Phone, Mail } from 'lucide-react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-item">
          <Globe className="footer-icon" />
          <a href="https://ciu.ac.ug" className="footer-link">https://ciu.ac.ug</a>
        </div>
        <div className="footer-item">
          <Phone className="footer-icon" />
          <span>(+256)-323-301-640</span>
        </div>
        <div className="footer-item">
          <Mail className="footer-icon" />
          <a href="mailto:info@ciu.ac.ug" className="footer-link">info@ciu.ac.ug</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;