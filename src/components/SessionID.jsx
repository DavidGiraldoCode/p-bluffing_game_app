import "../global-style.css";
import "./SessionID.css";

export default
function SessionID(props) {
    return (
      <div className="session-container">
       Session ID: {props.sessionID}
      </div>
    );
  }
  
