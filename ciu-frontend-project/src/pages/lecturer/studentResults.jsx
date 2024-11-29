import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/lecturer/HeaderPop";
import Sidebar from "../../components/lecturer/SideBarPop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";
import { useParams } from "react-router-dom";


function ResultsTable({ assessmentId }) {
  const [submissions, setSubmissions] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {id} = useParams() ;


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  


  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch scores
        const scoresResponse = await axios.get(`http://localhost:3000/scores/${id}`);
        const scoresData = Array.isArray(scoresResponse.data)
          ? scoresResponse.data
          : [scoresResponse.data];

        // Fetch students
        const studentsResponse = await axios.get(
          "http://localhost:3000/students"
        );
        const studentsData = studentsResponse.data;

        // Combine scores with students using userId
        const combinedData = scoresData.map((score) => {
          const student = studentsData.find(
            (student) => student.id === score.userId
          );
          return {
            ...score,
            studentName: student
              ? `${student.first_name} ${student.last_name}`
              : "Unknown",
          };
        });

        setSubmissions(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [assessmentId]);

  return (
    <div className={Dash.overall}>
      <div className={Dash.dashboard}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={Dash["dashboard-content"]}>
          {!isMobile && <Sidebar />}
          {isMobile && (
            <MobileMenu
              isOpen={isMobileMenuOpen}
              toggleMenu={toggleMobileMenu}
            />
          )}
          <div>
            <h1>Assessment Results</h1>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Student Name</th>
                  <th>Score</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, index) => (
                  <tr key={submission.id || index}>
                    <td>{submission.id}</td>
                    <td>{submission.studentName}</td>
                    <td>{submission.score || "N/A"}</td>
                    <td>
                      {submission.percentage
                        ? `${submission.percentage}%`
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResultsTable;
