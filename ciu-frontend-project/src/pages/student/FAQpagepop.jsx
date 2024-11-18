import { useState, useEffect } from 'react';
import Header from '../../components/student/Headerpop';
import Sidebar from '../../components/student/SideBarpop';
import MobileMenu from "../../components/student/MobileMenu"
import FAQList from '../../components/student/FAQpop';
import Footer from '../../components/student/Footer';
import Faqs from './FAQpagepop.module.css'

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
    <div className={Faqs['overall']}>
    <div className={`${Faqs["app"]} ${isMobileMenuOpen ? Faqs["menu-open"] : ""}`}>
      <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
      <div className={Faqs['app-content']}>
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
        <div className={Faqs['main-container']}>
          <main className={`${Faqs['main-content']} ${isMobileMenuOpen ? Faqs["dimmed"] : ""}`}>
            <FAQList />
          </main>
          <Footer />
        </div>
      </div>
    </div>
    </div>
  );
}