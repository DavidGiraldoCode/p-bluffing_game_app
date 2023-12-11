import "../global-style.css";
import "./LBitem.css";

export default 
function LBitem(props) {
  return (
    <div className="lb-container">

        <div className="rank-container">
          <h3> {/*props.ranking*/} 1º</h3>
        </div>

          <div className="text-container">
            <h3 className="user-text"> PlayerName: Nicolas  {/*props.PlayerName*/}  </h3>
            <h3 className="score-text"> 🃏 Cards: </h3> 
          </div>

          <div className="score-container">
            <h3> {/*props.score*/}5</h3>
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

