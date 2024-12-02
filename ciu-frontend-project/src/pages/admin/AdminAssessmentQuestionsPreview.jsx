import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for edit and delete
import "../../pages/lecturer/AssessmentQuestionsPreview.css";
import Header from "../../components/admin/Headerpop";
import Sidebar from "../../components/admin/SideBarpop";
import MobileMenu from "../../components/admin/MobileMenu";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";
import BackButton from "../../components/lecturer/BackButton";

function AdminQuestionsPreview() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("Fetching questions for exam paper ID:", id);
        const response = await fetch(
          `http://localhost:3000/exam-paper/${id}/questions`
        );
        if (!response.ok) throw new Error("Failed to fetch questions");

        const data = await response.json();
        console.log("Fetched questions:", data);

        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Error fetching questions: " + error.message);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: selectedOption,
    }));
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!questions.length) return <div>No questions found.</div>;
  return (
    <div className={Dash.lecturerDashboard}>
      <div className={Dash.dashboard}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={Dash["dashboard-content"]}>
          {!isMobile && <Sidebar />}
          {isMobile && (
            <>
              <div
                className={`${AdminDash["overlay"]} ${
                  isMobileMenuOpen ? AdminDash["active"] : ""
                }`}
                onClick={toggleMobileMenu}
              ></div>
              <MobileMenu
                isOpen={isMobileMenuOpen}
                toggleMenu={toggleMobileMenu}
              />
            </>
          )}
          <div className={Dash.backButtonContainer}>
            <BackButton
              targetPath={`/admin-exam-paper/${id}`}
              size={30}
              color="#106053"
            />
          </div>
          <div className="questions-preview-container mt-5">
            <h3 className="questions-preview-header">Questions Preview</h3>
            <p className="total-questions">
              Total Questions: {questions.length}
            </p>
            {questions.map((question) => (
              <div key={question.id} className="question-card mb-3">
                <div className="question-content">
                  <strong>Q{question.id}: </strong> {question.content}
                </div>
                <form className="question-options">
                  {question.options.map((option, index) => (
                    <div key={index} className="form-check">
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name={`question-${question.id}`}
                        id={`question-${question.id}-option-${index}`}
                        value={option}
                        checked={selectedAnswers[question.id] === option}
                        onChange={() => handleOptionChange(question.id, option)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`question-${question.id}-option-${index}`}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </form>
                <div className="question-answer">
                  <strong>Correct Answer:</strong> {question.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminQuestionsPreview;
