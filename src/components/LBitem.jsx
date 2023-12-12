import "../global-style.css";
import "./LBitem.css";

export default 
function LBitem(props) {
  return (
    <div className="lb-container">
          <div className="rank-container">
            <p className="rank-number">{props.rank}</p>
          </div>
          <div className="text-container">
            <p className="user-text">{props.playerName}</p>
            <p className="cards-text">{props.cardIcon} {props.cardText}</p> 
          </div>
          <div className="score-container">
            <p className="score-number">{props.score}</p>
          </div>
    </div>
  );
}


