import { useState, useEffect } from 'react';
import Header from '../../components/admin/Headerpop';
import Sidebar from '../../components/admin/SideBarpop';
import MobileMenu from "../../components/admin/MobileMenu"
import CreateFAQ from '../../components/admin/CreateFAQ';
import FAQ from './CreateFAQPg.module.css';

function Create() {
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
        <div className={FAQ["overall"]}>	
        <div className={`${FAQ["app"]} ${isMobileMenuOpen ? FAQ["menu-open"] : ""}`}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={FAQ["app-content"]}>
            {!isMobile && <Sidebar />}
            {isMobile && (
            <>
                <div 
                className={`${FAQ["overlay"]} ${isMobileMenuOpen ? FAQ["active"] : ""}`} 
                onClick={toggleMobileMenu}
                ></div>
                <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
            </>
            )}
            <main className={`${FAQ.mainContentWrapper} ${isMobileMenuOpen ? FAQ.dimmed : ''}`}>
            <CreateFAQ />
            </main>
        </div>
        </div>
        </div>
    );
}

export default Create;