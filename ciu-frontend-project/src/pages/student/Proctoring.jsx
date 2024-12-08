// // import React, { useState, useEffect, useRef } from "react";
// // import proct from "./Proctoring.module.css";
// // import { ExamDetails } from "../../components/student/ExamDetails";
// // import { TbDeviceComputerCamera } from "react-icons/tb";
// // import { IoExitOutline } from "react-icons/io5";
// // const Proctoring = () => {
// //   const [videoEnabled, setVideoEnabled] = useState(false);
// //   const [audioEnabled, setAudioEnabled] = useState(false);
// //   const [secureBrowser, setSecureBrowser] = useState(false);
// //   const [consentGiven, setConsentGiven] = useState(false);
// //   const [beginExamEnabled, setBeginExamEnabled] = useState(false);
// //   const [warnings, setWarnings] = useState(0);

// //   const videoRef = useRef(null); // Reference for video element
// //   const audioStream = useRef(null); // Audio stream reference

// //   // Logic for webcam activation and showing the feed
// //   const handleWebcamToggle = async () => {
// //     if (!videoEnabled) {
// //       try {
// //         const stream = await navigator.mediaDevices.getUserMedia({
// //           video: true,
// //         });
// //         setVideoEnabled(true);
// //         videoRef.current.srcObject = stream; // Show video stream in video element
// //       } catch (error) {
// //         alert("Webcam access is required to proceed.");
// //       }
// //     } else {
// //       setVideoEnabled(false);
// //       stopWebcam();
// //       alert("Warning: Webcam has been turned off. Returning to dashboard.");
// //       window.location.href = "/dashboard";
// //     }
// //   };

// //   // Stop the webcam stream
// //   const stopWebcam = () => {
// //     if (videoRef.current.srcObject) {
// //       const tracks = videoRef.current.srcObject.getTracks();
// //       tracks.forEach((track) => track.stop());
// //     }
// //   };

// //   // Logic for microphone activation
// //   const handleMicrophoneToggle = async () => {
// //     if (!audioEnabled) {
// //       try {
// //         const stream = await navigator.mediaDevices.getUserMedia({
// //           audio: true,
// //         });
// //         setAudioEnabled(true);
// //         audioStream.current = stream; // Store the audio stream reference
// //       } catch (error) {
// //         alert("Microphone access is required to proceed.");
// //       }
// //     } else {
// //       setAudioEnabled(false);
// //       stopMicrophone();
// //       alert("Warning: Microphone has been turned off. Returning to dashboard.");
// //       window.location.href = "/dashboard";
// //     }
// //   };

// //   // Stop the microphone stream
// //   const stopMicrophone = () => {
// //     if (audioStream.current) {
// //       const tracks = audioStream.current.getTracks();
// //       tracks.forEach((track) => track.stop());
// //     }
// //   };

// //   // Function to handle the secure browser toggle
// //   const handleSecureBrowserToggle = () => {
// //     setSecureBrowser(!secureBrowser);
// //   };

// //   // Consent checkbox logic
// //   const handleConsentChange = () => {
// //     setConsentGiven(!consentGiven);
// //   };

// //   // Function to enable the Begin Exam button
// //   useEffect(() => {
// //     if (videoEnabled && audioEnabled && secureBrowser && consentGiven) {
// //       setBeginExamEnabled(true);
// //     } else {
// //       setBeginExamEnabled(false);
// //     }
// //   }, [videoEnabled, audioEnabled, secureBrowser, consentGiven]);

// //   // Handle Begin Exam action
// //   const handleBeginExam = () => {
// //     if (beginExamEnabled) {
// //       // Redirect to the quiz page
// //       window.location.href = "/quiz";
// //     } else {
// //       alert("Please ensure all conditions are met before starting the exam.");
// //     }
// //   };

// //   // Logic for detecting face position and generating warnings
// //   const detectFacePosition = () => {
// //     // Random simulation for head not facing the camera
// //     const userNotLookingAtCamera = Math.random() > 0.8;

// //     if (userNotLookingAtCamera) {
// //       setWarnings((prevWarnings) => prevWarnings + 1);
// //       alert(`Warning ${warnings + 1}: Please stay in front of the camera.`);

