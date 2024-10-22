// import React, { useState } from 'react';
// import Header from '../../components/lecturer/Header';
// import SideBar from '../../components/lecturer/SideBar';
// import './AddQuestions.module.css'; 

// function AddQuestions() {
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestion, setCurrentQuestion] = useState('');
//     const [options, setOptions] = useState(['']);
//     const [correctOption, setCorrectOption] = useState(null); 

//     // Handle adding new options
//     const addOption = () => {
//         setOptions([...options, '']);
//     };

//     // Handle changing options' text
//     const handleOptionChange = (index, value) => {
//         const newOptions = [...options];
//         newOptions[index] = value;
//         setOptions(newOptions);
//     };

//     // Handle question input change
//     const handleQuestionChange = (e) => {
//         setCurrentQuestion(e.target.value);
//     };

//     // Handle saving the question
//     const saveQuestion = () => {
//         if (!currentQuestion.trim()) {
//             alert('Please enter a question.');
//             return;
//         }
//         if (options.some(option => option.trim() === '')) {
//             alert('Please fill in all options.');
//             return;
//         }
//         if (correctOption === null) {
//             alert('Please select the correct option.');
//             return;
//         }

//         const newQuestion = {
//             question: currentQuestion,
//             options: options.map((option, index) => ({ text: option, isCorrect: index === correctOption })),
//         };
//         setQuestions([...questions, newQuestion]);
//         setCurrentQuestion('');
//         setOptions(['']);
//         setCorrectOption(null);
//     };

    
//     const selectCorrectOption = (index) => {
//         setCorrectOption(index);
//     };

//     return (
//         <div className="layout-container">
//             <Header />  
//             <div className="main-content">
//                 <SideBar />  
//                 <div className="users-content">  
//                     <div className="container mt-5">
//                         <h2>Add New Questions</h2>
//                         <div className="form-group" style={{ marginBottom: '20px' }}>
//                             <label style={{ marginBottom: '8px' }}>Question</label>
//                             <textarea
//                                 className="form-control"
//                                 value={currentQuestion}
//                                 onChange={handleQuestionChange}
//                                 placeholder="Enter your question here"
//                                 style={{
//                                     width: '100%',
//                                     height: '100px',
//                                     padding: '10px',
//                                     borderRadius: '4px',
//                                     border: '1px solid #ccc',
//                                 }}
//                             />
//                         </div>

//                         <div className="form-group" style={{ marginBottom: '20px' }}>
//                             <label style={{ marginBottom: '8px' }}>Options</label>
//                             {options.map((option, index) => (
//                                 <div key={index} className="option-container">
//                                     <div className="select-correct" style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
//                                         <input
//                                             type="radio"
//                                             name="correctOption"
//                                             className="radio-btn"
//                                             checked={correctOption === index}
//                                             onChange={() => selectCorrectOption(index)}
//                                             style={{ marginRight: '10px' }}
//                                         />
//                                         <label style={{ marginRight: '10px' }}>Select as correct</label>
//                                     </div>
//                                     <label>Option {String.fromCharCode(65 + index)}</label> {/* Label sitting on the input */}
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         value={option}
//                                         onChange={(e) => handleOptionChange(index, e.target.value)}
//                                         placeholder={`Option ${String.fromCharCode(65 + index)}`} // A, B, C, D...
//                                     />
//                                 </div>

//                             ))}
//                             <button onClick={addOption} className="btn btn-outline-secondary mt-2">
//                                 Add more options
//                             </button>
//                         </div>

//                         <div className="form-group" style={{ marginBottom: '20px' }}>
//                             <button className="btn btn-primary" onClick={saveQuestion}>
//                                 Save Question
//                             </button>
//                             <button className="btn btn-outline-secondary ml-2">
//                                 Review Questions
//                             </button>
//                         </div>

//                         {/* Display saved questions */}
//                         <div className="saved-questions mt-4">
//                             {questions.map((q, idx) => (
//                                 <div key={idx}>
//                                     <h5>Question {idx + 1}: {q.question}</h5>
//                                     <ul>
//                                         {q.options.map((option, index) => (
//                                             <li key={index}>
//                                                 {String.fromCharCode(65 + index)}. {option.text} {option.isCorrect && "(Correct)"}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddQuestions;


