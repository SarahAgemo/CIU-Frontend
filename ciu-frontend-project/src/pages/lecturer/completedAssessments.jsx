
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/lecturer/HeaderPop";
import Sidebar from "../../components/lecturer/SideBarPop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";
import { useParams } from "react-router-dom";
import './completedAssessments.css'

function CompletedAssessmentsTable() {
  const [completedAssessments, setCompletedAssessments] = useState([]);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { id } = useParams();
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    async function fetchCompletedAssessments() {
      try {
        const response = await axios.get(
          "http://localhost:3000/exam-paper/completedAssessments"
        );
        setCompletedAssessments(response.data);
      } catch (error) {
        console.error("Error fetching completed assessments:", error);
      }
    }

    fetchCompletedAssessments();
  }, []);

  const handlePreview = (id) => {
    navigate(`/student-results/${id}`);
  };

  const handlePublish = async (id) => {
    try {
      console.log("Publishing results for ID:", id); // Debug log to check `id`
      const response = await axios.patch(`http://localhost:3000/exam-paper/${id}/publishResults`, {
        isPublished: true, // Ensure this matches the backend's expected format
      });
  
      console.log("Response:", response.data); // Debug log to check the server response
  
      // Update the state to reflect the published status
      setCompletedAssessments((prev) =>
        prev.map((assessment) =>
          assessment.id === id
            ? { ...assessment, isPublished: true }
            : assessment
        )
      );
    } catch (error) {
      console.error("Error publishing results:", error);
    }
  };

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
            <div className="users-content">
              <h1 className="completed-textCenter">Completed Assessments</h1>
              <div className="tableContainer">
              
                <table className="customTable">
                  <thead>
                    <tr>
                      <th>Course Unit</th>
                      <th>Title</th>
                      <th>End Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedAssessments.map((assessment, index) => (
                      <tr key={index}>
                        <td>{assessment.courseUnit || "N/A"}</td>
                        <td>{assessment.title || "N/A"}</td>
                        <td>
                          {assessment.endTime
                            ? new Date(assessment.endTime).toLocaleString()
                            : "N/A"}
                        </td>
                        <td>
                          <button
                            className="completed-assessment-preview"
                            onClick={() => handlePreview(assessment.id)}
                          >
                            Preview
                          </button>
                          <button
                            className="completed-assessment-preview"
                            onClick={() => handlePublish(assessment.id)}
                            disabled={assessment.isPublished}
                          >
                            {assessment.isPublished ? "Published" : "Publish"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletedAssessmentsTable;
