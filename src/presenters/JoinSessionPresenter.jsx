//import JoinHeader from "../components/SectionTitle.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import JoinSessionForm from "../components/JoinSessionForm.jsx";
//import CreateSession from "../components/CreateSession.jsx";
import Footer from "../components/Footer.jsx";
import SingleAction from "../components/SingleAction.jsx";
import Loading from "../components/Loading.jsx";
import { goTo, propsWithLoading } from "../utilities.js";
import { ref } from "vue";


export default function JoinSessesionPresenter(props) {

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

        goTo(`/game:${12345}`);
    }

    async function gotoCreateSessionACB() {
        const success = await propsWithLoading(props.model.createHost("TestUser CHANGE TO PROPS"), props)
        if(success){
            goTo(`/create-session:${12345}`);
        }
      }

    return <div class="m-top-l m-bottom-l">
        <SectionTitle title="King's Bluffer" />
        <JoinSessionForm
            class="m-bottom-m"
            onInputName={setNameACB}
            onInputSessionID={setSessionIDACB}
            onJoinSession={addPlayerToSessionACB} />
        {props.model.isLoading ? (
            <Loading
            message="Creating Session"/>
            ) : (
            <SingleAction
            title=""
            description="Do you want to be the host of a new session?"
            buttonState={false}
            btnLabel="Create session"
            onCustomClick={gotoCreateSessionACB}
            />
        )}
        <Footer />
    </div>
}