import { useState, useEffect } from 'react';
import Header from '../../components/student/Headerpop';
import Sidebar from '../../components/student/SideBarpop';
import MobileMenu from "../../components/student/MobileMenu"
import MessageSupport from '../../components/student/MessageSupportpop';
<<<<<<< HEAD
// import Footer from '../../components/student/Footer';
import './MessageSupportPg.css';
=======
import Footer from '../../components/student/Footer';
import SupportPg from './MessageSupportPg.module.css';
>>>>>>> 9572c1028d7401544a1dc1e2e84cff39f812a9ba

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
<<<<<<< HEAD
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
=======
    }

    return (
        <div className={SupportPg["overall"]}>
        <div className={SupportPg["app"]}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
            <div className={SupportPg["app-content"]}>
                {!isMobile && <Sidebar />}
                {isMobile && <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />}
                <div className={SupportPg['main-container']}>
                    <main className={SupportPg["main-content"]}>
                        <MessageSupport />
                    </main>
                    <Footer />
                </div>
            </div>
>>>>>>> 9572c1028d7401544a1dc1e2e84cff39f812a9ba
        </div>
        </div>
    );
}

export default MessageSupp;