// //       // Auto-submit exam after two warnings
// //       if (warnings + 1 >= 10) {
// //         alert("Exam auto-submitted due to multiple warnings.");
// //         window.location.href = "/submit-exam"; // Redirect after auto-submission
// //       }
// //     }
// //   };

// //   // Effect to simulate continuous face detection every 5 seconds
// //   useEffect(() => {
// //     const faceDetectionInterval = setInterval(() => {
// //       detectFacePosition();
// //     }, 5000); // Check every 5 seconds

// //     return () => clearInterval(faceDetectionInterval); // Clean up interval on component unmount
// //   }, [warnings]);

// //   return (
// //     <div className={proct["proctoring-overall"]}>
// //       <div className={proct["examination-details"]}>
// //         <ExamDetails />
// //       </div>

// //       <div className={proct["proctoring"]}>
// //         <h1>PROCTORING VERIFICATION</h1>

// //         {/* Video stream should appear immediately after the heading */}
// //         <div
// //           className={proct["video-container"]}
// //           style={{
// //             backgroundColor: videoEnabled ? "#ffffff" : "#ebebeb", // Changing background color based on videoEnabled
// //           }}
// //         >
// //           {!videoEnabled && (
// //             <TbDeviceComputerCamera className={proct["video-icon"]} />
// //           )}

// //           <video
// //             ref={videoRef}
// //             autoPlay
// //             style={{
// //               display: videoEnabled ? "block" : "none",
// //             }}
// //           />
// //         </div>
// //         <div className={proct["verification-boxes"]}>
// //           {/* Webcam Activation */}
// //           <div className={proct["verification-box"]}>
// //             <input
// //               type="checkbox"
// //               id="video"
// //               checked={videoEnabled}
// //               onChange={handleWebcamToggle}
// //             />
// //             <label htmlFor="video">Allow webcam access</label>
// //           </div>

// //           {/* Microphone Activation */}
// //           <div className={proct["verification-box"]}>
// //             <input
// //               type="checkbox"
// //               id="audio"
// //               checked={audioEnabled}
// //               onChange={handleMicrophoneToggle}
// //             />
// //             <label htmlFor="audio">Allow audio recording</label>
// //           </div>

// //           {/* Secure Browser Confirmation */}
// //           <div className={proct["verification-box"]}>
// //             <input
// //               type="checkbox"
// //               id="secure-browser"
// //               checked={secureBrowser}
// //               onChange={handleSecureBrowserToggle}
// //             />
// //             <label htmlFor="secure-browser">Engage Safe Browser</label>
// //           </div>
// //         </div>

// //         {/* Consent Section */}
// //         <div className={proct["consent-section"]} style={{ marginTop: "20px" }}>
// //           <input
// //             type="checkbox"
// //             id="consent"
// //             checked={consentGiven}
// //             onChange={handleConsentChange}
// //           />
// //           <label htmlFor="consent">
// //             I have read the instructions & consent to the capture of my video
// //             and audio for remote proctoring purposes.
// //           </label>
// //         </div>
// //         <div className={proct["button-wrapper"]}>
// //           {/* Begin Exam Button */}
// //           <button
// //             className={proct["begin-exam-btn"]}
// //             onClick={handleBeginExam}
// //             disabled={!beginExamEnabled}
// //             style={{
// //               marginTop: "20px",
// //               backgroundColor: beginExamEnabled ? "green" : "#ebebeb",
// //             }}
// //           >
// //             BEGIN EXAM
// //           </button>

// //           {/* Exit Button */}
// //           <button
// //             className={proct["exit-btn"]}
// //             onClick={() => (window.location.href = "/instructions")}
// //           >
// //             <IoExitOutline />
// //             Exit
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Proctoring;

// // import React, { useState, useEffect, useRef } from "react";
// // import axios from "axios";
// // import proct from "./Proctoring.module.css";
// // import { ExamDetails } from "../../components/student/ExamDetails";
// // import { TbDeviceComputerCamera } from "react-icons/tb";
// // import { IoExitOutline } from "react-icons/io5";
// // import { useNavigate } from "react-router-dom";

