import "./App.css";
import Navbar from "./components/Navbar";
import CubeInput from "./components/CubeInput";
import SolutionView from "./components/SolutionView";
import { solveCube } from "./api";
import { buildCubeString } from "./utils/cubeMapper";
import { useState } from "react";
import { validateCube } from "./utils/cubeValidator";
import CameraScanner from "./components/CameraScanner";
import CubeViewer from "./components/CubeViewer";

const faceOrder = ["U", "R", "F", "D", "L", "B"];
const faceOrderFacelet = ["U", "D", "F", "B", "L", "R"];
const faceDefaults = {
  U: Array(9).fill("white"),
  R: Array(9).fill("red"),
  F: Array(9).fill("green"),
  D: Array(9).fill("yellow"),
  L: Array(9).fill("orange"),
  B: Array(9).fill("blue")
};
const colorToLetter = {
  white: "w",
  red: "r",
  green: "g",
  yellow: "y",
  orange: "o",
  blue: "b",
};

// Per-face index mapping based on your image
const FACE_INDEX_MAP = {
  U: [6, 7, 8, 3, 4, 5, 0, 1, 2], // 7 8 9 / 4 5 6 / 1 2 3
  D: [0, 3, 6, 1, 4, 7, 2, 5, 8], // 10 13 16 / 11 14 17 / 12 15 18
  
  // These follow the SAME orientation as U in your net image
  R: [0, 3, 6, 1, 4, 7, 2, 5, 8], // 10 13 16 / 11 14 17 / 12 15 18
  F: [0, 3, 6, 1, 4, 7, 2, 5, 8], // 10 13 16 / 11 14 17 / 12 15 18
  B: [0, 3, 6, 1, 4, 7, 2, 5, 8], // 10 13 16 / 11 14 17 / 12 15 18
  L: [2, 1, 0, 5, 4, 3, 8, 7, 6],
};

function App() {
  const [faces, setFaces] = useState(faceDefaults);
  const [currentFaceIndex, setCurrentFaceIndex] = useState(0);
  const [scannedFaceColors, setScannedFaceColors] = useState(null);

  const [solution, setSolution] = useState("");
  const [steps, setSteps] = useState([]);

  const [currentStep, setCurrentStep] = useState(0);
  const moves = solution ? solution.split(" ") : [];
  // const [speed, setSpeed] = useState(1); // 1 = normal speed
  const [simulatorFaces, setSimulatorFaces] = useState(null);
  
  const handleScanResult = (colors) => {
    console.log("RAW camera colors:", colors);
    setScannedFaceColors(colors);
  };

  const handleSolve = async (faces) => {
    const { isValid, errors } = validateCube(faces);

    if (!isValid) {
      alert("Invalid cube:\n" + errors.join("\n"));
      return;
    }

    // setInitialFaces(JSON.parse(JSON.stringify(faces)));
    const frozen = JSON.parse(JSON.stringify(faces));
    console.log("Solving cube:", frozen);
    setSimulatorFaces(frozen);
    setCurrentStep(0);        // 🔥 reset animation
    setSolution("");          // clear old solution first
    setSteps([]);
    
    const cubeString = buildCubeString(frozen);
    const result = await solveCube(cubeString);

    if (!result.success) {
      alert("Cube is not solvable:\n" + result.error);
      return;
    }

    setSolution(result.solution);
    setSteps(result.steps);
  };

  const confirmFace = () => {
    if (!scannedFaceColors) return;

    const clean = sanitizeScannedColors(scannedFaceColors);

    setFaces(prev => ({
      ...prev,
      [faceOrder[currentFaceIndex]]: clean
    }));

    setScannedFaceColors(null);
    setCurrentFaceIndex(prev => prev + 1);
  };


  const sanitizeScannedColors = (colors) => {
    return colors.map(c => {
      if (c === "unknown") return "white"; // safe fallback
      return c;
    });
  };

  const previewFaces = (() => {
    if (!scannedFaceColors) return faces;

    const clean = sanitizeScannedColors(scannedFaceColors);

    return {
      ...faces,
      [faceOrder[currentFaceIndex]]: clean
    };
  })();
  const facesToFacelets=(faces) => {
    if (!faces) return null;

    return faceOrderFacelet.map(face => {
      const stickers = faces[face];
      const map = FACE_INDEX_MAP[face];

      if (!stickers || stickers.length !== 9) {
        throw new Error(`Invalid face data for ${face}`);
      }

      return map
        .map(i => {
          const color = stickers[i];
          const letter = colorToLetter[color];
          if (!letter) {
            throw new Error(`Unknown color "${color}" on face ${face}`);
          }
          return letter;
        })
        .join("");
    }).join("");
  }

  const facelets = simulatorFaces
  ? facesToFacelets(simulatorFaces)
  : null;
  console.log("Facelets:", facelets);
  return (
    <>
    <Navbar />
    <p style={{ marginBottom: "15px", opacity: 0.9 }}>
      Scanning progress: {currentFaceIndex}/6 faces
    </p>

    <div className="App">
      <div className="main-layout" style={{ marginBottom: "20px"}}>
      {/* {!solution && ( */}
        <CameraScanner
          face={faceOrder[currentFaceIndex]}
          onScan={handleScanResult}
          onConfirm={confirmFace}
          colors={scannedFaceColors}
        />
      {/* )} */}


      <CubeInput
        faces={previewFaces}
        setFaces={setFaces}
        onSolve={handleSolve}
      />
  
      {/* {currentFaceIndex === 6 && (
        <button onClick={() => handleSolve(faces)}>
          🧠 Solve Cube
        </button>
      )} */}

      </div>


      <div
        style={{
          background: "#0f172a",
          borderRadius: "16px",
          ...(solution ? { padding: "20px" } : {}),
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          maxWidth: "520px",
          margin: "30px auto",
        }}
      >
        {solution && simulatorFaces && facelets && (
          <SolutionView solution={solution} steps={steps} >
            <>
              <CubeViewer
                key={facelets}
                cubeString={buildCubeString(simulatorFaces)}
                step={currentStep}
                moves={moves}
                // speed={speed}
                facelets={facelets}
                />
            </>
          </SolutionView>
        )}
      </div>
    </div>
  </>
  );

}

export default App;
