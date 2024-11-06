import React from 'react';
import { Globe, Phone, Mail } from 'lucide-react';
import Foot from './Footer.module.css';

function Footer() {
  return (
    <footer className={Foot["footer"]}>
      <div className={Foot["footer-content"]}>
        <div className={Foot["footer-item"]}>
          <Globe className={Foot["footer-icon"]} />
          <a href="https://ciu.ac.ug" className={Foot["footer-link"]}>https://ciu.ac.ug</a>
        </div>
        <div className={Foot["footer-item"]}>
          <Phone className={Foot["footer-icon"]} />
          <span>(+256)-323-301-640</span>
        </div>
        <div className={Foot["footer-item"]}>
          <Mail className={Foot["footer-icon"]} />
          <a href="mailto:info@ciu.ac.ug" className={Foot["footer-link"]}>info@ciu.ac.ug</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;