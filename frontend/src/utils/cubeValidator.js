export function validateCube(faces) {
  const colorCount = {};

  Object.values(faces).forEach(face => {
    face.forEach(color => {
      colorCount[color] = (colorCount[color] || 0) + 1;
    });
  });

  const errors = [];

  Object.entries(colorCount).forEach(([color, count]) => {
    if (count !== 9) {
      errors.push(`${color} appears ${count} times (should be 9)`);
    }
  });

  if (Object.keys(colorCount).length !== 6) {
    errors.push("Cube must contain exactly 6 colors");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
