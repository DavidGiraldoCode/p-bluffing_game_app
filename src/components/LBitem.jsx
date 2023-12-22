import "../global-style.css";
import "./LBitem.css";

export default
  function LBitem(props) {
  return (
    <div className="lb container">
      <div className="rank-container">
        <h4 className="rank-number">{props.rank}</h4>
      </div>
      <div className="text-container">
        <img loading="lazy" class="loading-image-class user-image-2" src={props.playerImage}></img>
        <h4 className="user-text">{props.playerName}</h4>
      </div>
      <div className="score-container">
        <h4 className="cards-text">{props.cardIcon} {props.cardText}</h4>
        <h4 className="score-number">{props.score}</h4>
      </div>
    </div>
  );
}


