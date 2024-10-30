import { useState, useEffect } from 'react';
import Header from '../../components/student/Headerpop';
import Sidebar from '../../components/student/SideBarpop';
import MobileMenu from "../../components/student/MobileMenu"
import MessageSupport from '../../components/student/MessageSupportpop';
// import Footer from '../../components/student/Footer';
import './MessageSupportPg.css';

function MessageSupp() {
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
        <div className="overall">
        <div className="app">
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className="app-content">
            {!isMobile && <Sidebar />}
            {isMobile && <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />}
            <main className="main-content">
            <MessageSupport />
            </main>
        </div>
        {/* <Footer /> */}
        </div>
        </div>
    );
}

export default MessageSupp;