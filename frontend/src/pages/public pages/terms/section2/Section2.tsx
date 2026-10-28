import "./Section2.css";

const terms = [
  {
    id: "using-game-vault",
    title: "Using Game Vault",
    paragraphs: [
      "Game Vault is a game-discovery, personal-library and community platform. Anyone can open the public pages and browse Explore, Game Details, the Community feed and public profiles and collections.",
      "An account is needed to use your Dashboard, Library, Wishlist, Collections and Messages, to follow players and to write reviews.",
    ],
  },
  {
    id: "your-account",
    title: "Your account",
    paragraphs: [
      "Register with a username, email and password, keep your login details private and provide accurate information. You are responsible for the activity on your account.",
      "Sessions are cookie-based and last 3 days, after which you will be asked to log in again. Your email address and other private account data are never shown on your public profile.",
    ],
  },
  {
    id: "games-and-achievements",
    title: "Games and achievements",
    paragraphs: [
      "The game catalog is curated by the project owner. Descriptions, ratings and estimated playtimes are provided for information and may be incomplete or change over time. Estimated playtime is only a guide and never affects achievements.",
      "Your playtime comes from tracked game sessions, not typed hours. Achievements are validated by the server and unlock once per game. Game names and artwork belong to their respective owners.",
    ],
  },
  {
    id: "community-and-content",
    title: "Community and your content",
    paragraphs: [
      "You keep ownership of the reviews and other content you post, and should only share content you have the right to share. Be respectful: welcome different players, keep feedback constructive and warn others before sharing spoilers.",
      "Reviews can be reported. Content that harasses others or breaks these terms may be removed, and accounts may be restricted.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    paragraphs: [
      "Collections are public or private as you choose, and private collections are visible only to you. Your library activity stays private unless you make it public. Privacy options are available in your Settings.",
      "A full privacy notice explaining what data is collected and how it is used will be provided before these terms are published.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    paragraphs: [
      "These terms may be updated as Game Vault grows. A final version will include an effective date, and significant changes will be announced before they apply.",
    ],
  },
];

export default function Section2() {
  return (
    <div className="terms-section2">
      <nav className="terms-section2-toc">
        <p className="terms-label">ON THIS PAGE</p>
        {terms.map((term, index) => (
          <a href={`#${term.id}`} className="terms-section2-toc-link" key={term.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {term.title}
          </a>
        ))}
      </nav>

      <div className="terms-section2-content">
        <div className="terms-section2-intro">
          <h3>About this draft</h3>
          <p>
            These terms describe how Game Vault is intended to work. Game Vault
            is an independent project, and this page is a draft for review
            rather than a published agreement.
          </p>
        </div>

        {terms.map((term, index) => (
          <section className="terms-section2-term" id={term.id} key={term.id}>
            <h2>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {term.title}
            </h2>
            {term.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
