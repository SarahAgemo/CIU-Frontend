
// import Layout from '../../components/lecturer/LayoutLecturer';
// import LecturerDashboardContent from './LecturerDashboardContent';

// export default function LecturerDashboard() {
//     return (
//         <Layout>
//             <LecturerDashboardContent />
//         </Layout>
//     );
// }

import { useState, useEffect } from 'react';
import Header from '../../components/lecturer/HeaderPop';
import Sidebar from '../../components/lecturer/SideBarPop';
import MobileMenu from "../../components/lecturer/MobileMenu";
import LecturerDashboardContent from '../../components/lecturer/LecturerDashboardContent';
import Dash from './LecturerDashboard.module.css';

export default function LecturerDashboard() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 991);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className={Dash.lecturerDashboard}>
            <div className={Dash.dashboard}>
                <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
                <div className={Dash['dashboard-content']}>
                    {!isMobile && <Sidebar />}
                    {isMobile && <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />}
                    <LecturerDashboardContent />
                </div>
            </div>
        </div>
    );
}