// // const Proctoring = () => {
// //   const [videoEnabled, setVideoEnabled] = useState(false);
// //   const [audioEnabled, setAudioEnabled] = useState(false);
// //   const [secureBrowser, setSecureBrowser] = useState(false);
// //   const [consentGiven, setConsentGiven] = useState(false);
// //   const [beginExamEnabled, setBeginExamEnabled] = useState(false);
// //   const [examQuestions, setExamQuestions] = useState(null);

// //   const videoRef = useRef(null);
// //   const audioStream = useRef(null);
// //   const navigate = useNavigate();

// //   const examId = "12345"; // Replace with the actual exam ID

// //   const handleWebcamToggle = async () => {
// //     if (!videoEnabled) {
// //       try {
// //         const stream = await navigator.mediaDevices.getUserMedia({
// //           video: true,
// //         });
// //         setVideoEnabled(true);
// //         videoRef.current.srcObject = stream;
// //       } catch (error) {
// //         alert("Webcam access is required to proceed.");
// //       }
// //     } else {
// //       setVideoEnabled(false);
// //       stopWebcam();
// //       alert("Warning: Webcam has been turned off. Returning to dashboard.");
// //       window.location.href = "/dashboard";
// //     }
// //   };

// //   const stopWebcam = () => {
// //     if (videoRef.current.srcObject) {
// //       const tracks = videoRef.current.srcObject.getTracks();
// //       tracks.forEach((track) => track.stop());
// //     }
// //   };

// //   const handleMicrophoneToggle = async () => {
// //     if (!audioEnabled) {
// //       try {
// //         const stream = await navigator.mediaDevices.getUserMedia({
// //           audio: true,
// //         });
// //         setAudioEnabled(true);
// //         audioStream.current = stream;
// //       } catch (error) {
// //         alert("Microphone access is required to proceed.");
// //       }
// //     } else {
// //       setAudioEnabled(false);
// //       stopMicrophone();
// //       alert("Warning: Microphone has been turned off. Returning to dashboard.");
// //       window.location.href = "/student";
// //     }
// //   };

// //   const stopMicrophone = () => {
// //     if (audioStream.current) {
// //       const tracks = audioStream.current.getTracks();
// //       tracks.forEach((track) => track.stop());
// //     }
// //   };

// //   const handleSecureBrowserToggle = () => {
// //     setSecureBrowser(!secureBrowser);
// //   };

// //   const handleConsentChange = () => {
// //     setConsentGiven(!consentGiven);
// //   };

// //   useEffect(() => {
// //     if (videoEnabled && audioEnabled && secureBrowser && consentGiven) {
// //       setBeginExamEnabled(true);
// //     } else {
// //       setBeginExamEnabled(false);
// //     }
// //   }, [videoEnabled, audioEnabled, secureBrowser, consentGiven]);

// //   const handleBeginExam = async () => {
// //     if (beginExamEnabled) {
// //       try {
// //         const { data } = await axios.get(`http://localhost:3000/exam-paper/${examId}/questions-no-answers`);
// //         setExamQuestions(data);

// //         navigate("/quiz", { state: { questions: data } });
// //       } catch (error) {
// //         alert("Failed to load exam questions. Please try again.");
// //         console.error("Error fetching exam questions:", error);
// //       }
// //     } else {
// //       alert("Please ensure all conditions are met before starting the exam.");
// //     }
// //   };

// //   return (
// //     <div className={proct["proctoring-overall"]}>
// //       <div className={proct["examination-details"]}>
// //         <ExamDetails />
// //       </div>

// //       <div className={proct["proctoring"]}>
// //         <h1>PROCTORING VERIFICATION</h1>

// //         <div
// //           className={proct["video-container"]}
// //           style={{
// //             backgroundColor: videoEnabled ? "#ffffff" : "#ebebeb",
// //           }}
// //         >
// //           {!videoEnabled && <TbDeviceComputerCamera className={proct["video-icon"]} />}
// //           <video ref={videoRef} autoPlay style={{ display: videoEnabled ? "block" : "none" }} />
// //         </div>

