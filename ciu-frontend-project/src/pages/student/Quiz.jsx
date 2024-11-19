
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Quiz.css";

const Quiz = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // Default to 1 hour (3600 seconds)
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [examDetails, setExamDetails] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(null);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [awayFromCamera, setAwayFromCamera] = useState(false);

  const examId = localStorage.getItem("exam");
  const userId = localStorage.getItem("user");

  // ** Utilities **
  const navigate = useNavigate();
  const examId = localStorage.getItem("exam");
  const userId = localStorage.getItem("user");

  // ** Fetch Questions **
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/exam-paper/${examId}/questions`);
      setQuestions(response.data);
      console.log("Fetched questions:", response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // ** Fetch Exam Details **
  const fetchExamDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/exam-paper/${examId}`);
      setExamDetails(response.data);

      // Ensure duration is a valid number
      const durationInMinutes = parseInt(response.data.duration, 10) || 60; // Default to 60 minutes if invalid
      setTimeLeft(durationInMinutes * 60); // Convert minutes to seconds
      console.log("Fetched exam details:", response.data);
    } catch (error) {
      console.error("Error fetching exam details:", error);
    }
  };

  // ** Timer Management **
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);  
          handleSubmit(); 
          return 0;  
        }
        return prevTime - 1; 
      });
    }, 1000);

    fetchQuestions();
    fetchExamDetails();

    return () => clearInterval(timer); 
  }, []); 

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "00:00"; 
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

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

  useEffect(() => {
    startRecording();

    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    };
  }, []);

  const getRecordingDuration = () => {
    const duration = Math.floor((Date.now() - recordingStartTime) / 1000);
    return formatTime(duration);
  };

  // ** Question Navigation **
  const handleNextQuestion = () => setQuestionIndex((prevIndex) => prevIndex + 1);
  const handlePreviousQuestion = () => setQuestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));

  // ** Answer Handling **
  const handleAnswerChange = (questionId, option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  // ** Submit Quiz **
  const handleSubmit = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const recordedVideoURL = URL.createObjectURL(blob);
      localStorage.setItem("recordedVideo", recordedVideoURL);

      let calculatedScore = 0;
      questions.forEach((question) => {
        if (selectedAnswers[question.id] === question.answer) {
          calculatedScore += 1;
        }
      });
      setScore(calculatedScore);

      const percentageScore = ((calculatedScore / questions.length) * 100).toFixed(2);
      setPercentage(percentageScore);

      try {
        let parsedUserId;
        try {
          const userObject = JSON.parse(userId);
          parsedUserId = userObject.id;
        } catch {
          parsedUserId = parseInt(userId);
        }

        const scoreData = {
          score: calculatedScore,
          percentage: parseFloat(percentageScore),
          userId: parsedUserId,
          examId: parseInt(examId),
          assessmentType: "add",
        };

        console.log("Sending score data:", scoreData);

        const response = await axios.post("http://localhost:3000/scores", scoreData);

        if (response.status === 200 || response.status === 201) {
          alert(`Your score has been submitted successfully! `);
          navigate("/submit");
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error submitting score:", error);
        alert("Failed to submit score. Please try again or contact support.");
      }
    }
  };

  // ** Handle Tab Change **
  const handleTabChange = () => {
    alert("Warning: You opened a new tab! The quiz will be auto-submitted.");
    navigate("/login");
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

  // ** Render Component **
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
          <strong>Duration:</strong> {examDetails.duration ? `${examDetails.duration} minutes` : "Loading..."}
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
                <span role="img" aria-label="recording" style={{ color: "red", fontSize: "2em" }}>
                  🔴
                </span>
                <span>{getRecordingDuration()}</span>
              </>
            ) : (
              <span>Recording stopped</span>
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
                name={`answer-${questionIndex}`}
                value={option}
                checked={selectedAnswers[questions[questionIndex]?.id] === option}
                onChange={() => handleAnswerChange(questions[questionIndex]?.id, option)}
                required
              />
              {option}
            </label>
          ))}
        </form>

        <div className="navigation-buttons">
          {questionIndex > 0 && (
            <button className="exam-prev-button" onClick={handlePreviousQuestion}>
              PREVIOUS
            </button>
          )}
          {questionIndex < questions.length - 1 && (
            <button className="exam-next-button" onClick={handleNextQuestion}>
              NEXT
            </button>
          )}
        </div>

        {/* {percentage !== null && (
          <div className="result-display">
            <h3>Your Final Score: {score}/{questions.length}</h3>
            <h4>Percentage: {percentage}%</h4>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Quiz;
