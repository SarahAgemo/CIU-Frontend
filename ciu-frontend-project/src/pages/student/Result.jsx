import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Result.module.css";
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

        const [scoresResponse, examsResponse] = await Promise.all([
          axios.get(`https://c-i-u-backend.onrender.com/scores/user/${user.id}`),
          axios.get("https://c-i-u-backend.onrender.com/exam-paper?isDraft=false"),
        ]);

        const scores = scoresResponse.data;
        const examPapersMap = examsResponse.data.reduce((acc, exam) => {
          acc[exam.id] = exam;
          return acc;
        }, {});

        const publishedResults = scores.filter((score) => {
          const examPaper = examPapersMap[score.addAssessmentId];
          return examPaper?.isPublished;
        });

        if (publishedResults.length === 0) {
          setError("Results have not yet been published.");
          setLoading(false);
          return;
        }

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
            // endTime: examPaper?.endTime || "N/A",
          };
        });

        setResults(formattedResults);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch your results");
      } finally {
        setLoading(false);
      }
    };

    fetchResultsAndExams();
  }, []);

  if (loading) {
    return (
      <div className={styles.adminLayout}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={styles.mainContent}>
          {!isMobile && <Sidebar />}
          {isMobile && isMobileMenuOpen && <MobileMenu toggleMenu={toggleMobileMenu} />}
          <div className={styles.resultContent}>
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <div className={styles.loadingText}>Loading your results...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminLayout}>
      <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
      <div className={styles.mainContent}>
        {!isMobile && <Sidebar />}
        {isMobile && isMobileMenuOpen && <MobileMenu toggleMenu={toggleMobileMenu} />}
        <div className={styles.resultContent}>
          <div className={styles.container}>
            <h2 className={styles.heading}>Your Assessment Results</h2>

            {error ? (
              <div className={styles.errorMessage}>{error}</div>
            ) : (
              <div className={styles.tableContainer}>
                {results && results.length > 0 ? (
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Exam Title</th>
                        <th>Course Unit</th>
                        <th>Course Code</th>
                        <th>Score</th>
                        <th>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={result.id || index}>
                          <td>{result.title}</td>
                          <td>{result.courseUnit}</td>
                          <td>{result.courseUnitCode}</td>
                          <td>{result.score}</td>
                          <td className={`${styles.percentage} ${result.percentage >= 50 ? styles.pass : styles.fail
                            }`}>
                            {result.percentage}%
                          </td>
                          {/* <td>View</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className={styles.noResults}>No results found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultComponent;

