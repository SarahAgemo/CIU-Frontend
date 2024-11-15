// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Quiz.css";

// const Quiz = () => {
//   const { id } = useParams();
//   const [examQuestions, setExamQuestions] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordingStartTime, setRecordingStartTime] = useState(0);
//   const [questions, setQuestions] = useState([]);
//   const [examDetails, setExamDetails] = useState({});
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [score, setScore] = useState(0); // Score state for autograding
//   const [percentage, setPercentage] = useState(null); // Store the percentage score
//   const navigate = useNavigate();
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const [awayFromCamera, setAwayFromCamera] = useState(false);

//   const examId = localStorage.getItem('exam');
//   const userId = localStorage.getItem('user'); // Assuming user ID is stored in local storage

//   const examQuestion = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/exam-paper/${examId}/questions`);
//       setQuestions(response.data);
//       console.log("Fetched questions:", response.data);
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//     }
//   };

//   const fetchExamDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/exam-paper/${examId}`);
//       setExamDetails(response.data);
//       setTimeLeft(response.data.duration * 60);
//       console.log("Fetched exam details:", response.data);
//     } catch (error) {
//       console.error("Error fetching exam details:", error);
//     }
//   };

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => prevTime - 1);
//     }, 1000);

//     examQuestion();
//     fetchExamDetails();

//     return () => clearInterval(timer);
//   }, [navigate]);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
//   };

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
//           if (event.data.size > 0) setRecordedChunks((prev) => [...prev, event.data]);
//         };
//         mediaRecorder.start();

//         mediaRecorderRef.current = mediaRecorder;
//         setIsRecording(true);
//         setRecordingStartTime(Date.now());

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

//   const handleNextQuestion = () => setQuestionIndex((prevIndex) => prevIndex + 1);

//   const handlePreviousQuestion = () => setQuestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));

//   const getRecordingDuration = () => {
//     const duration = Math.floor((Date.now() - recordingStartTime) / 1000);
//     return formatTime(duration);
//   };

//   const handleAnswerChange = (questionId, option) => {
//     setSelectedAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionId]: option,
//     }));
//   };

//   const handleSubmit = async () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);

//       const blob = new Blob(recordedChunks, { type: "video/webm" });
//       const recordedVideoURL = URL.createObjectURL(blob);
//       localStorage.setItem("recordedVideo", recordedVideoURL);

//       // Auto-grading with the correct answers from backend
//       let calculatedScore = 0;
//       questions.forEach((question) => {
//         if (selectedAnswers[question.id] === question.answer) { // assuming `question.answer` is the correct answer
//           calculatedScore += 1;
//         }
//       });
//       setScore(calculatedScore);

//       // Calculate percentage score
//       const percentageScore = ((calculatedScore / questions.length) * 100).toFixed(2);
//       setPercentage(percentageScore);

//       // Send score and percentage to backend
//       try {
//         await axios.post("http://localhost:3000/scores/submit", {
//           examId: parseInt(examId),
//           userId: parseInt(userId),
//           score: calculatedScore,
//           percentage: parseFloat(percentageScore),
//         });
//         alert(`Your score is: ${calculatedScore}/${questions.length} (${percentageScore}%)`);
//       } catch (error) {
//         console.error("Error submitting score:", error);
//         alert("Failed to submit score to the server.");
//       }

//       navigate("/submit");
//     } catch (error) {
//       console.error("Error submitting exam:", error);
//     }
//   };

//   const handleTabChange = () => {
//     alert("Warning: You opened a new tab! The quiz will be auto-submitted.");
//     navigate("/submit");
//   };

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         handleTabChange();
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, []);

//   return (
//     <div className="ExamPage">
//       <div className="ExamTopbar">
//         <p>
//           <strong>Subject:</strong> {examDetails.subject || "Loading..."}
//         </p>
//         <p>
//           <strong>Description:</strong> {examDetails.description || "Loading..."}
//         </p>
//         <p>
//           <strong>Duration:</strong> {examDetails.duration || "Loading..."} minutes
//         </p>
//         <p>
//           <strong>Time Left:</strong> {formatTime(timeLeft)}
//         </p>
//       </div>

//       <div className="quiz-content">
//         <div className="media-preview">
//           <video ref={videoRef} autoPlay muted className="video-preview"></video>
//           <div className="recording-status">
//             {isRecording ? (
//               <>
//                 <span role="img" aria-label="recording" style={{ color: "red", fontSize: "0.8em" }}>
//                   🔴
//                 </span>
//                 Rec: {getRecordingDuration()}
//                 {awayFromCamera && <p style={{ color: "red" }}>Please stay in front of the camera!</p>}
//               </>
//             ) : (
//               <p>Recording stopped.</p>
//             )}
//           </div>
//         </div>

//         <h2>QUIZ</h2>
//         <p className="question-text">
//           Question {questionIndex + 1}: {questions[questionIndex]?.content}
//         </p>
//         <form>
//           {questions[questionIndex]?.options.map((option, index) => (
//             <label className="form-check-label" key={index}>
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name={`answer-${questionIndex}`}
//                 value={option}
//                 checked={selectedAnswers[questions[questionIndex]?.id] === option}
//                 onChange={() => handleAnswerChange(questions[questionIndex]?.id, option)}
//                 required
//               />
//               {option}
//             </label>
//           ))}
//         </form>
//         <div className="navigation-buttons">
//           {questionIndex > 0 && (
//             <button className="exam-prev-button" onClick={handlePreviousQuestion}>
//               PREVIOUS
//             </button>
//           )}
//           {questionIndex < examQuestions.length - 1 ? (
//             <button className="exam-next-button" onClick={handleNextQuestion}>
//               NEXT
//             </button>
//           ) : (
//             <button className="exam-submit-button" onClick={handleSubmit}>
//               SUBMIT
//             </button>
//           )}
//         </div>

