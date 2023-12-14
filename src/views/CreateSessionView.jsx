import "../global-style.css";
import "./CreateSessionView.css";
import AppHeader from "../components/AppHeader";
import SingleAction from "../components/SingleAction";
import SectionSubtitle from "../components/SectionSubtitle";

export default function CreateSessionView(props) {

    function creationHandlerACB() {
        props.onCreateSession({ id: "some-user" });
    }
    //destinationTitle="Back"
    return <div class="create-session-view-container">
        <AppHeader routeDestination={`/join:${12345}`} />
        <SectionSubtitle title="Creating game session" />
        <div class="create-session-input-container">
            <input type="text" placeholder={"Firebase user name"} onChange={null} />
        </div>
        <SingleAction
            class="create-session-singleaction-container"
            description="You are going to be the host of this session"
            btnLabel="Confirm"
            onCustomClick={creationHandlerACB}
            />

        {/*  Joining Session  */}

        <AppHeader routeDestination={`/join:${12345}`} 
            icon={"Back Arrow"}
            title={"Back"}
            /> 
        <SectionSubtitle title="Joining Session" 
            />

        <div class="create-session-input-container">
            <input type="text" placeholder={"MasterBluffer"} onChange={null} />
        </div>

        <SingleAction
            class="create-session-singleaction-container"
            description="You will join the session as a guest"
            btnLabel="Confirm"
            onCustomClick={creationHandlerACB}
            />




    </div>
}