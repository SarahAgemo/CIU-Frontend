import React, { useState, useEffect } from "react";
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
  const { id } = useParams();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const scoresResponse = await axios.get(
          `http://localhost:3000/scores/${id}`
        );
        const scoresData = Array.isArray(scoresResponse.data)
          ? scoresResponse.data
          : [scoresResponse.data];

        const studentsResponse = await axios.get(
          "http://localhost:3000/students"
        );
        const studentsData = studentsResponse.data;

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
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, index) => (
                  <tr key={submission.id || index}>
                    <td>{submission.id}</td>
                    <td>{submission.studentName}</td>
                    <td>{submission.score}</td>
                    <td
                      style={{
                        color: submission.percentage < 50 ? "red" : "black",
                      }}
                    >
                      {submission.percentage !== null &&
                      submission.percentage !== undefined
                        ? `${submission.percentage}%`
                        : ""}
                    </td>

                    <td
                    style={{
                      color: submission.percentage < 50 ? "red" : "#106053",
                    }}
                    >
                      {submission.percentage >= 50 ? "Pass" : "Fail"}</td>
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
