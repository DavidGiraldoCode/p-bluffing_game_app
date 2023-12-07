import "../global-style.css";
import "./Footer.css";

export default function Footer(props) {
  return (
    <footer className="footer-container">
      <p> 2023 - Coded with ❤️ in Stockholm, Sweden </p>
      <p className="powered-by">

        <a href="https://www.deckofcardsapi.com/" target="_blank"> Powered by Deck of Card API</a>
      </p>
    </footer>
  );
}

/*
<footer className="footer-container">
      <div className="footer"> 2023 - Coded with ❤️ in Stockholm, Sweden </div>
      <div className="powered-by">
        Powered by{" "}
        <a href="https://www.deckofcardsapi.com/" target="_blank">Deck of Card API</a>
      </div>
    </footer>
*/