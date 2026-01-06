const SolutionView = ({ solution, steps, children }) => {
  if (!solution) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Solution</h2>
      <p><strong>{solution}</strong></p>

      <h3>Step-by-step Instructions</h3>
      <ol>
        {steps.map(step => (
          <li key={step.step}>{step.description}</li>
        ))}
      </ol>

      {/* 👇 Cube goes INSIDE the card */}
      <div className="cube-container">
        {children}
      </div>
    </div>
  );
};

export default SolutionView;
