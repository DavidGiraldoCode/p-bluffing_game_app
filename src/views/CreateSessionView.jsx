import "../global-style.css";
import "./CreateSessionView.css";
import AppHeader from "../components/AppHeader";
import SingleAction from "../components/SingleAction";
import SectionSubtitle from "../components/SectionSubtitle";
import Loading from "../components/Loading";
import { useRouter } from "vue-router";

export default function CreateSessionView(props) {
    const router = useRouter();

    function backEvenHandlerACB() {
        router.back()
    }

    const data = {
        playerName: props.name,
    }

    function creationHandlerACB() {
        props.onCreateSession(data.playerName);
    }
    //destinationTitle="Back"
    return <div class="create-session-view container">
        <AppHeader onLeftClick={backEvenHandlerACB} icon={"Backarrow"} icon-text={"Back"} />
        <SectionSubtitle title="Create game session" />
        <div class="create-session-input container">
            <label>Your session nickname</label>
            <input
                onInput={(e) => (data.playerName = e.target.value)}
                type="text"
                placeholder={props.name}
                value={''} />
        </div>

        {props.isLoading ? (
            <Loading
                class="create-session-singleaction-container"
                message="Creating Session..." />
        ) : (
            <SingleAction
                class="fixed-bottom"
                description="You are going to be the host of this session"
                btnLabel="Continue"
                onCustomClick={creationHandlerACB}
            />
        )}


    </div>
}