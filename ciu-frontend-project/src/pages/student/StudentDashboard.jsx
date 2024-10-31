import { useState, useEffect } from 'react';
import Header from '../../components/student/Headerpop';
import Sidebar from '../../components/student/SideBarpop';
import MainContent from '../../components/student/MainContent';
import MobileMenu from "../../components/student/MobileMenu"
<<<<<<< HEAD
import DashboardCard from '../../components/student/Dashboard';
=======
>>>>>>> 9572c1028d7401544a1dc1e2e84cff39f812a9ba
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
    <div className={StudDashboard.dashboard}>
      <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
      <div className={StudDashboard['dashboard-content']}>
        {!isMobile && <Sidebar />}
        {isMobile && <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />}
        <MainContent />
      </div>
    </div>
    </div>
  );
}