// //         <div className={proct["verification-boxes"]}>
// //           <div className={proct["verification-box"]}>
// //             <input
// //               type="checkbox"
// //               id="video"
// //               checked={videoEnabled}
// //               onChange={handleWebcamToggle}
// //             />
// //             <label htmlFor="video">Allow webcam access</label>
// //           </div>

// //           <div className={proct["verification-box"]}>
// //             <input
// //               type="checkbox"
// //               id="audio"
// //               checked={audioEnabled}
// //               onChange={handleMicrophoneToggle}
// //             />
// //             <label htmlFor="audio">Allow audio recording</label>
// //           </div>

// //           <div className={proct["verification-box"]}>
// //             <input
// //               type="checkbox"
// //               id="secure-browser"
// //               checked={secureBrowser}
// //               onChange={handleSecureBrowserToggle}
// //             />
// //             <label htmlFor="secure-browser">Engage Safe Browser</label>
// //           </div>
// //         </div>

// //         <div className={proct["consent-section"]} style={{ marginTop: "20px" }}>
// //           <input
// //             type="checkbox"
// //             id="consent"
// //             checked={consentGiven}
// //             onChange={handleConsentChange}
// //           />
// //           <label htmlFor="consent">
// //             I have read the instructions & consent to the capture of my video and audio for remote proctoring purposes.
// //           </label>
// //         </div>
        
// //         <div className={proct["button-wrapper"]}>
// //           <button
// //             className={proct["begin-exam-btn"]}
// //             onClick={handleBeginExam}
// //             disabled={!beginExamEnabled}
// //             style={{
// //               marginTop: "20px",
// //               backgroundColor: beginExamEnabled ? "green" : "#ebebeb",
// //             }}
// //           >
// //             BEGIN EXAM
// //           </button>

// //           <button
// //             className={proct["exit-btn"]}
// //             onClick={() => (window.location.href = "/instructions")}
// //           >
// //             <IoExitOutline />
// //             Exit
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Proctoring;

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { TbDeviceComputerCamera } from "react-icons/tb";
// import { IoExitOutline } from "react-icons/io5";
// import proct from "./Proctoring.module.css";
// import { ExamDetails } from "../../components/student/ExamDetails";

// const Proctoring = () => {
//   const [videoEnabled, setVideoEnabled] = useState(false);
//   const [audioEnabled, setAudioEnabled] = useState(false);
//   const [secureBrowser, setSecureBrowser] = useState(false);
//   const [consentGiven, setConsentGiven] = useState(false);
//   const [beginExamEnabled, setBeginExamEnabled] = useState(false);

//   const videoRef = useRef(null);
//   const audioStream = useRef(null);
//   const navigate = useNavigate();

//   // Assuming examId is dynamically fetched or passed in
//   const examId = "exam-id-from-context-or-api"; // Replace this with actual dynamic examId

//   const handleWebcamToggle = async () => {
//     if (!videoEnabled) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         setVideoEnabled(true);
//         videoRef.current.srcObject = stream;
//       } catch (error) {
//         alert("Webcam access is required to proceed.");
//       }
//     } else {
//       setVideoEnabled(false);
//       stopWebcam();
//       alert("Warning: Webcam has been turned off. Returning to dashboard.");
//       window.location.href = "/student";
//     }
//   };

//   const stopWebcam = () => {
//     if (videoRef.current.srcObject) {
//       const tracks = videoRef.current.srcObject.getTracks();
//       tracks.forEach((track) => track.stop());
//     }
//   };

//   const handleMicrophoneToggle = async () => {
//     if (!audioEnabled) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//         });
//         setAudioEnabled(true);
//         audioStream.current = stream;
//       } catch (error) {
//         alert("Microphone access is required to proceed.");
//       }
//     } else {
//       setAudioEnabled(false);
//       stopMicrophone();
//       alert("Warning: Microphone has been turned off. Returning to dashboard.");
//       window.location.href = "/student";
//     }
//   };

//   const stopMicrophone = () => {
//     if (audioStream.current) {
//       const tracks = audioStream.current.getTracks();
//       tracks.forEach((track) => track.stop());
//     }
//   };

//   const handleSecureBrowserToggle = () => {
//     setSecureBrowser(!secureBrowser);
//   };

//   const handleConsentChange = () => {
//     setConsentGiven(!consentGiven);
//   };

