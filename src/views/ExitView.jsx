import AppHeader from "../components/AppHeader.jsx";
import SingleAction from "../components/SingleAction.jsx";
import "../global-style.css";
import "./ExitView.css";

export default
function ExitView(props) {

  return (
    <div>
        // TODO Change AppHeader
        <AppHeader />
        <div class="exit-text">
            <h1>Leaving the game</h1>
            <p>If you leave the game session all your progress is going to be lost.</p>
            <p>If you are the host, you will finish the session for everyone else in the game, and someone will have to create a new session from scratch.</p>
        </div>
        <div>
            // TODO SingleAction should be on the bottom of screen.
            <SingleAction
                description="Are you sure you want to leave?"
                buttonState={false}
                btnLabel="Yes"
                onCustomClick={null}    //TODO Add customEventHandler
                class="bottom-action" />
        </div>
    </div>
  );
}
