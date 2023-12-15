import "../global-style.css";
import "./CreateSessionView.css";
import AppHeader from "../components/AppHeader";
import SingleAction from "../components/SingleAction";
import SectionSubtitle from "../components/SectionSubtitle";
import Loading from "../components/Loading";

export default function CreateSessionView(props) {

    const data = {
        playerName : props.name,
      }

    function creationHandlerACB() {
        props.onCreateSession(data.playerName);
    }
    //destinationTitle="Back"
    return <div class="create-session-view-container">

        <AppHeader routeDestination={`/join`} 
            icon={"Backarrow"}
            icon-text={"Back"}
        />

        <SectionSubtitle title="Create game session" />
        
        <div class="create-session-input-container">
            <input
            onInput={(e) => (data.playerName = e.target.value)}
            type="text"
            value={props.name}
            />
        </div>
        {props.isLoading ? (
            <Loading
            class="create-session-singleaction-container"
            message="Creating Session..."/>
            ) : (
            <SingleAction
            class="create-session-singleaction-container"
            description="You are going to be the host of this session"
            btnLabel="Continue"
            onCustomClick={creationHandlerACB}
            />
            )}


    </div>
}