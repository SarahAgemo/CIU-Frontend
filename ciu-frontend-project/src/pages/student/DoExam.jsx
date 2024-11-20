import { useState, useEffect } from 'react';
import Header from '../../components/student/Headerpop';
import Sidebar from '../../components/student/SideBarpop';
import DoExamContent from '../../components/student/DoExamContent';
import MobileMenu from "../../components/student/MobileMenu"
import Doexam from './DoExam.module.css';

export default function DoExam() {
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
    <div className={Doexam.doexam}>
    <div className={`${Doexam["dashboard"]} ${isMobileMenuOpen ? Doexam["menu-open"] : ""}`}>
      <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
      <div className={Doexam['dashboard-content']}>
        {!isMobile && <Sidebar />}
        {isMobile && (
          <>
            <div 
              className={`${Doexam["overlay"]} ${isMobileMenuOpen ? Doexam["active"] : ""}`} 
              onClick={toggleMobileMenu}
            ></div>
            <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
          </>
        )}
        <div className={`${Doexam.mainContentWrapper} ${isMobileMenuOpen ? Doexam.dimmed : ''}`}>
        <DoExamContent />
        </div>
      </div>
    </div>
    </div>
  );
}

