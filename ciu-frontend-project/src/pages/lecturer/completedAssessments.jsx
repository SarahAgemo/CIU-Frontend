import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompletedAssessmentsTable() {
  const [completedAssessments, setCompletedAssessments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCompletedAssessments() {
      try {
        const response = await axios.get("http://localhost:3000/exam-paper/completedAssessments");
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

  return (
    <div>
      <h1>Completed Assessments</h1>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
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
              <td>{new Date(assessment.endTime).toLocaleString() || "N/A"}</td>
              <td>
                <button onClick={() => handlePreview(assessment.id)}>Preview</button>
                <button>Publish</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompletedAssessmentsTable;
