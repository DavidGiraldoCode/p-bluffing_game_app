
import "./CreateSession.css";

export default
function CreateSession(props) {

  function createSessionHandlerACB(){
    props.onCreateSession();
  }

  return (
    <div className="main-container">
      <p className="session-host">Do you want to be the host of a new session?</p>
      <button className="content" onClick={createSessionHandlerACB} >
        Create session
      </button>
    </div>
  );
}
