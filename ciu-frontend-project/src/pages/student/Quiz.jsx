import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import quiz from "./Quiz.module.css";

const Quiz2 = () => {
  const [socket, setSocket] = useState(null);
const mediaStreamRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [examDetails, setExamDetails] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(null);
  const [examState, setExamState] = useState({
    status: 'not_started',
    lastSavedAt: null
  });
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [awayFromCamera, setAwayFromCamera] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const examId = localStorage.getItem("exam");
  const userId = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  // Server communication functions
  const saveProgressToServer = async () => {
    try {
      let parsedUserId;
      try {
        const userObject = JSON.parse(userId);
        parsedUserId = userObject.id;
      } catch {
        parsedUserId = parseInt(userId);
      }

      const progressData = {
        currentQuestion: questionIndex + 1,
        answers: selectedAnswers,
        timeRemaining: timeLeft,
        isCompleted: false,
        status: 'in-progress'
      };
      
      console.log('Saving progress:', progressData);

      await axios.post(
        `http://localhost:3000/exam-progress/${parsedUserId}/${examId}?isManual=false`,
        progressData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const loadProgressFromServer = async () => {
    try {
      let parsedUserId;
      try {
        const userObject = JSON.parse(userId);
        parsedUserId = userObject.id;
      } catch {
        parsedUserId = parseInt(userId);
      }

      console.log('Attempting to load progress for:', { parsedUserId, examId });

      const response = await axios.get(
        `http://localhost:3000/exam-progress/${parsedUserId}/${examId}?isManual=false`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data) {
        console.log('Found saved progress:', response.data);
        
        // Set exam state first
        setExamState({ 
          status: 'in_progress', 
          lastSavedAt: response.data.updatedAt 
        });

        // Set question index and answers
        setQuestionIndex(response.data.currentQuestion - 1);
        setSelectedAnswers(response.data.answers || {});

        // Calculate and set remaining time
        const remainingTime = response.data.timeRemaining;
        if (remainingTime > 0) {
          setTimeLeft(remainingTime);
        } else {
          // If no time remaining, use default duration from exam details
          const durationInSeconds = parseDuration(examDetails.duration);
          setTimeLeft(durationInSeconds);
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error('Error loading progress:', error.response?.data || error);
      return false;
    }
  };

  const completeExamOnServer = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/exam-progress/${userId}/${examId}/complete?isManual=false`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error('Error completing exam on server:', error);
    }
  };

  // Save progress function
  const saveProgress = async () => {
    const progressData = {
      status: 'in_progress',
      questionIndex,
      selectedAnswers,
      timeLeft,
      lastSavedAt: new Date().toISOString(),
      examId,
      userId
    };
    
    localStorage.setItem('examProgress', JSON.stringify(progressData));
    await saveProgressToServer();
    console.log('Progress saved:', progressData);
  };
  // Auto-save effect
  useEffect(() => {
    if (examState.status === 'in_progress') {
      const saveInterval = setInterval(async () => {
        await saveProgress();
      }, 5000); // Save every 5 seconds

      return () => clearInterval(saveInterval);
    }
  }, [questionIndex, selectedAnswers, timeLeft, examState.status]);

  const examQuestion = async () => {
    try {
      console.log('Fetching questions for exam:', examId);
      const response = await axios.get(
        `http://localhost:3000/exam-paper/${examId}/questions`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid question data received');
      }
      
      if (response.data.length === 0) {
        throw new Error('No questions found for this exam');
      }

      setQuestions(response.data);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Question fetch error:', errorMessage);
      throw new Error(`Failed to load exam questions: ${errorMessage}`);
    }
  };

  const parseDuration = (duration) => {
    if (!duration) return 0;
    const [hours, minutes] = duration.split(":").map(Number);
    const totalSeconds = (hours || 0) * 3600 + (minutes || 0) * 60;
    return totalSeconds;
  };

  const fetchExamDetails = async () => {
    try {
      console.log('Fetching exam details for ID:', examId);
      const response = await axios.get(
        `http://localhost:3000/exam-paper/${examId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.data) {
        throw new Error('No exam data received');
      }

      console.log('Exam details received:', response.data);
      setExamDetails(response.data);
      
      const durationInSeconds = parseDuration(response.data.duration);
      if (!isNaN(durationInSeconds) && durationInSeconds > 0) {
        setTimeLeft(durationInSeconds);
      } else {
        console.warn('Invalid duration:', response.data.duration);
        setTimeLeft(3600);
      }
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Exam details fetch error:', errorMessage);
      throw new Error(`Failed to load exam details: ${errorMessage}`);
    }
  };

  // Initialize exam with resume capability
  useEffect(() => {
    const initializeExam = async () => {
      setIsLoading(true);
      try {
        let parsedUserId;
        try {
          const userObject = JSON.parse(userId);
          parsedUserId = userObject.id;
        } catch {
          parsedUserId = parseInt(userId);
        }

        console.log('Starting exam initialization for:', { parsedUserId, examId });

        // First load exam details and questions
        await fetchExamDetails();
        await examQuestion();

        // Then try to load progress
        const hasServerProgress = await loadProgressFromServer();
        
        if (!hasServerProgress) {
          // Check local storage if no server progress
          const savedProgress = localStorage.getItem('examProgress');
          if (savedProgress) {
            const parsed = JSON.parse(savedProgress);
            if (parsed.examId === examId && parsed.userId === userId) {
              console.log('Restoring from local storage:', parsed);
              setQuestionIndex(parsed.questionIndex);
              setSelectedAnswers(parsed.selectedAnswers);
              setTimeLeft(parsed.timeLeft);
              setExamState({ 
                status: 'in_progress', 
                lastSavedAt: parsed.lastSavedAt 
              });
            } else {
              // Start new exam
              setExamState({ status: 'in_progress', lastSavedAt: null });
            }
          } else {
            // No saved progress anywhere, start new
            setExamState({ status: 'in_progress', lastSavedAt: null });
          }
        }

        await startRecording();
      } catch (error) {
        console.error('Initialization error:', error);
        alert(`Error loading exam: ${error.message || 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    };

    initializeExam();
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeLeft === 0) return;

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

    return () => clearInterval(timer);
  }, [timeLeft]);
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "00:00:00";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
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

  const handleNextQuestion = async () => {
    setQuestionIndex((prevIndex) => prevIndex + 1);
    await saveProgress();
  };

  const handlePreviousQuestion = async () => {
    setQuestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    await saveProgress();
  };

  const getRecordingDuration = () => {
    const duration = Math.floor((Date.now() - recordingStartTime) / 1000);
    return formatTime(duration);
  };

  const handleAnswerChange = async (questionId, option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
    await saveProgress();
  };

  const handleSubmit = async () => {
    if (mediaRecorderRef.current) {
      try {
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

        // Submit score
        const response = await axios.post(
          "http://localhost:3000/scores", 
          scoreData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.status === 200 || response.status === 201) {
          // Complete exam on server
          await completeExamOnServer();
          // Clear local storage
          localStorage.removeItem('examProgress');
          setExamState({ status: 'completed', lastSavedAt: null });
          
          alert("Your score has been submitted successfully!");
          navigate("/student");
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error submitting exam:", error);
        alert("Failed to submit exam. Please try again or contact support.");
      }
    }
  };

  const handleTabChange = () => {
    alert("Warning: You opened a new tab! The quiz will be auto-submitted.");
    handleSubmit();
  };

  // Add this useEffect for socket connection and video streaming
  useEffect(() => {
    const newSocket = io('http://localhost:3000/proctor', {
      transports: ['websocket']
    });

    newSocket.emit('join-exam-room', {
      examId,
      studentId: userId,
      role: 'student'
    });

    setSocket(newSocket);

    // Get video stream
  if (videoRef.current && !mediaStreamRef.current) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        mediaStreamRef.current = stream;
        videoRef.current.srcObject = stream;

          // Set up stream sending
          const sendVideoStream = () => {
            if (videoRef.current && mediaStreamRef.current) {
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              canvas.width = videoRef.current.videoWidth;
              canvas.height = videoRef.current.videoHeight;
              
              context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
              const imageData = canvas.toDataURL('image/jpeg', 0.5);
              
              const parsedUserId = typeof userId === 'string' ? JSON.parse(userId).id : userId;
              newSocket.emit('stream-video', {
                examId,
                studentId: parsedUserId,
                stream: imageData
              });
            }
          };

            // Send video frames every 100ms
        const streamInterval = setInterval(sendVideoStream, 100);

        return () => {
          clearInterval(streamInterval);
          stream.getTracks().forEach(track => track.stop());
        };
      })
      .catch(err => console.error('Error accessing webcam:', err));
  }

  return () => {
    if (newSocket) {
      newSocket.disconnect();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };
}, [examId, userId]);
  


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
      {isLoading ? (
        <div className={quiz.loadingContainer}>
          <p>Loading exam...</p>
        </div>
      ) : (
        <>
          {examState.lastSavedAt && (
            <div className={quiz.resumeNotice}>
              <p>You have a saved exam from {new Date(examState.lastSavedAt).toLocaleString()}</p>
              <p>Resuming from question {questionIndex + 1}</p>
            </div>
          )}

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
                    <span className={quiz.progressValue}>
                      {Math.round((Object.keys(selectedAnswers).length / questions.length) * 100)}%
                    </span>
                  </div>
                  <div className={quiz.progressBar}>
                    <div 
                      className={quiz.progressFill} 
                      style={{ 
                        width: `${(Object.keys(selectedAnswers).length / questions.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={quiz.mainContent}>
            <div className={quiz.header}>
              <div className={quiz.recordingIndicator}>
                <span className={`${quiz.recordDot} ${isRecording ? quiz.recording : ''}`}></span>
                REC {isRecording && getRecordingDuration()}
              </div>
              <h1 className={quiz.quizTitle}>QUIZ</h1>
              <div className={quiz.headerRight}>
                <div className={quiz.timer}>
                  Time left: <span className={quiz.timeValue}>{formatTime(timeLeft)}</span>
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
        </>
      )}
    </div>
  );
};

export default Quiz2;