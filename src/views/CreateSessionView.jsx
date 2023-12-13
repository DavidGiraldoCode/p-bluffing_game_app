import "../global-style.css";
import AppHeader from "../components/AppHeader";
import SingleAction from "../components/SingleAction";
import SectionSubtitle from "../components/SectionSubtitle";

export default function CreateSessionView(props) {

    function creationHandlerACB() {
        props.onCreateSession({ id: "some-user" });
    }
    //destinationTitle="Back"
    return <div class="create-session-view">
        <AppHeader routeDestination={`/join:${12345}`} />
        <SectionSubtitle title="Creating game session" />
        <div class="input-container">
            <input type="text" placeholder={"Firebase user name"} onChange={null} />
        </div>
        <SingleAction
            description="You are going to be the host of this session"
            btnLabel="Confirm"
            onCustomClick={creationHandlerACB}
        />
    </div>
}