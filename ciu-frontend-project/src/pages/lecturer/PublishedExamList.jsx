import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from 'lucide-react';
import Header from "../../components/lecturer/HeaderPop";
import Sidebar from "../../components/lecturer/SideBarPop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import "./PublishedExamList.css";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";
import BackButton from "../../components/lecturer/BackButton";

const PublishedExamList = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [examPapers, setExamPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExams, setFilteredExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const filtered = examPapers.filter(
      (exam) =>
        exam.courseUnit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExams(filtered);
  }, [searchTerm, examPapers]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const fetchPublishedExamPapers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/question-bank/published-assessments"
      );
      if (!response.ok)
        throw new Error("Failed to fetch published exam papers");
      const data = await response.json();
      setExamPapers(data);
      setFilteredExams(data);
    } catch (error) {
      console.error("Error fetching published exam papers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishedExamPapers();
  }, []);

  const handleAddToBank = async (exam) => {
    setLoading(true);
    try {
      const examId = Number(exam.id);
      if (isNaN(examId)) throw new Error("Invalid exam ID");

      const response = await fetch(
        `http://localhost:3000/question-bank?courseUnit=${encodeURIComponent(
          exam.courseUnit
        )}`
      );
      if (!response.ok)
        throw new Error("Failed to check existing question banks");
      const existingBanks = await response.json();

      if (existingBanks.length > 0) {
        const bankId = Number(existingBanks[0].id);
        const addResponse = await fetch(
          `http://localhost:3000/question-bank/${bankId}/questions`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              assessmentId: examId,
              courseUnit: exam.courseUnit,
            }),
          }
        );

        if (!addResponse.ok) {
          const errorData = await addResponse.json();
          throw new Error(
            errorData.message || "Failed to add to existing bank"
          );
        }
      } else {
        const createResponse = await fetch(
          "http://localhost:3000/question-bank",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              assessmentId: examId,
              courseUnit: exam.courseUnit,
              title: `${exam.courseUnit} Question Bank`,
            }),
          }
        );

        if (!createResponse.ok) {
          const errorData = await createResponse.json();
          throw new Error(errorData.message || "Failed to create new bank");
        }
      }

      navigate("/question-bank");
    } catch (error) {
      console.error("Error adding to question bank:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchContainerStyles = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "20px 0",
    marginBottom: "20px",
  };

  const searchButtonStyles = {
    backgroundColor: "#0F533D",
    color: "white",
    padding: "12px 24px",
    border: "none",
    cursor: "pointer",
    minWidth: "200px",
    fontSize: "16px",
    marginLeft: "500px"
  };

  const searchInputStyles = {
    padding: "12px 16px",
    border: "1px solid #ddd",
    borderRadius: "2px",
    fontSize: "16px",
    width: "300px",
    color: "#666",
  };

  if (loading) {
    return (
      <div className="C-spinner-container">
        <div className="C-spinner"></div>
      </div>
    );
  }

  return (
    <div className={Dash.overall}>
      <div className={Dash.dashboard}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={Dash["dashboard-content"]}>
          {!isMobile && <Sidebar />}
          {isMobile && (
            <>
              <div 
                className={`${Dash["overlay"]} ${isMobileMenuOpen ? Dash["active"] : ""}`} 
                onClick={toggleMobileMenu}
              ></div>
              <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
            </>
          )}
          <div className={`${Dash.mainContentWrapper} ${isMobileMenuOpen ? Dash.dimmed : ''}`}>
            <div className={Dash.backButtonContainer}>
              <BackButton targetPath="/exam-management" size={30} color="#106053" />
            </div>

            <div style={searchContainerStyles}>
              <button
                style={searchButtonStyles}
                onClick={() => navigate("/schedule-create-exams/exam-list")}
              >
                Publish New Exam
              </button>
              <input
                type="text"
                placeholder="Search by course unit or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchInputStyles}
              />
            </div>
            <h2 style={{ marginRight: "700px" }}>Published Exams</h2>
            <table className="C-glass-table">
              <thead>
                <tr>
                  <th>CourseUnit</th>
                  <th>Title</th>
                  <th>Instructions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.map((exam) => (
                  <tr key={exam.id}>
                    <td>{exam.courseUnit}</td>
                    <td>{exam.title}</td>
                    <td>{exam.description}</td>
                    <td className="space-x-2">
                      <button
                        className="C-preview-button"
                        onClick={() => navigate(`/exam-paper/${exam.id}`)}
                        disabled={loading}
                      >
                        Preview
                      </button>
                      <button
                        className="C-add-to-bank-button"
                        onClick={() => handleAddToBank(exam)}
                        disabled={loading}
                      >
                        <Plus className="w-4 h-4" />
                        Add to Bank
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
  );
};

export default PublishedExamList;

