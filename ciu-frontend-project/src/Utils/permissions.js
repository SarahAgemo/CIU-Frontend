export const requestMediaPermissions = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });

    if (stream) {
      return {
        audio: true,
        video: true
      };
    }
  } catch (err) {
    console.error("Permissions not granted:", err);
    return {
      audio: false,
      video: false
    };
  }
};
