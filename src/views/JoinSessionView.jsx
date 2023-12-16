import "../global-style.css";
import "./JoinSessionView.css";

import AppHeader from "../components/AppHeader.jsx";
import SectionSubtitle from "../components/SectionSubtitle.jsx";
import SingleAction from "../components/SingleAction.jsx";
import Loading from "../components/Loading.jsx";
export default
function JoinSessionView(props) {

  const data = {
    sessionID : "",
    playerName : props.name,
  }

  function joinSessionHandlerACB() {
    props.onJoinSessionEvent(data.sessionID, data.playerName);
  }

  return (
    <div class="join-session-view-container">

      <AppHeader routeDestination={`/user:${12345}`} 
            icon={"Backarrow"}
            icon-text={"Back"}
            /> 
        <SectionSubtitle title="Joining Session" 
            />

        <div class="join-session-input-container">
            <p className="p-small">Your Name</p>
            <input 
            onInput={(e) => (data.playerName = e.target.value)}
            type="text"
            value={data.playerName}
            />
            <p className="p-small">SessionID</p>
            <input
            onInput={(e) => (data.sessionID = e.target.value)}
            type="text" placeholder={"ex. 12abc3de45f"}
            />
        </div>
          {props.isLoading ? (
              <Loading
              message="Joining Session"/>
              ) : (
              <SingleAction
              class="join-session-singleaction-container"
              description="You will join the session as a guest"
              btnLabel="Confirm"
              onCustomClick={joinSessionHandlerACB}
              />
              )}
    </div>
  
  );
}