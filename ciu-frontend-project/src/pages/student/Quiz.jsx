// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Quiz.css";

// const Quiz = () => {
//   const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordingStartTime, setRecordingStartTime] = useState(0);
//   const navigate = useNavigate();
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const [awayFromCamera, setAwayFromCamera] = useState(false);

//   const questions = [
//     {
//       question:
//         "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet? ",
//     },
//     { question: "What is the economic impact of inflation?" },
//     { question: "How does the balance of trade affect the economy?" },
//     { question: "Explain the fiscal policy mechanisms." },
//     { question: "What are the types of unemployment?" },
//   ];

//   // Timer logic
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => prevTime - 1);
//     }, 1000);

//     const handleTabChange = () => {
//       alert("Warning: You opened a new tab! The quiz will be auto-submitted.");
//       navigate("/submit");
//     };

//     window.addEventListener("blur", handleTabChange);

//     return () => {
//       clearInterval(timer);
//       window.removeEventListener("blur", handleTabChange);
//     };
//   }, [navigate]);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
//   };

//   // Camera & microphone access and recording setup
//   useEffect(() => {
//     const startRecording = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });

//         if (videoRef.current) videoRef.current.srcObject = stream;

//         const mediaRecorder = new MediaRecorder(stream);
//         mediaRecorder.ondataavailable = (event) => {
//           if (event.data.size > 0)
//             setRecordedChunks((prev) => [...prev, event.data]);
//         };
//         mediaRecorder.start();

//         mediaRecorderRef.current = mediaRecorder;
//         setIsRecording(true);
//         setRecordingStartTime(Date.now());

//         // Camera activity monitoring
//         const checkCameraInterval = setInterval(() => {
//           if (stream.getVideoTracks()[0].readyState !== "live") {
//             setAwayFromCamera(true);
//             alert("Please stay in front of the camera!");
//           } else {
//             setAwayFromCamera(false);
//           }
//         }, 5000);

//         return () => clearInterval(checkCameraInterval);
//       } catch (error) {
//         console.error("Error accessing media devices.", error);
//       }
//     };

//     startRecording();

//     return () => {
//       if (mediaRecorderRef.current) {
//         mediaRecorderRef.current.stop();
//         setIsRecording(false);
//       }
//     };
//   }, []);

//   const handleNextQuestion = () =>
//     setQuestionIndex((prevIndex) => prevIndex + 1);

//   const handlePreviousQuestion = () =>
//     setQuestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));

//   const getRecordingDuration = () => {
//     const duration = Math.floor((Date.now() - recordingStartTime) / 1000);
//     return formatTime(duration);
//   };

//   const handleSubmit = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);

//       const blob = new Blob(recordedChunks, { type: "video/webm" });
//       const recordedVideoURL = URL.createObjectURL(blob);

//       localStorage.setItem("recordedVideo", recordedVideoURL);
//       navigate("/submit");
//     }
//   };

//   return (
//     <div className="ExamPage">
//       <div className="ExamTopbar">
//         <p>
//           <strong>Subject:</strong> Macro Economics
//         </p>
//         <p>
//           <strong>Duration:</strong> 1 hour
//         </p>
//         <p>
//           <strong>Time Left:</strong> {formatTime(timeLeft)}
//         </p>
//       </div>

//       <div className="quiz-content">
//         <div className="media-preview">
//           <video
//             ref={videoRef}
//             autoPlay
//             muted
//             className="video-preview"
//           ></video>
//           <div className="recording-status">
//             {isRecording ? (
//               <>
//                 <span
//                   role="img"
//                   aria-label="recording"
//                   style={{ color: "red", fontSize: "0.8em" }}
//                 >
//                   🔴
//                 </span>{" "}
//                 Rec: {getRecordingDuration()}
//                 {awayFromCamera && (
//                   <p style={{ color: "red" }}>
//                     Please stay in front of the camera!
//                   </p>
//                 )}
//               </>
//             ) : (
//               <p>Recording stopped.</p>
//             )}
//           </div>
//         </div>

