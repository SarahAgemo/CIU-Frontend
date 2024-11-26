import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompletedAssessmentsTable() {
  const [completedAssessments, setCompletedAssessments] = useState([]);
  const navigate = useNavigate();

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
      const response = await axios.patch(`http://localhost:3000/scores/${id}/publishResults`, {
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
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Response Status:", error.response.status);
      } else {
        console.error("Error Message:", error.message);
      }
    }
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
              <td>
                {assessment.endTime
                  ? new Date(assessment.endTime).toLocaleString()
                  : "N/A"}
              </td>
              <td>
                <button onClick={() => handlePreview(assessment.id)}>
                  Preview
                </button>
                <button
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
  );
}

export default CompletedAssessmentsTable;
