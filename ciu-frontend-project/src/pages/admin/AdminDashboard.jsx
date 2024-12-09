import { useState, useEffect } from 'react';
import Header from '../../components/admin/Headerpop';
import Sidebar from '../../components/admin/SideBarpop';
import MobileMenu from "../../components/admin/MobileMenu"
import axios from 'axios';
import DashboardCard from '../../components/admin/DashboardCard.jsx';
import AdminDash from './AdminDashboard.module.css';

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
  const [lecturerCount, setLecturerCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [courseUnitCount, setCourseUnitCount] = useState(0);
  const [ongoingAssessmentsCount, setOngoingAssessmentsCount] = useState(0);
  const [upcomingAssessmentsCount, setUpcomingAssessmentsCount] = useState(0);

  useEffect(() => {
    // Function to fetch student count
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get('https://c-i-u-backend.onrender.com/students/count/students');
        console.log("Student Count Response:", response);
        setStudentCount(response.data.count || 0);  // Ensure response is not undefined
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };

    const fetchProgramCount = async () => {
      try {
        const response = await axios.get('https://c-i-u-backend.onrender.com/students/count/programs');
        console.log("Program Count Response:", response);
        setProgramCount(response.data.count || 0);  // Ensure response is not undefined
      } catch (error) {
        console.error("Error fetching program count:", error);
      }
    };

    // Fetch lecturer count
    const fetchLecturerCount = async () => {
      try {
        const response = await axios.get('https://c-i-u-backend.onrender.com/lecturerReg/count');
        setLecturerCount(response.data);
      } catch (error) {
        console.error("Error fetching lecturer count:", error);
      }
    };

    // Fetch course count
    const fetchCourseCount = async () => {
      try {
        const response = await axios.get('https://c-i-u-backend.onrender.com/coursesAdd/count');
        setCourseCount(response.data);
      } catch (error) {
        console.error("Error fetching course count:", error);
      }
    };

    // Fetch course unit count
    const fetchCourseUnitCount = async () => {
      try {
        const response = await axios.get('https://c-i-u-backend.onrender.com/coursesAdd/units/count');
        setCourseUnitCount(response.data.count);
      } catch (error) {
        console.error("Error fetching course unit count:", error);
      }
    };


    // Fetch ongoing assessments count
    const fetchOngoingAssessmentsCount = async () => {
      try {
        const response = await axios.get('https://c-i-u-backend.onrender.com/exam-paper/ongoing');
        setOngoingAssessmentsCount(response.data);
      } catch (error) {
        console.error("Error fetching ongoing assessments count:", error);
      }
    };

    // Fetch upcoming assessments count
    const fetchUpcomingAssessmentsCount = async () => {
      try {
        const response = await axios.get('https://c-i-u-backend.onrender.com/exam-paper/upcoming');
        setUpcomingAssessmentsCount(response.data);
      } catch (error) {
        console.error("Error fetching upcoming assessments count:", error);
      }
    };

    // Call the functions
    fetchLecturerCount();
    fetchCourseCount();
    fetchCourseUnitCount();
    fetchOngoingAssessmentsCount();
    fetchUpcomingAssessmentsCount();
    fetchStudentCount();
    fetchProgramCount();
  }, []);

  return (
    <div className={AdminDash["overall"]}>
      <div className={`${AdminDash["dashboard"]} ${isMobileMenuOpen ? AdminDash["menu-open"] : ""}`}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={AdminDash["dashboard-content"]}>
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
          <main className={`${AdminDash["main-content"]} ${isMobileMenuOpen ? AdminDash["dimmed"] : ""}`}>
            <h2 className={AdminDash["dashboard-title"]}>Dashboard</h2>
            <div className={AdminDash["dashboard-cards"]}>
              <DashboardCard title="Registered Students" value={studentCount} icon="🎓" />
              <DashboardCard title="Registered Lecturers" value={lecturerCount} icon="👨‍💻" />
              <DashboardCard title="Registered Courses" value={courseCount} icon="📖" />
              <DashboardCard title="Registered Course Units" value={courseUnitCount} icon="📖" />
              <DashboardCard title="Ongoing Exams/Assessments" value={ongoingAssessmentsCount} icon="📝" />
              <DashboardCard title="Upcoming Exams/Assessments" value={upcomingAssessmentsCount} icon="📝" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}