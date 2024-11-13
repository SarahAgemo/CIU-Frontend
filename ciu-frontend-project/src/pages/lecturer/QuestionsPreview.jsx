import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./QuestionsPreview.css";
import Header from "../../components/lecturer/HeaderPop";
import Sidebar from "../../components/lecturer/SideBarPop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";
import BackButton from "../../components/lecturer/BackButton";

function QuestionsPreview() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});

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
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/exam-paper/${id}/questions`);
        if (!response.ok) throw new Error("Failed to fetch questions");

        const data = await response.json();
        setQuestions(Array.isArray(data) ? data : []);
      } catch (error) {
        setError("Error fetching questions: " + error.message);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/exam-paper/${id}/question/${questionId}`,
          { method: "DELETE" }
        );
        if (!response.ok) throw new Error("Failed to delete question");

        setQuestions(questions.filter((q) => q.id !== questionId));
      } catch (error) {
        setError("Error deleting question: " + error.message);
      }
    }
  };

  const handleEditQuestion = (questionId) => {
    navigate(`/exam-paper/${id}/question/${questionId}`);
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: selectedOption,
    }));
  };

  return (
    <div className={Dash.lecturerDashboard}>
      <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
      <div className={Dash.dashboard}>
        {!isMobile ? <Sidebar /> : <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />}
        
        <div className={Dash["dashboard-content"]}>
          <div className={Dash.backButtonContainer}>
            <BackButton targetPath={`/exam-paper/${id}`} size={30} color="#106053" />
          </div>
          <div className="questions-preview-container mt-5">
            <h3 className="questions-preview-header">Questions Preview</h3>
            <p className="total-questions">Total Questions: {questions.length}</p>
            {error && <div className="alert alert-danger">{error}</div>}
            {questions.length === 0 && !error ? (
              <div>No questions found.</div>
            ) : (
              questions.map((question) => (
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
                  <div className="question-actions">
                    <button
                      onClick={() => handleEditQuestion(question.id)}
                      className="btn btn-warning me-1 icon-button"
                    >
                      <FaEdit className="icon-edit" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="btn btn-warning me-1 icon-button"
                    >
                      <FaTrash className="icon-trash" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsPreview;
