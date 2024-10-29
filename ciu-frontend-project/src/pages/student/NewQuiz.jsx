import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const Quiz = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState(0);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [awayFromCamera, setAwayFromCamera] = useState(false);

  const questions = [
    { question: "Lorem ipsum dolor sit amet?" },
    { question: "What is the economic impact of inflation?" },
    { question: "How does the balance of trade affect the economy?" },
    { question: "Explain the fiscal policy mechanisms." },
    { question: "What are the types of unemployment?" },
  ];

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    const handleTabChange = () => {
      alert("Warning: You opened a new tab! The quiz will be auto-submitted.");
      navigate("/submit");
    };

    window.addEventListener("blur", handleTabChange);

    return () => {
      clearInterval(timer);
      window.removeEventListener("blur", handleTabChange);
    };
  }, [navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Camera & microphone access and recording setup
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

        // Camera activity monitoring
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

  const handleSubmit = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const recordedVideoURL = URL.createObjectURL(blob);

      localStorage.setItem("recordedVideo", recordedVideoURL);
      navigate("/submit");
    }
  };

  return (
    <div className="ExamPage">
      <div className="ExamTopbar">
        <p>
          <strong>Subject:</strong> Macro Economics
        </p>
        <p>
          <strong>Duration:</strong> 1 hour
        </p>
        <p>
          <strong>Time Left:</strong> {formatTime(timeLeft)}
        </p>
      </div>

      <div className="quiz-content">
        <h2>QUIZ</h2>
        <p className="question-text">
          Question {questionIndex + 1}: {questions[questionIndex].question}
        </p>
        <form>
          <input type="checkbox" name="answer" />
          <span className="option-text">Option A</span>
          <br />
          <input type="checkbox" name="answer" />
          <span className="option-text">Option B</span>
          <br />
          <input type="checkbox" name="answer" />
          <span className="option-text">Option C</span>
          <br />
          <input type="checkbox" name="answer" />
          <span className="option-text">Option D</span>
          <br />
        </form>

        <div className="navigation-buttons">
          {questionIndex > 0 && (
            <button className="exam-prev-button" onClick={handlePreviousQuestion}>
              PREVIOUS
            </button>
          )}
          {questionIndex < questions.length - 1 ? (
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

      <div className="media-preview" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "20px" }}>
        <h3>Recording Video and Audio</h3>
        <video ref={videoRef} autoPlay muted className="video-preview" style={{ width: "150px", marginBottom: "10px" }}></video>
        <div className="recording-status">
          {isRecording ? (
            <>
              <span role="img" aria-label="recording" style={{ color: "red", fontSize: "1.5em" }}>🔴</span> Recording...
              <p>Time Recorded: {getRecordingDuration()}</p>
              {awayFromCamera && <p style={{ color: "red" }}>Please stay in front of the camera!</p>}
            </>
          ) : (
            <p>Recording stopped.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
