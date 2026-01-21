import { useEffect } from "react";

const CubeViewer = ({ facelets, moves }) => {
  useEffect(() => {
    if (typeof window.AnimCube3 !== "function" || !facelets) return;

    const moveString = moves.join(" ");

    const params = [
      "id=animcube",
      `facelets=${facelets}`,
      `move=${encodeURIComponent(moveString)}`,
      "size=300",
      "inline=1",
      "buttonbar=1",
      "edit=0",
      "hint=0",
      "bgcolor=0f172a",
      "buttonheight=25",
    ].join("&");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.AnimCube3(params);
        window.dispatchEvent(new Event("resize"));
      });
    });
  }, [facelets, moves]);

  return (
    <div className="cube-container">
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
