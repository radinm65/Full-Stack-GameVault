import "./Section6.css";

const steps = [
  {
    number: "01",
    title: "Enter the web app",
    text: "Log in to enter your Game Vault.",
  },
  {
    number: "02",
    title: "Find your starting point",
    text: "Discover games, build your library or follow other players.",
  },
  {
    number: "03",
    title: "Keep the journey going",
    text: "Come back to your games, achievements and community activity.",
  },
];

export default function Section6() {
  return (
    <div className="features-section features-section6">
      <div className="features-split features-section6-split">
        <div className="features-text">
          <p className="features-label">READY WHEN YOU ARE</p>
          <h1>ONE LOGIN. A NEW DIRECTION.</h1>
        </div>

        <div className="features-section6-steps">
          {steps.map((step) => (
            <div className="features-section6-step" key={step.number}>
              <span className="features-section6-number">{step.number}</span>
              <div className="features-point">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
