import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import "./AddQuestions.css";

function AddQuestions({ id, onClose, onQuestionAdd }) {
  const [questionData, setQuestionData] = useState({
    content: "",
    options: [""],
    answer: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSnackbar = (message, severity = "info") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const addOption = () => {
    setQuestionData({
      ...questionData,
      options: [...questionData.options, ""],
    });
  };

  const deleteOption = (index) => {
    setQuestionData({
      ...questionData,
      options: questionData.options.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!questionData.content.trim()) {
      handleSnackbar("The question cannot be empty.", "warning");
      return;
    }

    if (questionData.options.some((opt) => !opt.trim())) {
      handleSnackbar("All options must be filled.", "warning");
      return;
    }

    if (!questionData.options.includes(questionData.answer)) {
      handleSnackbar("The answer must be one of the options.", "warning");
      return;
    }

    try {
      const response = await fetch(
        `https://c-i-u-backend.onrender.com/exam-paper/${id}/add-question`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(questionData),
        }
      );

      if (!response.ok) throw new Error("Failed to add question.");

      const newQuestion = await response.json();
      onQuestionAdd(newQuestion);
      onClose();
    } catch (error) {
      handleSnackbar(`Error adding question: ${error.message}`, "error");
    }
  };

  return (
    <div className="add-question-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="add-question-label">Question:</label>
          <input
            type="text"
            name="content"
            value={questionData.content}
            onChange={(e) =>
              setQuestionData({ ...questionData, content: e.target.value })
            }
            className="add-question-input"
            placeholder="Enter the question"
          />

          <label className="add-question-label">Options:</label>
          {questionData.options.map((option, index) => (
            <div key={index} className="mt-1 option-container">
              <input
                type="text"
                name={`option_${index}`}
                value={option}
                onChange={(e) => {
                  const updatedOptions = [...questionData.options];
                  updatedOptions[index] = e.target.value;
                  setQuestionData({ ...questionData, options: updatedOptions });
                }}
                className="add-question-option-input"
                placeholder="Enter option"
              />
              <button
                type="button"
                onClick={() => deleteOption(index)}
                data-tooltip="Remove this option"
                className="delete-option-btn"
              >
                &times;
              </button>
            </div>
          ))}

          <div>
            <button type="button" onClick={addOption} className="add-option-button">
              Add Option
            </button>
          </div>

          <div style={{ marginTop: "10px" }}>
            <label className="add-question-label">Answer:</label>
            <input
              type="text"
              name="answer"
              value={questionData.answer}
              onChange={(e) =>
                setQuestionData({ ...questionData, answer: e.target.value })
              }
              className="add-question-input mt-1"
              placeholder="Enter the correct answer"
            />
          </div>
        </div>

        <button type="submit" className="add-question-button mt-3">
          Save
        </button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddQuestions;


