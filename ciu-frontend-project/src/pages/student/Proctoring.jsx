

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TbDeviceComputerCamera } from "react-icons/tb";
import { IoExitOutline } from "react-icons/io5";
import proct from "./Proctoring.module.css";
import { ExamDetails } from "../../components/student/ExamDetails";

const Proctoring = () => {
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  // const [secureBrowser, setSecureBrowser] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [beginExamEnabled, setBeginExamEnabled] = useState(false);

  const videoRef = useRef(null);
  const audioStream = useRef(null);
  const navigate = useNavigate();

  // Assuming examId is dynamically fetched or passed in
  const examId = "exam-id-from-context-or-api"; // Replace this with actual dynamic examId

  const handleWebcamToggle = async () => {
    if (!videoEnabled) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setVideoEnabled(true);
        videoRef.current.srcObject = stream;
      } catch (error) {
        alert("Webcam access is required to proceed.");
      }
    } else {
      setVideoEnabled(false);
      stopWebcam();
      alert("Warning: Webcam has been turned off. Returning to dashboard.");
      window.location.href = "/student";
    }
  };

  const stopWebcam = () => {
    if (videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const handleMicrophoneToggle = async () => {
    if (!audioEnabled) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setAudioEnabled(true);
        audioStream.current = stream;
      } catch (error) {
        alert("Microphone access is required to proceed.");
      }
    } else {
      setAudioEnabled(false);
      stopMicrophone();
      alert("Warning: Microphone has been turned off. Returning to dashboard.");
      window.location.href = "/student";
    }
  };

  const stopMicrophone = () => {
    if (audioStream.current) {
      const tracks = audioStream.current.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const handleSecureBrowserToggle = () => {
    setSecureBrowser(!secureBrowser);
  };

  const handleConsentChange = () => {
    setConsentGiven(!consentGiven);
  };

  useEffect(() => {
    if (videoEnabled && audioEnabled && secureBrowser && consentGiven) {
      setBeginExamEnabled(true);
    } else {
      setBeginExamEnabled(false);
    }
  }, [videoEnabled, audioEnabled, secureBrowser, consentGiven]);

  const handleBeginExam = () => {
    console.log("Exam ID:", examId);  // Check if the examId is valid
    if (beginExamEnabled) {
      navigate(`/quiz/${examId}`);
    } else {
      alert("Please ensure all conditions are met before starting the exam.");
    }
  };
  

  return (
    <div className={proct["proctoring-overall"]}>
      <div className={proct["examination-details"]}>
        <ExamDetails />
      </div>

      <div className={proct["proctoring"]}>
        <h1>PROCTORING VERIFICATION</h1>

        <div
          className={proct["video-container"]}
          style={{
            backgroundColor: videoEnabled ? "#ffffff" : "#ebebeb",
          }}
        >
          {!videoEnabled && <TbDeviceComputerCamera className={proct["video-icon"]} />}
          <video ref={videoRef} autoPlay style={{ display: videoEnabled ? "block" : "none" }} />
        </div>

        <div className={proct["verification-boxes"]}>
          <div className={proct["verification-box"]}>
            <input
              type="checkbox"
              id="video"
              checked={videoEnabled}
              onChange={handleWebcamToggle}
            />
            <label htmlFor="video">Allow webcam access</label>
          </div>

          <div className={proct["verification-box"]}>
            <input
              type="checkbox"
              id="audio"
              checked={audioEnabled}
              onChange={handleMicrophoneToggle}
            />
            <label htmlFor="audio">Allow audio recording</label>
          </div>

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

        <div className={proct["consent-section"]} style={{ marginTop: "20px" }}>
          <input
            type="checkbox"
            id="consent"
            checked={consentGiven}
            onChange={handleConsentChange}
          />
          <label htmlFor="consent">
            I have read the instructions & consent to the capture of my video and audio for remote proctoring purposes.
          </label>
        </div>
        
        <div className={proct["button-wrapper"]}>
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

          <button
            className={proct["exit-btn"]}
            onClick={() => (window.location.href = "/student")}
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
