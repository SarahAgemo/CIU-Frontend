import { useState, useEffect } from 'react';
import Header from '../../components/student/Headerpop';
import Sidebar from '../../components/student/SideBarpop';
import MobileMenu from "../../components/student/MobileMenu"
import MessageSupport from '../../components/student/MessageSupportpop';
import Footer from '../../components/student/Footer';
import SupportPg from './MessageSupportPg.module.css';

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
        <div className={SupportPg["overall"]}>
        <div className={`${SupportPg["app"]} ${isMobileMenuOpen ? SupportPg["menu-open"] : ""}`}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
            <div className={SupportPg["app-content"]}>
                {!isMobile && <Sidebar />}
                {isMobile && (
                <>
                    <div 
                    className={`${SupportPg["overlay"]} ${isMobileMenuOpen ? SupportPg["active"] : ""}`} 
                    onClick={toggleMobileMenu}
                    ></div>
                    <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
                </>
                )}
                <div className={SupportPg['main-container']}>
                    <main className={`${SupportPg.mainContentWrapper} ${isMobileMenuOpen ? SupportPg.dimmed : ''}`}>
                        <MessageSupport />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
        </div>
    );
}

export default MessageSupp;