//         <h2>QUIZ</h2>
//         <p className="question-text">
//           Question {questionIndex + 1}: {questions[questionIndex].question}
//         </p>
//         <form className="set-questions">
//           <input type="checkbox" name="answer" />
//           <span className="option-text">
//             Option A Lorem ipsum dolor sit amet consectetur adipisicing elit.
//             Ullam voluptatum nam itaque commodi doloribus quam facere voluptas a
//             maiores distinctio deleniti harum ad perspiciatis ipsa neque, ipsam
//             beatae quisquam porro.
//           </span>
//           <br />

//           <input type="checkbox" name="answer" />
//           <span className="option-text">
//             Option B Lorem ipsum dolor sit amet consectetur adipisicing elit.
//             Ullam voluptatum nam itaque commodi doloribus quam facere voluptas a
//             maiores distinctio deleniti harum ad perspiciatis ipsa neque, ipsam
//             beatae quisquam porro.
//           </span>
//           <br />
//           <input type="checkbox" name="answer" />
//           <span className="option-text">
//             Option C Lorem ipsum dolor sit amet consectetur adipisicing elit.
//             Ullam voluptatum nam itaque commodi doloribus quam facere voluptas a
//             maiores distinctio deleniti harum ad perspiciatis ipsa neque, ipsam
//             beatae quisquam porro.
//           </span>
//           <br />
//           <input type="checkbox" name="answer" />
//           <span className="option-text">
//             Option D Lorem ipsum dolor sit amet consectetur adipisicing elit.
//             Ullam voluptatum nam itaque commodi doloribus quam facere voluptas a
//             maiores distinctio deleniti harum ad perspiciatis ipsa neque, ipsam
//             beatae quisquam porro.
//           </span>
//           <br />
//         </form>

//         <div className="navigation-buttons">
//           {questionIndex > 0 && (
//             <button
//               className="exam-prev-button"
//               onClick={handlePreviousQuestion}
//             >
//               PREVIOUS
//             </button>
//           )}
//           {questionIndex < questions.length - 1 ? (
//             <button className="exam-next-button" onClick={handleNextQuestion}>
//               NEXT
//             </button>
//           ) : (
//             <button className="exam-submit-button" onClick={handleSubmit}>
//               SUBMIT
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quiz;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import "./Quiz.css"; // Your CSS file

// const Quiz = () => {
//   const { id } = useParams(); // Extract the exam ID from the URL
//   const [examQuestions, setExamQuestions] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({}); // To store user answers
//   const navigate = useNavigate();

//   // Fetch exam questions from backend
//   useEffect(() => {
//     const fetchExamQuestions = async () => {
//       try {
//         const { data } = await axios.get(`http://localhost:3000/exam-paper/${id}/questions-no-answers`);
//         console.log("Fetched Exam Questions:", data);  // Log the fetched data
//         setExamQuestions(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching exam questions:", error);
//         setLoading(false);
//       }
//     };

//     fetchExamQuestions();
//   }, [id]); // Re-run when the exam ID changes

//   // Timer logic
//   useEffect(() => {
//     const timer = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
    
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
//   };

//   const handleAnswerChange = (e) => {
//     setAnswers({ ...answers, [questionIndex]: e.target.value });
//   };

//   const handleNextQuestion = () => {
//     setQuestionIndex((prevIndex) => prevIndex + 1);
//   };

//   const handlePreviousQuestion = () => {
//     setQuestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
//   };

//   const handleSubmit = async () => {
//     // Submit the answers and exam data
//     const submissionData = {
//       answers,
//       examId: id,
//     };

//     try {
//       // Submit answers to the backend (adjust endpoint as needed)
//       await axios.post("http://localhost:3000/exam-submission", submissionData);
//       navigate("/submit");
//     } catch (error) {
//       console.error("Error submitting exam:", error);
//     }
//   };

//   if (loading) {
//     return <div>Loading exam questions...</div>;
//   }

//   // Retrieve the exam title from the fetched data (assuming exam title is part of the data)
//   const examTitle = examQuestions?.examTitle || "Exam"; // Use the dynamic title if available

