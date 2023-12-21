import "../global-style.css";
import "./SessionID.css";

export default
function SessionID(props) {
    return (
      <div className="session-container">
       <p class="p-small"> Session ID: </p>
       <p class="p-small">{props.sessionID}</p>
      </div>
    );
  }
  
