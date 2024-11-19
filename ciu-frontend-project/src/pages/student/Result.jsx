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
    const fetchResults = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          setError("No user data found. Please log in.");
          setLoading(false);
          return;
        }

        const user = JSON.parse(userData);
        console.log("User data:", user);

        if (!user?.id) {
          setError("Invalid user data. Please log in again.");
          setLoading(false);
          return;
        }

        // Fetch user's scores
        const scoresResponse = await axios.get(`http://localhost:3000/scores?userId=${user.id}`);
        const scores = scoresResponse.data;
        console.log("Scores data:", scores);

        if (!scores || scores.length === 0) {
          setError("No scores found for this student.");
          setLoading(false);
          return;
        }

        // Get the latest score (assuming the last score is the most recent)
        const latestScore = scores[scores.length - 1];

        // Fetch the assessment details for the latest score
        if (latestScore.addAssessmentId) {
          const assessmentResponse = await axios.get(
            `http://localhost:3000/exam-paper/${latestScore.addAssessmentId}`
          );
          const assessment = assessmentResponse.data;
          console.log("Fetched assessment:", assessment);

          const resultDetails = {
            id: latestScore.id,
            examId: latestScore.addAssessmentId,
            courseUnit: assessment.courseUnit,
            courseUnitCode: assessment.courseUnitCode,
         title: assessment.title,
            score: latestScore.score,
            percentage: latestScore.percentage,
          };

          setResults([resultDetails]); // Wrap in array to maintain compatibility with map
        } else {
          setError("No assessment details found.");
        }
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to fetch results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="admin-layout">
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className="this-content">
          {!isMobile && <Sidebar />}
          {isMobile && isMobileMenuOpen && <MobileMenu toggleMenu={toggleMobileMenu} />}
          <div className="ResultPage">
            <h2>Loading results...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-layout">
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className="this-content">
          {!isMobile && <Sidebar />}
          {isMobile && isMobileMenuOpen && <MobileMenu toggleMenu={toggleMobileMenu} />}
          <div className="ResultPage">
            <h2>{error}</h2>
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
          <h2>Quiz Results</h2>
          <div className="single-result-container">
            {results && results[0] && (
              <div className="result-card">
                <h3> {results[0].title || 'Untitled Assessment'}</h3>
                <p>
                  <strong>Course Unit:</strong>{" "}
                  {results[0].courseUnit || 'Not specified'}
                </p>
                <p>
                  <strong>Course Code:</strong>{" "}
                  {results[0].courseUnitCode || 'Not specified'}
                </p>
                <p>
                  <strong>Score:</strong>{" "}
                  {results[0].score !== undefined ? results[0].score : "N/A"}
                </p>
                <p>
                  <strong>Percentage:</strong>{" "}
                  {results[0].percentage !== undefined ? `${results[0].percentage}%` : "N/A"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultComponent;