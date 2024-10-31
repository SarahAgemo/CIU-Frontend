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
    <div className={Suppage["support"]}>
      <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
      <div className={Suppage["support-content"]}>
        {!isMobile && <Sidebar />}
        {isMobile && <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />}
<<<<<<< HEAD
        <SupportContent />
=======
        <div className={Suppage['main-container']}>
          <main className="main-content">
            <SupportContent />
          </main>
          <Footer />
        </div>
>>>>>>> 9572c1028d7401544a1dc1e2e84cff39f812a9ba
      </div>
    </div>
    </div>
  );
}