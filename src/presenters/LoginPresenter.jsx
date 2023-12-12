import SectionTitle from "../components/SectionTitle.jsx";
import SingleAction from "../components/SingleAction.jsx";
import Footer from "../components/Footer.jsx";
import { goTo } from "../utilities.js";
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";

export default function LoginPresenter(props) {
    function loginACB(){
        console.log("loginACB");
    }

    return <div class="m-top-l m-bottom-l">
    {/*isCreatingSession ? getSessionCreation() : <JoinSessionView onJoinSession={addPlayerToSessionACB} onSessionCreation={gotoSessionCreationACB}/>*/}
    <SectionTitle title="King's Bluffer" />
    <SingleAction
        title=""
        description="Login With Google"
        buttonState={false}
        btnLabel="Login!"
        onCustomClick={loginACB} />
    <Footer />
    </div>  

}