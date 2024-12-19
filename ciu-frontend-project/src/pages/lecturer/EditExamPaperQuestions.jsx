import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from '@mui/material';
import styles from './EditExamPaperQuestions.module.css';

function EditExamPaper({ id, questionId, onClose, onQuestionUpdate }) {
  const [questionData, setQuestionData] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/exam-paper/${id}/question/${questionId}`
        );
        if (!response.ok) throw new Error("Failed to fetch question");
        const data = await response.json();
        setQuestionData(data);
      } catch (error) {
        handleSnackbar("Error fetching question: " + error.message, "error");
      }
    };

    if (id && questionId) {
      fetchQuestionData();
    }
  }, [id, questionId]);

  const handleSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!questionData.options.includes(questionData.answer)) {
      handleSnackbar("The answer must be one of the options.", "warning");
      return;
    }

    try {
      const updatedData = {
        content: questionData.content,
        options: questionData.options,
        answer: questionData.answer,
      };
      const response = await fetch(
        `http://localhost:3000/exam-paper/${id}/question/${questionId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) throw new Error("Failed to update question");
      const updatedQuestion = await response.json();
      onQuestionUpdate(updatedQuestion);
      onClose();
    } catch (error) {
      handleSnackbar("Error updating question: " + error.message, "error");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.label}>Question:</label>
          <input
            type="text"
            name="content"
            value={questionData.content || ""}
            onChange={(e) =>
              setQuestionData({
                ...questionData,
                content: e.target.value,
              })
            }
            className={styles.input}
          />
          <label className={styles.label}>Options:</label>
          {questionData.options &&
            questionData.options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  name={`option_${index}`}
                  value={option || ""}
                  onChange={(e) => {
                    const updatedOptions = [...questionData.options];
                    updatedOptions[index] = e.target.value;
                    setQuestionData({
                      ...questionData,
                      options: updatedOptions,
                    });
                  }}
                  className={styles.optionInput}
                />
              </div>
            ))}
          <label className={styles.label}>Answer:</label>
          <input
            type="text"
            name="answer"
            value={questionData.answer || ""}
            onChange={(e) =>
              setQuestionData({ ...questionData, answer: e.target.value })
            }
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.saveButton}>
          Save Changes
        </button>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EditExamPaper;

