import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import quiz from "./Quiz.module.css";

const Quiz2 = () => {
  const [timeLeft, setTimeLeft] = useState(0); 
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

  const examQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/exam-paper/${examId}/questions`);
      setQuestions(response.data);
      console.log("Fetched questions:", response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Parse duration into total seconds
  const parseDuration = (duration) => {
    if (!duration) return 0;

    // Split duration as "hh:mm" or handle as total minutes if single value
    const [hours, minutes] = duration.split(":").map(Number);
    const totalSeconds = (hours || 0) * 3600 + (minutes || 0) * 60;
    return totalSeconds;
  };

  
  const fetchExamDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/exam-paper?isDraft=false");
      const examData = response.data.find((exam) => exam.id === parseInt(examId));
      if (examData) {
        setExamDetails(examData);

        const durationInSeconds = parseDuration(examData.duration); 
        if (!isNaN(durationInSeconds) && durationInSeconds > 0) {
          setTimeLeft(durationInSeconds); 
        } else {
          console.warn("Invalid duration value from the false endpoint.");
          setTimeLeft(3600); 
        }
      } else {
        console.warn("Exam not found in false endpoint data.");
      }
      console.log("Fetched exam details from false endpoint:", examData);
    } catch (error) {
      console.error("Error fetching exam details:", error);
    }
  };

  // Fetch specific exam details (backup or other data)
  const fetchBackupExamDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/exam-paper/${examId}`);
      console.log("Fetched backup exam details:", response.data);
    } catch (error) {
      console.error("Error fetching backup exam details:", error);
    }
  };

  // Timer effect to count down every second
  useEffect(() => {
    if (timeLeft === 0) return; // Don't start the timer if timeLeft is 0

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

    return () => clearInterval(timer); // Cleanup the interval when component unmounts
  }, [timeLeft]);

  useEffect(() => {
    examQuestion();
    fetchExamDetails();
    fetchBackupExamDetails();
  }, []);

  
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "00:00:00";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Start webcam recording
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

      // Check if user is away from the camera
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

  // Handle question navigation
  const handleNextQuestion = () => setQuestionIndex((prevIndex) => prevIndex + 1);
  const handlePreviousQuestion = () => setQuestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));

  // Get recording duration in mm:ss format
  const getRecordingDuration = () => {
    const duration = Math.floor((Date.now() - recordingStartTime) / 1000);
    return formatTime(duration);
  };

  // Handle answer selection
  const handleAnswerChange = (questionId, option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  // Submit the quiz and calculate score
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
          alert("Your score has been submitted successfully!");
          navigate("/student");
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error submitting score:", error);
        alert("Failed to submit score. Please try again or contact support.");
      }
    }
  };


  // Handle visibility change (user switching tabs)
  const handleTabChange = () => {
    alert("Warning: You opened a new tab! The quiz will be auto-submitted.");
    navigate("/student");
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
      <div className={quiz.ExamPage}>
          <div className={quiz.sidebar}>
              <div className={quiz.logoContainer}>
                  <img
                      src="/CIU-exam-system-logo.png"
                      alt="Clarke International University"
                      className={quiz.universityLogo}
                  />
                  <div className={quiz.examInfo}>
                      <div className={quiz.infoRow}>
                          <span className={quiz.infoLabel}>Subject:</span>
                          <span className={quiz.infoValue}>{examDetails.courseUnit || "Loading..."}</span>
                      </div>
                      <div className={quiz.infoRow}>
                          <span className={quiz.infoLabel}>Duration:</span>
                          <span className={quiz.infoValue}>
                              {examDetails.duration ? `${examDetails.duration} Hours` : "Loading..."}
                          </span>
                      </div>
                      <div className={quiz.progressContainer}>
                          <div className={quiz.infoRow}>
                              <span className={quiz.infoLabel}>Progress:</span>
                              <span className={quiz.progressValue}>0%</span>
                          </div>
                          <div className={quiz.progressBar}>
                              <div className={quiz.progressFill} style={{ width: "0%" }}></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    
          <div className={quiz.mainContent}>
              <div className={quiz.header}>
                  <div className={quiz.recordingIndicator}>
                      <span className={quiz.recordDot}></span>
                      REC
                  </div>
                  <h1 className={quiz.quizTitle}>QUIZ</h1>
                  <div className={quiz.headerRight}>
                      <div className={quiz.timer}>
                          Time left: <span className={quiz.timeValue}>{formatTime(timeLeft)}</span>
                      </div>
                      <div className={quiz.userInfo}>
                          <div className={quiz.userAvatar}>
                              <svg viewBox="0 0 24 24" className={quiz.userIcon}>
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                              </svg>
                          </div>
                          <div className={quiz.userDetails}>
                              <span className={quiz.userName}>Cole James</span>
                              <span className={quiz.userRole}>Student</span>
                          </div>
                      </div>
                  </div>
              </div>
    
              <div className={quiz.quizContent}>
                  <div className={quiz.questionCard}>
                      <div className={quiz.questionHeader}>
                          <span className={quiz.questionNumber}>Question {questionIndex + 1}</span>
                          <span className={quiz.questionMarks}>2 marks</span>
                      </div>
                      <div className={quiz.questionText}>
                          {questions[questionIndex]?.content || "Loading question..."}
                      </div>
                      <form className={quiz.optionsContainer}>
                          {questions[questionIndex]?.options.map((option, index) => (
                              <label key={index} className={quiz.optionLabel}>
                                  <input
                                      type="radio"
                                      name={`answer-${questionIndex}`}
                                      value={option}
                                      checked={selectedAnswers[questions[questionIndex]?.id] === option}
                                      onChange={() => handleAnswerChange(questions[questionIndex]?.id, option)}
                                      className={quiz.optionInput}
                                  />
                                  <span className={quiz.optionText}>{option}</span>
                              </label>
                          ))}
                      </form>
                  </div>
    
                  <div className={quiz.navigationButtons}>
                      {questionIndex > 0 && (
                          <button
                              onClick={handlePreviousQuestion}
                              className={`${quiz.navButton} ${quiz.prevButton}`}
                          >
                              Previous
                          </button>
                      )}
                      {questionIndex < questions.length - 1 ? (
                          <button
                              onClick={handleNextQuestion}
                              className={`${quiz.navButton} ${quiz.nextButton}`}
                          >
                              Next
                          </button>
                      ) : (
                          <button
                              onClick={handleSubmit}
                              className={`${quiz.navButton} ${quiz.submitButton}`}
                          >
                              Submit
                          </button>
                      )}
                  </div>
              </div>
    
              <div className={quiz.mediaPreview}>
                  <video ref={videoRef} autoPlay muted className={quiz.videoPreview}></video>
                  <div className={quiz.recordingStatus}>
                      {isRecording ? (
                          <>
                              <span className={quiz.recordIndicator}></span>
                              <span className={quiz.recordTime}>{getRecordingDuration()}</span>
                          </>
                      ) : (
                          <span>Recording stopped</span>
                      )}
                  </div>
              </div>
          </div>
      </div>
    );
    };

export default Quiz2;