//   useEffect(() => {
//     if (videoEnabled && audioEnabled && secureBrowser && consentGiven) {
//       setBeginExamEnabled(true);
//     } else {
//       setBeginExamEnabled(false);
//     }
//   }, [videoEnabled, audioEnabled, secureBrowser, consentGiven]);

//   const handleBeginExam = () => {
//     console.log("Exam ID:", examId);  // Check if the examId is valid
//     if (beginExamEnabled) {
//       navigate(`/quiz/${examId}`);
//     } else {
//       alert("Please ensure all conditions are met before starting the exam.");
//     }
//   };
  

//   return (
//     <div className={proct["proctoring-overall"]}>
//       <div className={proct["examination-details"]}>
//         <ExamDetails />
//       </div>

//       <div className={proct["proctoring"]}>
//         <h1>PROCTORING VERIFICATION</h1>

//         <div
//           className={proct["video-container"]}
//           style={{
//             backgroundColor: videoEnabled ? "#ffffff" : "#ebebeb",
//           }}
//         >
//           {!videoEnabled && <TbDeviceComputerCamera className={proct["video-icon"]} />}
//           <video ref={videoRef} autoPlay style={{ display: videoEnabled ? "block" : "none" }} />
//         </div>

//         <div className={proct["verification-boxes"]}>
//           <div className={proct["verification-box"]}>
//             <input
//               type="checkbox"
//               id="video"
//               checked={videoEnabled}
//               onChange={handleWebcamToggle}
//             />
//             <label htmlFor="video">Allow webcam access</label>
//           </div>

//           <div className={proct["verification-box"]}>
//             <input
//               type="checkbox"
//               id="audio"
//               checked={audioEnabled}
//               onChange={handleMicrophoneToggle}
//             />
//             <label htmlFor="audio">Allow audio recording</label>
//           </div>

//           <div className={proct["verification-box"]}>
//             <input
//               type="checkbox"
//               id="secure-browser"
//               checked={secureBrowser}
//               onChange={handleSecureBrowserToggle}
//             />
//             <label htmlFor="secure-browser">Engage Safe Browser</label>
//           </div>
//         </div>

//         <div className={proct["consent-section"]} style={{ marginTop: "20px" }}>
//           <input
//             type="checkbox"
//             id="consent"
//             checked={consentGiven}
//             onChange={handleConsentChange}
//           />
//           <label htmlFor="consent">
//             I have read the instructions & consent to the capture of my video and audio for remote proctoring purposes.
//           </label>
//         </div>
        
//         <div className={proct["button-wrapper"]}>
//           <button
//             className={proct["begin-exam-btn"]}
//             onClick={handleBeginExam}
//             disabled={!beginExamEnabled}
//             style={{
//               marginTop: "20px",
//               backgroundColor: beginExamEnabled ? "green" : "#ebebeb",
//             }}
//           >
//             BEGIN EXAM
//           </button>

//           <button
//             className={proct["exit-btn"]}
//             onClick={() => (window.location.href = "/student")}
//           >
//             <IoExitOutline />
//             Exit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Proctoring;





import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TbDeviceComputerCamera } from "react-icons/tb";
import { IoExitOutline } from "react-icons/io5";
import proct from "./Proctoring.module.css";
import { ExamDetails } from "../../components/student/ExamDetails";


const Proctoring = () => {
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [secureBrowser, setSecureBrowser] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [beginExamEnabled, setBeginExamEnabled] = useState(false);
  const [warnings, setWarnings] = useState(0);


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
    console.log("Exam ID:", examId); // Check if the examId is valid
    if (beginExamEnabled) {
      navigate(`/quiz/${examId}`);
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


        <div
          className={proct["video-container"]}
          style={{
            backgroundColor: videoEnabled ? "#ffffff" : "#ebebeb",
          }}
        >
          {!videoEnabled && (
            <TbDeviceComputerCamera className={proct["video-icon"]} />
          )}
          <video
            ref={videoRef}
            autoPlay
            style={{ display: videoEnabled ? "block" : "none" }}
          />
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
            I have read the instructions & consent to the capture of my video
            and audio for remote proctoring purposes.
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



