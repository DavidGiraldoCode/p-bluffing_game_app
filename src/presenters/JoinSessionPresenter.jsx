import JoinHeader from "../components/SectionTitle.jsx";
import JoinSessionForm from "../components/JoinSessionForm.jsx";
import CreateSession from "../components/CreateSession.jsx";
import Footer from "../components/Footer.jsx";
import SingleAction from "../components/SingleAction.jsx";
import { goTo } from "../utilities.js";

export default function JoinSessesionPresenter(props) {

    let isCreatingSession = false;
    console.log(isCreatingSession);

    function setNameACB(name) {
        //TODO props.sessionID = sessionID;
    }
    function setSessionIDACB(sessionID) {
        //TODO props.sessionID = sessionID;
    }

    async function addPlayerToSessionACB() {
        //console.log(newPlayer);
        //newPlayer = {name, sessionID}
        //TODO props.
        //const player = await props.model.createPlayer(data.newPlayerName, false);

        goTo("/game");
    }

    function gotoCreateSessionACB() {
        //TODO props.
        goTo("/create-session");
    }

    return <div>
        {/*isCreatingSession ? getSessionCreation() : <JoinSessionView onJoinSession={addPlayerToSessionACB} onSessionCreation={gotoSessionCreationACB}/>*/}
        <JoinHeader title="King's Bluffer" />
        <JoinSessionForm
            onInputName={setNameACB}
            onInputSessionID={setSessionIDACB}
            onJoinSession={addPlayerToSessionACB} />
        <SingleAction
            title="Your turn!"
            description="Pick a card to bluff your way out"
            buttonState={true}
            btnLabel="Confirm" />
        <CreateSession onCreateSession={gotoCreateSessionACB} />
        <Footer />
    </div>
}