import "../global-style.css";
import "./LBitem.css";

export default 
function LBitem(props) {
  return (
    <div className="lb-container">
          <div className="rank-container">
            <p className="rank-number"> {/*props.ranking*/} 1º</p>
          </div>
          <div className="text-container">
            <p className="user-text"> Nicolas Gomez  {/*props.PlayerName*/}  </p>
            <p className="cards-text"> 🃏 Cards: </p> 
          </div>
          <div className="score-container">
            <p className="score-number"> {/*props.score*/}5</p>
          </div>
    </div>
  );
}