//   return (
//     <div className="ExamPage">
//       <div className="ExamTopbar">
//         <p><strong>Subject:</strong> {examTitle}</p> {/* Dynamically display exam title */}
//         <p><strong>Duration:</strong> 1 hour</p>
//         <p><strong>Time Left:</strong> {formatTime(timeLeft)}</p>
//       </div>

//       <div className="quiz-content">
//         {examQuestions ? (
//           <>
//             <h2>QUIZ</h2>
//             <p className="question-text">
//               Question {questionIndex + 1}: {examQuestions[questionIndex].questionText}
//             </p>

//             <form className="set-questions">
//               {examQuestions[questionIndex].options.map((option, index) => (
//                 <label key={index} className="option-label">
//                   <input
//                     type="radio"
//                     name={`question-${questionIndex}`}
//                     value={option}
//                     onChange={handleAnswerChange}
//                     checked={answers[questionIndex] === option}
//                   />
//                   <span className="option-text">{option}</span>
//                 </label>
//               ))}
//             </form>

//             <div className="navigation-buttons">
//               {questionIndex > 0 && (
//                 <button className="exam-prev-button" onClick={handlePreviousQuestion}>
//                   PREVIOUS
//                 </button>
//               )}
//               {questionIndex < examQuestions.length - 1 ? (
//                 <button className="exam-next-button" onClick={handleNextQuestion}>
//                   NEXT
//                 </button>
//               ) : (
//                 <button className="exam-submit-button" onClick={handleSubmit}>
//                   SUBMIT
//                 </button>
//               )}
//             </div>
//           </>
//         ) : (
//           <p>No questions available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Quiz.css";

const Quiz = () => {
  const { id } = useParams();
  const [examQuestions, setExamQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamQuestions = async () => {
      try {
        console.log("Fetching exam questions for exam ID:", id); // Log the request being made
        const { data } = await axios.get(`http://localhost:3000/exam-paper/${id}/questions-no-answers`);
        console.log("Fetched Exam Questions:", data);  // Log the fetched data
        setExamQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exam questions:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchExamQuestions();
    } else {
      console.error("No exam ID found in the URL.");
    }
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [questionIndex]: e.target.value });
  };

  const handleNextQuestion = () => {
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setQuestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleSubmit = async () => {
    const submissionData = {
      answers,
      examId: id,
    };

    try {
      await axios.post("http://localhost:3000/exam-submission", submissionData);
      navigate("/submit");
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  if (loading) {
    return <div>Loading exam questions...</div>;
  }

  if (!examQuestions || examQuestions.length === 0) {
    return <p>No questions available for this exam.</p>;
  }

  const examTitle = examQuestions?.examTitle || "Exam"; 

  return (
    <div className="ExamPage">
      <div className="ExamTopbar">
        <p><strong>Subject:</strong> {examTitle}</p>
        <p><strong>Duration:</strong> 1 hour</p>
        <p><strong>Time Left:</strong> {formatTime(timeLeft)}</p>
      </div>

      <div className="quiz-content">
        <h2>QUIZ</h2>
        <p className="question-text">
          Question {questionIndex + 1}: {examQuestions[questionIndex].questionText}
        </p>

        <form className="set-questions">
          {examQuestions[questionIndex].options.map((option, index) => (
            <label key={index} className="option-label">
              <input
                type="radio"
                name={`question-${questionIndex}`}
                value={option}
                onChange={handleAnswerChange}
                checked={answers[questionIndex] === option}
              />
              <span className="option-text">{option}</span>
            </label>
          ))}
        </form>

        <div className="navigation-buttons">
          {questionIndex > 0 && (
            <button className="exam-prev-button" onClick={handlePreviousQuestion}>
              PREVIOUS
            </button>
          )}
          {questionIndex < examQuestions.length - 1 ? (
            <button className="exam-next-button" onClick={handleNextQuestion}>
              NEXT
            </button>
          ) : (
            <button className="exam-submit-button" onClick={handleSubmit}>
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
