import { useState, useEffect } from 'react';
import Header from '../../components/admin/Headerpop.jsx';
import Sidebar from '../../components/admin/SideBarpop.jsx';
import MobileMenu from "../../components/admin/MobileMenu.jsx";
import axios from 'axios';
import DashboardCard from '../../components/admin/DashboardCard.jsx';
import AdminDash from './AdminDashboard.module.css';

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [studentCount, setStudentCount] = useState(0);
  const [programCount, setProgramCount] = useState(0);
  const [lecturerCount, setLecturerCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [courseUnitCount, setCourseUnitCount] = useState(0);
  const [ongoingAssessmentsCount, setOngoingAssessmentsCount] = useState(0);
  const [upcomingAssessmentsCount, setUpcomingAssessmentsCount] = useState(0);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle resizing for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch all counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch student count
        const studentResponse = await axios.get('http://localhost:3000/students/count/students');
        console.log("Student Count Response:", studentResponse.data);
        const studentData = typeof studentResponse.data === "number" 
          ? studentResponse.data 
          : studentResponse.data.count;
        setStudentCount(studentData || 0);

        // Fetch program count
        const programResponse = await axios.get('http://localhost:3000/students/count/programs');
        console.log("Program Count Response:", programResponse.data);
        const programData = typeof programResponse.data === "number" 
          ? programResponse.data 
          : programResponse.data.count;
        setProgramCount(programData || 0);

        // Fetch lecturer count
        const lecturerResponse = await axios.get('http://localhost:3000/lecturerReg/count');
        console.log("Lecturer Count Response:", lecturerResponse.data);
        setLecturerCount(lecturerResponse.data || 0);

        // Fetch course count
        const courseResponse = await axios.get('http://localhost:3000/coursesAdd/count');
        console.log("Course Count Response:", courseResponse.data);
        setCourseCount(courseResponse.data || 0);

        // Fetch course unit count
        const courseUnitResponse = await axios.get('http://localhost:3000/coursesAdd/units/count');
        console.log("Course Unit Count Response:", courseUnitResponse.data);
        setCourseUnitCount(courseUnitResponse.data.count || 0);

        // Fetch ongoing assessments count
        const ongoingResponse = await axios.get('http://localhost:3000/exam-paper/ongoing');
        console.log("Ongoing Assessments Response:", ongoingResponse.data);
        setOngoingAssessmentsCount(ongoingResponse.data || 0);

        // Fetch upcoming assessments count
        const upcomingResponse = await axios.get('http://localhost:3000/exam-paper/upcoming');
        console.log("Upcoming Assessments Response:", upcomingResponse.data);
        setUpcomingAssessmentsCount(upcomingResponse.data || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
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
              <DashboardCard title="Registered Programs" value={programCount} icon="📋" />
              <DashboardCard title="Registered Lecturers" value={lecturerCount} icon="👨‍💻" />
              <DashboardCard title="Registered Courses" value={courseCount} icon="📖" />
              <DashboardCard title="Registered Course Units" value={courseUnitCount} icon="📕" />
              <DashboardCard title="Ongoing Exams/Assessments" value={ongoingAssessmentsCount} icon="📝" />
              <DashboardCard title="Upcoming Exams/Assessments" value={upcomingAssessmentsCount} icon="📅" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