// most recent work 

// import React, { useState } from "react";
// import Header from "../../components/lecturer/Header";
// import SideBar from "../../components/lecturer/SideBar";
// import add from "./AddQuestions.module.css"; // Import modular CSS

// function AddQuestions() {
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestion, setCurrentQuestion] = useState("");
//     const [options, setOptions] = useState([""]);
//     const [correctOption, setCorrectOption] = useState(null);

//     const addOption = () => {
//         setOptions([...options, ""]);
//     };

//     const handleOptionChange = (index, value) => {
//         const newOptions = [...options];
//         newOptions[index] = value;
//         setOptions(newOptions);
//     };

//     const handleQuestionChange = (e) => {
//         setCurrentQuestion(e.target.value);
//     };

//     const saveQuestion = () => {
//         if (!currentQuestion.trim()) {
//             alert("Please enter a question.");
//             return;
//         }
//         if (options.some((option) => option.trim() === "")) {
//             alert("Please fill in all options.");
//             return;
//         }
//         if (correctOption === null) {
//             alert("Please select the correct option.");
//             return;
//         }

//         const newQuestion = {
//             question: currentQuestion,
//             options: options.map((option, index) => ({
//                 text: option,
//                 isCorrect: index === correctOption,
//             })),
//         };

//         setQuestions([...questions, newQuestion]);
//         setCurrentQuestion("");
//         setOptions([""]);
//         setCorrectOption(null);
//     };

//     const selectCorrectOption = (index) => {
//         setCorrectOption(index);
//     };

//     return (
//         <div className={add["layout-container"]}>
//             <Header />
//             <SideBar />
//             <div className={add["form-wrapper"]}>
//                 <div className={add["form-container"]}>
//                     <h2 className={add["form-title"]}>Add New Questions</h2>

//                     <div className={add["form-group"]}>
//                         <label className={add["label"]}>Question</label>
//                         <textarea
//                             className={add["form-control"]}
//                             value={currentQuestion}
//                             onChange={handleQuestionChange}
//                             placeholder="Enter your question here"
//                         />
//                     </div>

//                     <div className={add["form-group"]}>
//                         <label className={add["label"]}>Options</label>
//                         {options.map((option, index) => (
//                             <div key={index} className={add["option-container"]}>
//                                 <div className={add["select-correct"]}>
//                                     <input
//                                         type="radio"
//                                         name="correctOption"
//                                         className={add["radio-btn"]}
//                                         checked={correctOption === index}
//                                         onChange={() => selectCorrectOption(index)}
//                                     />
//                                     <label>Select as correct</label>
//                                 </div>
//                                 <label>Option {String.fromCharCode(65 + index)}</label>
//                                 <input
//                                     type="text"
//                                     className={add["form-control"]}
//                                     value={option}
//                                     onChange={(e) => handleOptionChange(index, e.target.value)}
//                                     placeholder={`Option ${String.fromCharCode(65 + index)}`}
//                                 />
//                             </div>
//                         ))}
//                         <button onClick={addOption} className={add["add-option-btn"]}>
//                             Add more options
//                         </button>
//                     </div>

//                     <div className={add["form-group"]}>
//                         <button className={add["btn-primary"]} onClick={saveQuestion}>
//                             Save Question
//                         </button>
//                         <button className={add["btn-secondary"]}>
//                             Review Questions
//                         </button>
//                     </div>

//                     <div className={add["saved-questions"]}>
//                         {questions.map((q, idx) => (
//                             <div key={idx} className={add["saved-question"]}>
//                                 <h5>Question {idx + 1}: {q.question}</h5>
//                                 <ul>
//                                     {q.options.map((option, index) => (
//                                         <li key={index}>
//                                             {String.fromCharCode(65 + index)}. {option.text} {option.isCorrect && "(Correct)"}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddQuestions;


// new work 
import React from 'react';
import Layout from '../../components/lecturer/Layout';
import AddQuestionsContent from './AddQuestionsContent';

export default function AddQuestions() {
    return (
        <Layout>
            <AddQuestionsContent />
        </Layout>
    );
}
