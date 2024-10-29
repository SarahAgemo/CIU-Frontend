import React, { useState, useEffect, useRef } from "react";
import "./Proctoring.css";
import { ExamDetails } from "../../components/student/ExamDetails";
import { TbDeviceComputerCamera } from "react-icons/tb";
import { IoExitOutline } from "react-icons/io5";

const Proctoring = () => {
  // States to manage access to video, audio, secure browser, user consent, and exam start eligibility
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [secureBrowser, setSecureBrowser] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [beginExamEnabled, setBeginExamEnabled] = useState(false);
  const [warnings, setWarnings] = useState(0); // Counter for warnings (e.g., not facing camera)

  // Refs for video element and audio stream
  const videoRef = useRef(null); 
  const audioStream = useRef(null); 

  // Handles enabling/disabling the webcam
  const handleWebcamToggle = async () => {
    if (!videoEnabled) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setVideoEnabled(true);
        videoRef.current.srcObject = stream; // Displays the video stream in the video element
      } catch (error) {
        alert("Webcam access is required to proceed.");
      }
    } else {
      // Disable video if already enabled
      setVideoEnabled(false);
      stopWebcam();
      alert("Warning: Webcam has been turned off. Returning to dashboard.");
      window.location.href = "/dashboard";
    }
  };

  // Stops the webcam stream when video is disabled
  const stopWebcam = () => {
    if (videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  // Handles enabling/disabling the microphone
  const handleMicrophoneToggle = async () => {
    if (!audioEnabled) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioEnabled(true);
        audioStream.current = stream; // Store the audio stream for reference
      } catch (error) {
        alert("Microphone access is required to proceed.");
      }
    } else {
      setAudioEnabled(false);
      stopMicrophone();
      alert("Warning: Microphone has been turned off. Returning to dashboard.");
      window.location.href = "/dashboard";
    }
  };

  // Stops the microphone stream when audio is disabled
  const stopMicrophone = () => {
    if (audioStream.current) {
      const tracks = audioStream.current.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  // Toggle secure browser mode
  const handleSecureBrowserToggle = () => {
    setSecureBrowser(!secureBrowser);
  };

  // Toggles user consent
  const handleConsentChange = () => {
    setConsentGiven(!consentGiven);
  };

  // Enables the "Begin Exam" button if all conditions are met
  useEffect(() => {
    if (videoEnabled && audioEnabled && secureBrowser && consentGiven) {
      setBeginExamEnabled(true);
    } else {
      setBeginExamEnabled(false);
    }
  }, [videoEnabled, audioEnabled, secureBrowser, consentGiven]);

  // Handles the "Begin Exam" button functionality
  const handleBeginExam = () => {
    if (beginExamEnabled) {
      // Redirect to the quiz page if eligible
      window.location.href = "/quiz";
    } else {
      alert("Please ensure all conditions are met before starting the exam.");
    }
  };

  // Detects if the user is not facing the camera and generates warnings
  const detectFacePosition = () => {
    // Random simulation for when the user is not facing the camera
    const userNotLookingAtCamera = Math.random() > 0.8;

    if (userNotLookingAtCamera) {
      setWarnings((prevWarnings) => prevWarnings + 1);
      alert(`Warning ${warnings + 1}: Please stay in front of the camera.`);

      // Auto-submit exam if warnings exceed a threshold
      if (warnings + 1 >= 10) {
        alert("Exam auto-submitted due to multiple warnings.");
        window.location.href = "/submit-exam";
      }
    }
  };

  // Sets up an interval to continuously check face position every 5 seconds
  useEffect(() => {
    const faceDetectionInterval = setInterval(() => {
      detectFacePosition();
    }, 5000);

    return () => clearInterval(faceDetectionInterval); // Cleanup on component unmount
  }, [warnings]);

  return (
    <div className="proctoring-overall">
      <div className="examination-details">
        <ExamDetails />
      </div>

      <div className="proctoring">
        <h1>PROCTORING VERIFICATION</h1>

        {/* Video feed container */}
        <div
          className="video-container"
          style={{
            backgroundColor: videoEnabled ? "#ffffff" : "#ebebeb", 
          }}
        >
          {!videoEnabled && <TbDeviceComputerCamera className="video-icon" />}
          <video
            ref={videoRef}
            autoPlay
            style={{
              display: videoEnabled ? "block" : "none",
            }}
          />
        </div>
        <div className="verification-boxes">
          {/* Webcam Activation */}
          <div className="verification-box">
            <input
              type="checkbox"
              id="video"
              checked={videoEnabled}
              onChange={handleWebcamToggle}
            />
            <label htmlFor="video">Allow webcam access</label>
          </div>

          {/* Microphone Activation */}
          <div className="verification-box">
            <input
              type="checkbox"
              id="audio"
              checked={audioEnabled}
              onChange={handleMicrophoneToggle}
            />
            <label htmlFor="audio">Allow audio recording</label>
          </div>

          {/* Secure Browser Confirmation */}
          <div className="verification-box">
            <input
              type="checkbox"
              id="secure-browser"
              checked={secureBrowser}
              onChange={handleSecureBrowserToggle}
            />
            <label htmlFor="secure-browser">Engage Safe Browser</label>
          </div>
        </div>

        {/* Consent Section */}
        <div className="consent-section" style={{ marginTop: "20px" }}>
          <input
            type="checkbox"
            id="consent"
            checked={consentGiven}
            onChange={handleConsentChange}
          />
          <label htmlFor="consent">
            I have read the instructions & consent to the capture of my video
            and audio for remote proctoring purposes.
          </label>
        </div>
        <div className="button-wrapper">
          {/* Begin Exam Button */}
          <button
            className="begin-exam-btn"
            onClick={handleBeginExam}
            disabled={!beginExamEnabled}
            style={{
              marginTop: "20px",
              backgroundColor: beginExamEnabled ? "green" : "#ebebeb",
            }}
          >
            BEGIN EXAM
          </button>

          {/* Exit Button */}
          <button
            className="exit-btn"
            onClick={() => (window.location.href = "/instructions")}
          >
            <IoExitOutline />
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Proctoring;
