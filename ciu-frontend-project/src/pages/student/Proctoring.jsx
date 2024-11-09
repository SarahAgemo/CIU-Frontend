import React, { useState, useEffect, useRef } from "react";
import proct from "./Proctoring.module.css";
import { ExamDetails } from "../../components/student/ExamDetails";
import { TbDeviceComputerCamera } from "react-icons/tb";
import { IoExitOutline } from "react-icons/io5";
const Proctoring = () => {
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [secureBrowser, setSecureBrowser] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [beginExamEnabled, setBeginExamEnabled] = useState(false);
  const [warnings, setWarnings] = useState(0);

  const videoRef = useRef(null); // Reference for video element
  const audioStream = useRef(null); // Audio stream reference

  // Logic for webcam activation and showing the feed
  const handleWebcamToggle = async () => {
    if (!videoEnabled) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setVideoEnabled(true);
        videoRef.current.srcObject = stream; // Show video stream in video element
      } catch (error) {
        alert("Webcam access is required to proceed.");
      }
    } else {
      setVideoEnabled(false);
      stopWebcam();
      alert("Warning: Webcam has been turned off. Returning to dashboard.");
      window.location.href = "/dashboard";
    }
  };

  // Stop the webcam stream
  const stopWebcam = () => {
    if (videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  // Logic for microphone activation
  const handleMicrophoneToggle = async () => {
    if (!audioEnabled) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setAudioEnabled(true);
        audioStream.current = stream; // Store the audio stream reference
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

  // Stop the microphone stream
  const stopMicrophone = () => {
    if (audioStream.current) {
      const tracks = audioStream.current.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  // Function to handle the secure browser toggle
  const handleSecureBrowserToggle = () => {
    setSecureBrowser(!secureBrowser);
  };

  // Consent checkbox logic
  const handleConsentChange = () => {
    setConsentGiven(!consentGiven);
  };

  // Function to enable the Begin Exam button
  useEffect(() => {
    if (videoEnabled && audioEnabled && secureBrowser && consentGiven) {
      setBeginExamEnabled(true);
    } else {
      setBeginExamEnabled(false);
    }
  }, [videoEnabled, audioEnabled, secureBrowser, consentGiven]);

  // Handle Begin Exam action
  const handleBeginExam = () => {
    if (beginExamEnabled) {
      // Redirect to the quiz page
      window.location.href = "/quiz";
    } else {
      alert("Please ensure all conditions are met before starting the exam.");
    }
  };

  // Logic for detecting face position and generating warnings
  const detectFacePosition = () => {
    // Random simulation for head not facing the camera
    const userNotLookingAtCamera = Math.random() > 0.8;

    if (userNotLookingAtCamera) {
      setWarnings((prevWarnings) => prevWarnings + 1);
      alert(`Warning ${warnings + 1}: Please stay in front of the camera.`);

      // Auto-submit exam after two warnings
      if (warnings + 1 >= 10) {
        alert("Exam auto-submitted due to multiple warnings.");
        window.location.href = "/submit-exam"; // Redirect after auto-submission
      }
    }
  };

  // Effect to simulate continuous face detection every 5 seconds
  useEffect(() => {
    const faceDetectionInterval = setInterval(() => {
      detectFacePosition();
    }, 5000); // Check every 5 seconds

    return () => clearInterval(faceDetectionInterval); // Clean up interval on component unmount
  }, [warnings]);

  return (
    <div className={proct["proctoring-overall"]}>
      <div className={proct["examination-details"]}>
        <ExamDetails />
      </div>

      <div className={proct["proctoring"]}>
        <h1>PROCTORING VERIFICATION</h1>

        {/* Video stream should appear immediately after the heading */}
        <div
          className={proct["video-container"]}
          style={{
            backgroundColor: videoEnabled ? "#ffffff" : "#ebebeb", // Changing background color based on videoEnabled
          }}
        >
          {!videoEnabled && (
            <TbDeviceComputerCamera className={proct["video-icon"]} />
          )}

          <video
            ref={videoRef}
            autoPlay
            style={{
              display: videoEnabled ? "block" : "none",
            }}
          />
        </div>
        <div className={proct["verification-boxes"]}>
          {/* Webcam Activation */}
          <div className={proct["verification-box"]}>
            <input
              type="checkbox"
              id="video"
              checked={videoEnabled}
              onChange={handleWebcamToggle}
            />
            <label htmlFor="video">Allow webcam access</label>
          </div>

          {/* Microphone Activation */}
          <div className={proct["verification-box"]}>
            <input
              type="checkbox"
              id="audio"
              checked={audioEnabled}
              onChange={handleMicrophoneToggle}
            />
            <label htmlFor="audio">Allow audio recording</label>
          </div>

          {/* Secure Browser Confirmation */}
          <div className={proct["verification-box"]}>
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
        <div className={proct["consent-section"]} style={{ marginTop: "20px" }}>
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
        <div className={proct["button-wrapper"]}>
          {/* Begin Exam Button */}
          <button
            className={proct["begin-exam-btn"]}
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
            className={proct["exit-btn"]}
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
