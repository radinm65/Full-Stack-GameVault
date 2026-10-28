import "./Section4.css";

export default function Section4() {
  return (
    <div className="features-section features-section4" id="community">
      <div className="features-split">
        <div className="features-section4-media">
          <img
            src="/images/PublicFeaturesImages/community.jpg"
            alt="A group of armored explorers walking through a glowing forest"
            className="features-image"
          />
          <div className="features-section4-quote">
            <p className="features-label">A CONVERSATION WORTH STARTING</p>
            <h2>“Which game made you forget the time?”</h2>
            <p>There is always another story to discover.</p>
          </div>
        </div>

        <div className="features-text">
          <p className="features-label">03 / COMMUNITY</p>
          <h1>YOUR NEXT FAVORITE MIGHT BE THEIR FAVORITE.</h1>
          <p className="features-intro">
            Follow players, share game reviews and discover what others are
            playing. Keep up with the gaming milestones of people you follow.
          </p>
          <div className="features-point">
            <h3>A place for your perspective</h3>
            <p>
              Share your reviews and discover new perspectives from other
              players.
            </p>
          </div>
          <div className="features-point">
            <h3>Respect is part of the experience</h3>
            <p>
              Respect spoilers, keep feedback constructive and make room for
              different tastes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
