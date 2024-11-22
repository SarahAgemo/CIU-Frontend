import { useState, useEffect } from 'react';
import Header from '../../components/admin/Headerpop';
import Sidebar from '../../components/admin/SideBarpop';
import MobileMenu from "../../components/admin/MobileMenu"
import ManageLecturers from '../../components/admin/ManageLecturers'
import Manage from './LecturerManagement.module.css'

export default function Lecturers() {
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
        <div className={Manage["overall"]}>
            <div className={Manage["app-main"]}>
            <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
                <div className={Manage["app-container"]}>
                    {!isMobile && <Sidebar />}
                    {isMobile && (
                    <>
                        <div 
                        className={`${AdminDash["overlay"]} ${isMobileMenuOpen ? AdminDash["active"] : ""}`} 
                        onClick={toggleMobileMenu}
                        ></div>
                        <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
                    </>
                    )}
                    <main className={Manage["app-content"]}>
                        <ManageLecturers />
                    </main>
                </div>
            </div>
        </div>
    )
}