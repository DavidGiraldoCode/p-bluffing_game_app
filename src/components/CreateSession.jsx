
import "./CreateSession.css";

export default
function CreateSession(props) {
  return (
    <form className="main-container">
      <div className="session-host">Do you want to be the host of a new session?</div>
      <button className="content">
        Create session
      </button>
    </form>
  );
}
