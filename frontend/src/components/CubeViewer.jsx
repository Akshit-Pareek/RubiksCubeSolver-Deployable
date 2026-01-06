import { useEffect } from "react";

const CubeViewer = ({ cubeString, step, moves, speed,facelets }) => {
  useEffect(() => {
    if (typeof window.AnimCube3 !== "function" || !cubeString) return;

    const moveString = moves.join("");
    const params = [

      "id=animcube",
      `facelets=${facelets}`,
      `move=${encodeURIComponent(moveString)}`,
      "size=300",          // 🔥 must match CSS
      `speed=${speed * 5}`,
      "inline=1",
      "buttonbar=1",
      "edit=1",
      "hint=0",
      "bgcolor=0f172a",
    //   "colorscheme=wygbor",
      "buttonheight=25"
    ].join("&");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.AnimCube3(params);
        window.dispatchEvent(new Event("resize"));
      });
    });
  }, [cubeString, step, moves, speed]);

  console.log(
cubeString.slice(0, 9),    // U
cubeString.slice(9, 18),   // R
cubeString.slice(18, 27),  // F
cubeString.slice(27, 36),  // D
cubeString.slice(36, 45),  // L
cubeString.slice(45, 54),  // B
);
  return (
    <div className="cube-container">
      {/* 🔥 THIS div MUST be square */}

      <div
        id="animcube"
        style={{
          width: "300px",
          height: "300px",
          margin: "0 auto",
        }}
      />
    </div>
  );
};

export default CubeViewer;
