import './JoinSessionForm.css';

export default
function JoinSessionForm(props) {
    return (
      <form className="main-container">
        <header className="title">Join a session</header>
        <div className="input-container">
          <label htmlFor="name" className="label">
            Your name
          </label>
          <input
            type="text"
            id="name"
            className="input"
            aria-label="Your name"
          />
        </div>
        <div className="input-container">
          <label htmlFor="sessionID" className="label">
            Session ID 
          </label>
          <input
            type="text"
            id="sessionID"
            className="input"
            aria-label="Session ID"
          />
        </div>
        <button className="join-session-button" aria-label="Join session">
          Join session
        </button>
        
      </form>
    );
  }
  
  