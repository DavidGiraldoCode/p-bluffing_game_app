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


/* OLD LBitem 

<div className="bar-container">
      <div className="card-header">
        <h3 className="card-header-text">1º</h3>

        <h3 className="card-header-subtext"> PlayerName: 🃏 Cards:</h3>
      
        <h3 className="card-content">5</h3>
      </div>
    </div>

*/