//         {/* Display score and percentage if quiz is completed */}
//         {percentage !== null && (
//           <div className="result-display">
//             <h3>Your Final Score: {score}/{questions.length}</h3>
//             <h4>Percentage: {percentage}%</h4>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Quiz.css";

const Quiz = () => {
  const { id } = useParams();
  const [examQuestions, setExamQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [examDetails, setExamDetails] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0); // Score state for autograding
  const [percentage, setPercentage] = useState(null); // Store the percentage score
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [awayFromCamera, setAwayFromCamera] = useState(false);

  const examId = localStorage.getItem('exam');
  const userId = localStorage.getItem('user'); // Assuming user ID is stored in local storage

  const examQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/exam-paper/${examId}/questions`);
      setQuestions(response.data);
      console.log("Fetched questions:", response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchExamDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/exam-paper/${examId}`);
      setExamDetails(response.data);
      setTimeLeft(response.data.duration * 60);
      console.log("Fetched exam details:", response.data);
    } catch (error) {
      console.error("Error fetching exam details:", error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    examQuestion();
    fetchExamDetails();

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) videoRef.current.srcObject = stream;

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) setRecordedChunks((prev) => [...prev, event.data]);
        };
        mediaRecorder.start();

        mediaRecorderRef.current = mediaRecorder;
        setIsRecording(true);
        setRecordingStartTime(Date.now());

        const checkCameraInterval = setInterval(() => {
          if (stream.getVideoTracks()[0].readyState !== "live") {
            setAwayFromCamera(true);
            alert("Please stay in front of the camera!");
          } else {
            setAwayFromCamera(false);
          }
        }, 5000);

        return () => clearInterval(checkCameraInterval);
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    startRecording();

    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    };
  }, []);

  const handleNextQuestion = () => setQuestionIndex((prevIndex) => prevIndex + 1);

  const handlePreviousQuestion = () => setQuestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));

  const getRecordingDuration = () => {
    const duration = Math.floor((Date.now() - recordingStartTime) / 1000);
    return formatTime(duration);
  };

  const handleAnswerChange = (questionId, option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);

        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const recordedVideoURL = URL.createObjectURL(blob);
        localStorage.setItem("recordedVideo", recordedVideoURL);

        // Auto-grading with the correct answers from backend
        let calculatedScore = 0;
        questions.forEach((question) => {
          if (selectedAnswers[question.id] === question.answer) { // assuming `question.answer` is the correct answer
            calculatedScore += 1;
          }
        });
        setScore(calculatedScore);

        // Calculate percentage score
        const percentageScore = ((calculatedScore / questions.length) * 100).toFixed(2);
        setPercentage(percentageScore);

      try {
        // Parse userId if it's coming as a JSON string
        const parsedUserId = typeof userId === 'string' ? JSON.parse(userId) : userId;
      
        console.log("Sending data:", {
          examId: parseInt(examId),
          userId: parseInt(parsedUserId.id), // Extract the `id` from userId
          score: calculatedScore,
          percentage: parseFloat(percentageScore),
          isManualAssessment: false, // Adjust this based on your logic
        });
      
        await axios.post("http://localhost:3000/scores/add", {
          examId: parseInt(examId),
          userId: parseInt(parsedUserId.id), // Use only the ID
          score: calculatedScore,
          percentage: parseFloat(percentageScore),
          isManualAssessment: false,
        });
      
        alert(`Your score is: ${calculatedScore}/${questions.length} (${percentageScore}%)`);
      } catch (error) {
        console.error("Error submitting score:", error);
        alert("Failed to submit score to the server.");
      }
      

        navigate("/submit");
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  const handleTabChange = () => {
    alert("Warning: You opened a new tab! The quiz will be auto-submitted.");
    navigate("/submit");
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleTabChange();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="ExamPage">
      <div className="ExamTopbar">
        <p>
          <strong>Subject:</strong> {examDetails.subject || "Loading..."}
        </p>
        <p>
          <strong>Description:</strong> {examDetails.description || "Loading..."}
        </p>
        <p>
          <strong>Duration:</strong> {examDetails.duration || "Loading..."} minutes
        </p>
        <p>
          <strong>Time Left:</strong> {formatTime(timeLeft)}
        </p>
      </div>

      <div className="quiz-content">
        <div className="media-preview">
          <video ref={videoRef} autoPlay muted className="video-preview"></video>
          <div className="recording-status">
            {isRecording ? (
              <>
                <span role="img" aria-label="recording" style={{ color: "red", fontSize: "0.8em" }}>
                  🔴
                </span>
                Rec: {getRecordingDuration()}
                {awayFromCamera && <p style={{ color: "red" }}>Please stay in front of the camera!</p>}
              </>
            ) : (
              <p>Recording stopped.</p>
            )}
          </div>
        </div>

        <h2>QUIZ</h2>
        <p className="question-text">
          Question {questionIndex + 1}: {questions[questionIndex]?.content}
        </p>
        <form>
          {questions[questionIndex]?.options.map((option, index) => (
            <label className="form-check-label" key={index}>
              <input
                className="form-check-input"
                type="radio"
                name={`question${questions[questionIndex].id}`}
                value={option}
                checked={selectedAnswers[questions[questionIndex].id] === option}
                onChange={() => handleAnswerChange(questions[questionIndex].id, option)}
              />
              {option}
            </label>
          ))}
        </form>

        <div className="navigation-buttons">
          <button onClick={handlePreviousQuestion}>Previous</button>
          <button onClick={handleNextQuestion}>Next</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>

        {percentage && (
          <div className="score-summary">
            <p>Your score: {score}/{questions.length}</p>
            <p>Percentage: {percentage}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
