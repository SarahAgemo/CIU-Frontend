import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Result.css";
import Header from "../../components/student/Headerpop";
import Sidebar from "../../components/student/SideBarpop";
import MobileMenu from "../../components/student/MobileMenu";

const ResultComponent = ({ toggleMobileMenu, isMobile, isMobileMenuOpen }) => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResultsAndExams = async () => {
      try {
        // Get user data from localStorage
        const userData = localStorage.getItem("user");
        if (!userData) {
          setError("Please log in to view your results");
          setLoading(false);
          return;
        }

        const user = JSON.parse(userData);
        if (!user.id) {
          setError("User ID not found. Please log in again.");
          setLoading(false);
          return;
        }

        // Fetch scores for the user and exam papers
        const [scoresResponse, examsResponse] = await Promise.all([
          axios.get(`http://localhost:3000/scores/user/${user.id}`),
          axios.get("http://localhost:3000/exam-paper?isDraft=false"),
        ]);

        console.log("Scores Response:", scoresResponse.data);
        console.log("Exams Response:", examsResponse.data);

        const scores = scoresResponse.data;
        const examPapersMap = examsResponse.data.reduce((acc, exam) => {
          acc[exam.id] = exam;
          return acc;
        }, {});

        // Filter out unpublished results
        const publishedResults = scores.filter((score) => score.isPublished);

        if (publishedResults.length === 0) {
          setError("Results have not yet been published.");
          setLoading(false);
          return;
        }

        // Combine scores with exam paper details
        const formattedResults = publishedResults.map((score) => {
          const examPaper = examPapersMap[score.addAssessmentId];
          return {
            id: score.id,
            score: score.score,
            percentage: score.percentage,
            assessmentId: score.addAssessmentId,
            courseUnit: examPaper?.courseUnit || "N/A",
            courseUnitCode: examPaper?.courseUnitCode || "N/A",
            title: examPaper?.title || "Untitled Assessment",
            totalMarks: examPaper?.totalMarks || "N/A",
          };
        });

        setResults(formattedResults);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Failed to fetch your results");
      } finally {
        setLoading(false);
      }
    };

    fetchResultsAndExams();
  }, []);

  if (loading) {
    return (
      <div className="admin-layout">
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className="this-content">
          {!isMobile && <Sidebar />}
          {isMobile && isMobileMenuOpen && <MobileMenu toggleMenu={toggleMobileMenu} />}
          <div className="ResultPage">
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <div className="loading-text">Loading your results...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
      <div className="this-content">
        {!isMobile && <Sidebar />}
        {isMobile && isMobileMenuOpen && <MobileMenu toggleMenu={toggleMobileMenu} />}
        <div className="ResultPage">
          <h2>Your Assessment Results</h2>

          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="results-container">
              {results &&
                results.map((result, index) => (
                  <div key={result.id || index} className="result-card">
                    <div className="result-header">
                      <h3>Exam Title: {result.title}</h3>
                    </div>
                    <div className="result-details">
                      <div className="result-item">
                        <strong>Course Unit:</strong>
                        <span>{result.courseUnit}</span>
                      </div>
                      <div className="result-item">
                        <strong>Course Code:</strong>
                        <span>{result.courseUnitCode}</span>
                      </div>
                      <div className="result-item">
                        <strong>Score:</strong>
                        <span>{result.score}</span>
                      </div>
                      <div className="result-item">
                        <strong>Percentage:</strong>
                        <span
                          className={`percentage ${
                            result.percentage >= 50 ? "pass" : "fail"
                          }`}
                        >
                          {result.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

              {results && results.length === 0 && (
                <div className="no-results">No results found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultComponent;
