import { useState, useEffect } from 'react';
import Header from '../../components/admin/Headerpop';
import Sidebar from '../../components/admin/SideBarpop';
import MobileMenu from "../../components/admin/MobileMenu"
import axios from 'axios';
import DashboardCard from '../../components/admin/DashboardCard.jsx';
import AdminDash from './Dashboard.module.css';

export default function Dashboard() {
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

  const [studentCount, setStudentCount] = useState(0);
  const [programCount, setProgramCount] = useState(0);

    useEffect(() => {
    // Function to fetch student count
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/students/count/students');
        setStudentCount(response.data); // Adjust according to your backend response structure
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };

    // Function to fetch program count
    const fetchProgramCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/students/count/programs');
        setProgramCount(response.data.count); // Adjust according to your backend response structure
      } catch (error) {
        console.error("Error fetching program count:", error);
      }
    };

    // Call the functions
    fetchStudentCount();
    fetchProgramCount();
  }, []); // Empty dependency array means this runs once after the first render

  return (
    <div className={AdminDash["overall"]}>
    <div className={AdminDash["dashboard"]}>
      <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
      <div className={AdminDash["dashboard-content"]}>
        {!isMobile && <Sidebar />}
        {isMobile && <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />}
        <main className={AdminDash["main-content"]}>
          <h2 className={AdminDash["dashboard-title"]}>Dashboard</h2>
          <div className={AdminDash["dashboard-cards"]}>
            <DashboardCard title="Registered Students" value={studentCount} icon="🎓" />
            <DashboardCard title="Course groups" value={programCount} icon="📖" />
            {/* You can add more DashboardCards here if needed */}
            <DashboardCard title="Registered Lecturers" value="26" icon="📚" />
            <DashboardCard title="Ongoing Exams/Tests" value="2" icon="📝" />
          </div>
        </main>        
      </div>
    </div>
    </div>
  ); 
}
