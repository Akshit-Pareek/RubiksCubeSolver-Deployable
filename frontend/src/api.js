// export async function scanCube() {
//   const res = await fetch("http://localhost:8000/scan");
//   return res.json();
// }
// export async function scanFace() {
//   const res = await fetch("http://localhost:8000/scan-face");
//   return res.json(); // { colors: [...] }
// }


// export async function solveCube(cubeString) {
//   const res = await fetch("http://localhost:8000/solve", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ cube_string: cubeString })
//   });
//   return res.json();
// }
// const API = "https://rubikscubesolver-deployable.onrender.com";
const API = "https://rubikscubesolver-deployable.onrender.com";

export async function scanCube() {
  const res = await fetch(`${API}/scan`);
  if (!res.ok) throw new Error("Scan failed");
  return res.json();
}

export async function scanFace() {
  const res = await fetch(`${API}/scan-face`, {
    method: "POST"
  });
  if (!res.ok) throw new Error("Camera scan failed");
  return res.json();
}

export async function solveCube(cubeString) {
  const res = await fetch(`${API}/solve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cube_string: cubeString })
  });
  if (!res.ok) throw new Error("Solve failed");
  return res.json();
}
