import { useRef, useState } from "react";
import "./CameraScanner.css";

const CameraScanner = ({ face, onScan, onConfirm, colors }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    await videoRef.current.play();
    setCameraOn(true);
  };

  const scanFace = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const blob = await new Promise(resolve =>
      canvas.toBlob(resolve, "image/jpeg")
    );

    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");

    // const res = await fetch("http://127.0.0.1:8000/scan-face", {
    const API = "https://rubikscubesolver-deployable.onrender.com";

    const res = await fetch(`${API}/scan-face`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    onScan(data);
  };

  return (
    <div className="scanner-card">
      <h3>Scan Face: {face}</h3>

      <div className="video-wrapper">
        <video ref={videoRef} autoPlay muted />
        {/* GRID OVERLAY */}
        {cameraOn && (
          <div className="grid-overlay" style={{visibility:`${cameraOn?"visible":"hidden"}`}}>
            {[...Array(9)].map((_, i) => (
              <div key={i} className="grid-cell" />
            ))}
          </div>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />

        <div style={{display:"flex",gap:"10px",justifyContent:"center",marginTop:"10px"}}>

      <button className="scan-btn" onClick={startCamera} disabled={cameraOn}>
        📷 {cameraOn ? "Camera Started" : "Start Camera"}
      </button>

      {cameraOn && (
        <button className="scan-btn" onClick={scanFace} disabled={!cameraOn}>
          🎯 Scan Face
        </button>
      )}
        </div>


      {colors && (
        <>

          <button className="confirm-btn" onClick={onConfirm}>
            ✅ Confirm Face
          </button>
        </>
      )}
    </div>
  );
};

export default CameraScanner;

