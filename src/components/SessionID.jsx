import "../global-style.css";
import "./SessionID.css";

export default
function SessionID(props) {
    return (
      <div className="session-container">
       <p> Session ID: </p>
       <h4>{props.sessionID}</h4>
      </div>
    );
  }
  
