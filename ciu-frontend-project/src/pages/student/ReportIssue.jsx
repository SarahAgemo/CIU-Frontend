import { useState, useEffect } from 'react';
import Header from '../../components/student/Headerpop';
import Sidebar from '../../components/student/SideBarpop';
import MobileMenu from "../../components/student/MobileMenu"
import MessageSupport from '../../components/student/MessageSupport';
import Repissues from './ReportIssue.module.css'

export default function ReportIssue() {
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
    <div className={Repissues['reportissue-page']}>
    <div className={Repissues['reportissue']}>
      <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
      <div className={Repissues['reportissue-content']}>
        {!isMobile && <Sidebar />}
        {isMobile && <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />}
        <MessageSupport />
      </div>
    </div>
    </div>
  );
}


