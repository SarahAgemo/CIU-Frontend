import { useState, useEffect } from 'react';
import Header from '../../components/student/Headerpop';
import Sidebar from '../../components/student/SideBarpop';
import MobileMenu from "../../components/student/MobileMenu"
import SupportContent from '../../components/student/SupportContent';
import Footer from '../../components/student/Footer';
import Suppage from './SupportPage.module.css'

export default function SupportPage() {
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
    <div className={Suppage["support-page"]}>
    <div className={`${Suppage["support"]} ${isMobileMenuOpen ? Suppage["menu-open"] : ""}`}>
      <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
      <div className={Suppage["support-content"]}>
        {!isMobile && <Sidebar />}
        {isMobile && (
          <>
            <div 
              className={`${Suppage["overlay"]} ${isMobileMenuOpen ? Suppage["active"] : ""}`} 
              onClick={toggleMobileMenu}
            ></div>
            <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
          </>
        )}
        <div className={Suppage["main-container"]}>
          <main className={`${Suppage.mainContentWrapper} ${isMobileMenuOpen ? Suppage.dimmed : ''}`}>
            <SupportContent />
          </main>
          <Footer />
        </div>
      </div>
    </div>
    </div>
  );
}