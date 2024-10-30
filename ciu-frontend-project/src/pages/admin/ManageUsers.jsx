import { useState, useEffect } from 'react';
import Header from '../../components/admin/Headerpop';
import Sidebar from '../../components/admin/SideBarpop';
import MobileMenu from "../../components/admin/MobileMenu"
import ManagementCard from '../../components/admin/ManagementCard.jsx';
import ManageUser from './ManageUsers.module.css';

export default function ManageUsers() {
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
    <div className={ManageUser["overall"]}>	
    <div className={ManageUser["dashboard"]}>
      <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
      <div className={ManageUser["dashboard-content"]}>
        {!isMobile && <Sidebar />}
        {isMobile && <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />}
        <main className="main-content">
          <h2 className="dashboard-title">Manage Users</h2>
          <div className="management-cards">
            <ManagementCard title="Manage Students" icon="user" link="/table" />
            <ManagementCard title="Manage Lecturers" icon="users" link="/users" />
            <ManagementCard title="Manage Admin" icon="users" link="/adminuser" />
          </div>
        </main>
      </div>
    </div>
    </div>
  );
}
