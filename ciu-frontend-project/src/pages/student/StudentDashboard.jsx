import { useState, useEffect } from 'react';
import Header from '../../components/student/Headerpop';
import Sidebar from '../../components/student/SideBarpop';
import MainContent from '../../components/student/MainContent';
import MobileMenu from "../../components/student/MobileMenu"
import StudDashboard from './StudentDashboard.module.css';

export default function StudentDashboard() {
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
    <div className={StudDashboard.studentdash}>
    <div className={`${StudDashboard["dashboard"]} ${isMobileMenuOpen ? StudDashboard["menu-open"] : ""}`}>
      <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
      <div className={StudDashboard['dashboard-content']}>
        {!isMobile && <Sidebar />}
        {isMobile && (
          <>
            <div 
              className={`${StudDashboard["overlay"]} ${isMobileMenuOpen ? StudDashboard["active"] : ""}`} 
              onClick={toggleMobileMenu}
            ></div>
            <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
          </>
        )}
        <div className={`${StudDashboard.mainContentWrapper} ${isMobileMenuOpen ? StudDashboard.dimmed : ''}`}>
        <MainContent />
        </div>
      </div>
    </div>
    </div>
  );
}




