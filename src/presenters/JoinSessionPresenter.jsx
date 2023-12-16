//import JoinHeader from "../components/SectionTitle.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import JoinSessionForm from "../components/JoinSessionForm.jsx";
//import CreateSession from "../components/CreateSession.jsx";
import Footer from "../components/Footer.jsx";
import SingleAction from "../components/SingleAction.jsx";
import Loading from "../components/Loading.jsx";
import { goTo, propsWithLoading } from "../utilities.js";
import { ref } from "vue";
import JoinSessionView from "../views/JoinSessionView.jsx";


export default function JoinSessesionPresenter(props) {

    async function onJoinSessionACB(sessionID, playerName) {
        const success = await propsWithLoading(props.model.joinSession(sessionID, playerName), props);
        console.log("Success?: ", success)
        if(success){
            goTo(`/game:${props.model.sessionID}`);
        }
      }
    

    return <div>
            <JoinSessionView
            name={props.model.user.displayName}
            isLoading={props.model.isLoading}
            onJoinSessionEvent={onJoinSessionACB}/>



    </div>
}