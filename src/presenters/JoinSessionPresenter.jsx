//import JoinHeader from "../components/SectionTitle.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import JoinSessionForm from "../components/JoinSessionForm.jsx";
//import CreateSession from "../components/CreateSession.jsx";
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

    return <div class="m-top-l m-bottom-l">
        {/*isCreatingSession ? getSessionCreation() : <JoinSessionView onJoinSession={addPlayerToSessionACB} onSessionCreation={gotoSessionCreationACB}/>*/}
        <SectionTitle title="King's Bluffer" />
        <JoinSessionForm
            class="m-bottom-m"
            onInputName={setNameACB}
            onInputSessionID={setSessionIDACB}
            onJoinSession={addPlayerToSessionACB} />
        <SingleAction
            title=""
            description="Do you want to be the host of a new session?"
            buttonState={false}
            btnLabel="Create session"
            onCustomClick={gotoCreateSessionACB} />
        <Footer />
    </div>
}