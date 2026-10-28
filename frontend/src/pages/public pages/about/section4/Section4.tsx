import "./Section4.css";

const playTypes = [
  {
    image: "/images/PublicAboutImages/explorer.jpg",
    title: "The Explorer",
    text: "A new world, a hidden path, a game you almost missed.",
  },
  {
    image: "/images/PublicAboutImages/challenger.jpg",
    title: "The Challenger",
    text: "The next unlock. The better run. The goal that is yours.",
  },
  {
    image: "/images/PublicAboutImages/connector.jpg",
    title: "The Connector",
    text: "A shared recommendation and a conversation that stays with you.",
  },
];

export default function Section4() {
  return (
    <div className="about-section about-section4">
      <p className="about-label">YOUR WAY TO PLAY</p>
      <h1>YOU DO NOT HAVE TO FIT A TYPE.</h1>
      <p className="about-intro about-section4-intro">
        Some nights are for one more attempt. Others are for wandering off the
        main quest. There is room for both—and everything in between.
      </p>
      <div className="about-section4-cards">
        {playTypes.map((type) => (
          <div className="about-section4-card" key={type.title}>
            <img src={type.image} alt={type.title} />
            <div className="about-section4-card-text">
              <h2>{type.title}</h2>
              <p>{type.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
