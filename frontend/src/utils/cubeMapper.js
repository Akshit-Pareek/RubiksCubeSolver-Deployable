// Map color names to kociemba letters
export const colorToFace = {
  white: "U",
  red: "R",
  green: "F",
  yellow: "D",
  orange: "L",
  blue: "B"
};

// Convert faces object → kociemba string
export function buildCubeString(faces) {
  const order = ["U", "R", "F", "D", "L", "B"];
  let result = "";

  order.forEach(face => {
    faces[face].forEach(color => {
      result += colorToFace[color];
    });
  });

  return result;
}
