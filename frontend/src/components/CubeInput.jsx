// import { useState, useEffect } from "react";
import React from "react";
import "./CubeInput.css";

// const colors = ["white", "red", "green", "yellow", "orange", "blue"];

// const faceDefaults = {
//   U: Array(9).fill("white"),
//   R: Array(9).fill("red"),
//   F: Array(9).fill("green"),
//   D: Array(9).fill("yellow"),
//   L: Array(9).fill("orange"),
//   B: Array(9).fill("blue")
// };
const CubeInput = ({ faces, setFaces, onSolve }) => {
    const cycleColor = (face, index) => {
    const colors = ["white", "red", "green", "yellow", "orange", "blue"];
    const current = faces[face][index];
    const next = colors[(colors.indexOf(current) + 1) % colors.length];

    setFaces(prev => {
      const copy = { ...prev };
      copy[face] = [...copy[face]];
      copy[face][index] = next;
      return copy;
    });
  };

    


  const renderFace = (face) => (
    <div className="face">
      <div className="face-label">{face}</div>
      <div className="grid">
        {faces[face].map((color, idx) => (
          <div
            key={idx}
            className={`cell ${color}`}
            onClick={() => cycleColor(face, idx)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="cube-card">
      <div className="cube-title">Manual Cube Input</div>

      <div className="face-row">
        {renderFace("U")}
        {renderFace("R")}
        {renderFace("F")}
      </div>

      <div className="face-row">
        {renderFace("D")}
        {renderFace("L")}
        {renderFace("B")}
      </div>
        <div style={{display:"flex",justifyContent:'center'}}>
            <button className="solve-btn" onClick={() => onSolve(faces)}>
                Solve Cube
            </button>

        </div>
    </div>
  );
};

export default CubeInput;
