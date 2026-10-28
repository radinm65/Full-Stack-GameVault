import "./Section1.css";

const tags = ["Open world", "Story-driven", "Exploration"];

export default function Section1() {
  return (
    <div className="features-section features-section1" id="discovery">
      <div className="features-split">
        <div className="features-section1-media">
          <img
            src="/images/PublicFeaturesImages/discovery.jpg"
            alt="A lone traveler looking at a castle on a mountain at night"
            className="features-image"
          />
          <div className="features-section1-tags">
            {tags.map((tag) => (
              <span className="features-section1-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="features-text">
          <p className="features-label">01 / GAME DISCOVERY</p>
          <h1>LESS SEARCHING. MORE ADVENTURE.</h1>
          <p className="features-intro">
            Whether you know what you want to play or need a fresh idea, explore
            genres and discover games that fit your mood.
          </p>
          <div className="features-point">
            <h3>Explore your kind of game</h3>
            <p>
              Find a path through genres, worlds and experiences that fit your
              mood.
            </p>
          </div>
          <div className="features-point">
            <h3>Keep the good finds close</h3>
            <p>
              Save ideas for your next session and make your backlog feel
              intentional.
            </p>
          </div>
          <p className="features-section1-hint">
            Browse the Game Vault catalog and find your next game.
          </p>
        </div>
      </div>
    </div>
  );
}
