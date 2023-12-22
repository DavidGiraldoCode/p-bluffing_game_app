import "../global-style.css";
import './JoinSessionForm.css';

export default
  function JoinSessionForm(props) {

  function inputNameHandlerACB(event) {
    //name
    props.onInputName(event.target.value);
  }
  function sessionIDHandlerACB(event) {
    //sessionID
    props.onInputSessionID(event.target.value);
  }

  function joinSessionHandlerACB() {
    props.onJoinSession();
  }

  return <div>
    <form className="join-form">
      <h2>Join a session</h2>
      <div className="join-form-input">
        <label> Your name</label>
        <input
          type="text"
          id="name"
          className=""
          aria-label="Your name"
          onChange={inputNameHandlerACB} /></div>
      <div className="join-form-input">
        <label> Session ID </label>
        <input
          type="text"
          id="sessionID"
          className=""
          aria-label="Session ID"
          onChange={sessionIDHandlerACB} />
      </div>
      <button className="secondary" aria-label="Join session" onClick={joinSessionHandlerACB} >
        Join session
      </button>

    </form>
  </div >

    ;
}

/*
backup

  <form>
      <div className="container">
        <h1>Join a session</h1>
        <div className="input-container">
          <label> Your name</label>
          <input
            type="text"
            id="name"
            className="input"
            aria-label="Your name"
            onChange={inputNameHandlerACB} /></div>
        <div className="input-container">
          <label> Session ID </label>
          <input
            type="text"
            id="sessionID"
            className="input"
            aria-label="Session ID"
            onChange={sessionIDHandlerACB} />
        </div>
        <button className="secondary" aria-label="Join session" onClick={joinSessionHandlerACB} >
          Join session
        </button>
      </div>
    </form>
  </div >

*/