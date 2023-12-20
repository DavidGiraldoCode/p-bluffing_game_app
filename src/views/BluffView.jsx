import AppHeader from "../components/AppHeader.jsx";
import SessionID from "../components/SessionID.jsx";
import DoubleAction from "../components/DoubleAction.jsx";
import Loading from "../components/Loading";
import SectionTitle from "../components/SectionTitle.jsx";
import "../global-style.css";
import "./BluffView.css";
import { goTo } from "../utilities.js";

export default function BluffView(props) {


    function bluffSuccessACB() {
        props.onBluffSuccess();
    }

    function bluffFailedACB() {
        props.onBluffFailed();
    }

    function logOutEvenHandlerACB() {
        goTo(`/exit`);
    }

    //<AppHeader routeDestination={`/session-menu:${props.sessionID}`} />˝˝
    return <div class="bluff-view container">

        <AppHeader onLeftClick={logOutEvenHandlerACB} icon={"Logout"} icon-text={"Logout"} />
        <SectionTitle title="Bluff!" />
        <div class="instruction-text m-bottom-m">
            <p>Tell a true or false statement about the card you have.</p>
            <p>The others need to guess if your are telling the truth.</p>
        </div>
        <div class="selected-card container">
            <div class="card-mask">
                {props.selectedCard !== null && (
                    <img src={`https://deckofcardsapi.com/static/img/${props.selectedCard}.svg`} alt={props.selectedCard} />
                )}
            </div>

        </div>

        {props.isLoading ? (
            <Loading
                message="Please wait..." />
        ) : (

            <DoubleAction
                class="fixed-bottom m-bottom-m"
                description={"Did you manage to bluff your way out?"}
                primaryText={"Yes"}
                secondaryText={"No"}
                primaryOnClick={bluffSuccessACB}
                secondaryOnClick={bluffFailedACB} />
        )}


    </div>
}