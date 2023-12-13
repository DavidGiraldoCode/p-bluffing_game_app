import AppHeader from "../components/AppHeader.jsx";
import SectionSubtitle from "../components/SectionSubtitle.jsx";
import SingleAction from "../components/SingleAction.jsx";
import "../global-style.css";
import "./ExitView.css";

export default
  function ExitView(props) {

  function logoutHandlerACB() {
    props.onLogOut();
  }

  return (
    <div>
      <AppHeader routeDestination={`/session-menu:${12345}`} />
      <div class="exit-text">
        <SectionSubtitle title="Leaving the game" />
        <p>If you leave the game session all your progress is going to be lost.</p>
        <p>If you are the host, you will finish the session for everyone else in the game, and someone will have to create a new session from scratch.</p>
      </div>
      <div>
            // TODO SingleAction should be on the bottom of screen.
        <SingleAction
          description="Are you sure you want to leave?"
          buttonState={false}
          btnLabel="Yes"
          onCustomClick={logoutHandlerACB}    //TODO Add customEventHandler
          class="bottom-action" />
      </div>
    </div>
  );
}
