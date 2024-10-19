import React, { useState } from 'react';
import add from './AddQuestionsContent.module.css'; // Use your modular CSS

export default function AddQuestionsContent() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [options, setOptions] = useState([""]);
    const [correctOption, setCorrectOption] = useState(null);

    const addOption = () => setOptions([...options, ""]);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleQuestionChange = (e) => setCurrentQuestion(e.target.value);

    const saveQuestion = () => {
        if (!currentQuestion.trim()) {
            alert("Please enter a question.");
            return;
        }
        if (options.some(option => option.trim() === "")) {
            alert("Please fill in all options.");
            return;
        }
        if (correctOption === null) {
            alert("Please select the correct option.");
            return;
        }

        const newQuestion = {
            question: currentQuestion,
            options: options.map((option, index) => ({
                text: option,
                isCorrect: index === correctOption,
            })),
        };

        setQuestions([...questions, newQuestion]);
        setCurrentQuestion("");
        setOptions([""]);
        setCorrectOption(null);
    };

    const selectCorrectOption = (index) => setCorrectOption(index);

    return (
        <div className={add["form-container"]}>
            <h2 className={add["form-title"]}>Add New Questions</h2>

            <div className={add["form-group"]}>
                <label className={add["label"]}>Question</label>
                <textarea
                    className={add["form-control"]}
                    value={currentQuestion}
                    onChange={handleQuestionChange}
                    placeholder="Enter your question here"
                />
            </div>

            <div className={add["form-group"]}>
                <label className={add["label"]}>Options</label>
                {options.map((option, index) => (
                    <div key={index} className={add["option-container"]}>
                        <div className={add["select-correct"]}>
                            <input
                                type="radio"
                                name="correctOption"
                                className={add["radio-btn"]}
                                checked={correctOption === index}
                                onChange={() => selectCorrectOption(index)}
                            />
                            <label>Select as correct</label>
                        </div>
                        <label>Option {String.fromCharCode(65 + index)}</label>
                        <input
                            type="text"
                            className={add["form-control"]}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${String.fromCharCode(65 + index)}`}
                        />
                    </div>
                ))}
                <button onClick={addOption} className={add["add-option-btn"]}>
                    Add more options
                </button>
            </div>

            <div className={add["form-group"]}>
                <button className={add["btn-primary"]} onClick={saveQuestion}>
                    Save Question
                </button>
                <button className={add["btn-secondary"]}>
                    Review Questions
                </button>
            </div>

            <div className={add["saved-questions"]}>
                {questions.map((q, idx) => (
                    <div key={idx} className={add["saved-question"]}>
                        <h5>Question {idx + 1}: {q.question}</h5>
                        <ul>
                            {q.options.map((option, index) => (
                                <li key={index}>
                                    {String.fromCharCode(65 + index)}. {option.text} {option.isCorrect && "(Correct)"}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
