import { useEffect, useState } from "react";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

const useHeadPoseDetection = (videoRef) => {
  const [headPoseDetected, setHeadPoseDetected] = useState(false);

  useEffect(() => {
    const loadModelAndDetect = async () => {
      const model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
      );

      const detectHeadMovement = async () => {
        if (videoRef.current) {
          const predictions = await model.estimateFaces({
            input: videoRef.current,
          });

          if (predictions.length > 0) {
            const landmarks = predictions[0].scaledMesh;
            const nose = landmarks[1];
            const leftEye = landmarks[33];
            const rightEye = landmarks[263];

            if (nose && leftEye && rightEye) {
              // Detect head movement
              if (nose[0] < leftEye[0] - 20 || nose[0] > rightEye[0] + 20) {
                console.log("User is looking to the side");
                setHeadPoseDetected(true);
              } else {
                setHeadPoseDetected(false);
              }
            }
          }
        }
        requestAnimationFrame(detectHeadMovement);
      };

      detectHeadMovement();
    };

    loadModelAndDetect();
  }, [videoRef]);

  return [headPoseDetected, setHeadPoseDetected];
};

export default useHeadPoseDetection;
