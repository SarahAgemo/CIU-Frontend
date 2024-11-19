import { useState, useEffect } from 'react';
import Header from '../../components/student/Headerpop';
import Sidebar from '../../components/student/SideBarpop';
import MobileMenu from "../../components/student/MobileMenu"
import FAQs from '../../components/student/FAQs';
import Faqs from './FAQpage.module.css'

export default function Questions() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className={Faqs['faq-page']}>
    <div className={`${Faqs["faq"]} ${isMobileMenuOpen ? Faqs["menu-open"] : ""}`}>
      <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
      <div className={`${Faqs['faq-content']} ${isMobileMenuOpen ? Faqs["dimmed"] : ""}`}>
        {!isMobile && <Sidebar />}
        {isMobile && (
          <>
            <div 
              className={`${Faqs["overlay"]} ${isMobileMenuOpen ? Faqs["active"] : ""}`} 
              onClick={toggleMobileMenu}
            ></div>
            <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
          </>
        )}
        <FAQs />
      </div>
    </div>
    </div>
  );
}