import "./CameraScanner.css";

const CameraScanner = ({ face, onScan, onConfirm, colors }) => {
  const handleScan = async () => {
    const res = await fetch("http://127.0.0.1:8000/scan-face", {
      method: "POST"
    });
    const data = await res.json();
    onScan(data.colors);
  };

  return (
    <div className="scanner-card" style={{ textAlign: "center", marginTop: "20px",marginBottom:"0" }}>
      <h3>Scan Face: {face}</h3>

      <button className="scan-btn" onClick={handleScan}>
        📷 Scan with Camera
      </button>

      {colors && (
          <button className="confirm-btn" onClick={onConfirm}>
            ✅ Confirm Face
        </button>
        )}
        <div style={{marginTop:"50px"}}>
            <b>Remember:</b>
            <ol style={{display:"flex",flexDirection:"column",gap:"15px",textAlign:"left",marginTop:"10px",paddingLeft:"20px"}}>
                <li><i>Scan using your camera and confirm each face once scanned.</i></li>
                <li><i>Once scanned, click on solve cube and use the solution steps to solve the cube.</i></li>
                <li><i>The 3D Cube is also provided for ease in learning the solving of 3X3 cube.</i></li>
            </ol>
        </div>
    </div>
  );
};

export default CameraScanner;
