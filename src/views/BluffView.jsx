import AppHeader from "../components/AppHeader.jsx";
import SessionID from "../components/SessionID.jsx";
import DoubleAction from "../components/DoubleAction.jsx";
import Loading from "../components/Loading";
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


    return <div class="bluff-view">
        <AppHeader routeDestination={`/session-menu:${props.sessionID}`} />
        <SessionID sessionID={props.sessionID}/>
        <div class="instruction-text">
            <h3>Bluff!</h3>
            <p>Tell a true or false statement about the card you have.</p>
            <p>The others need to guess if your are telling the truth.</p>
        </div>
        <img src={`https://deckofcardsapi.com/static/img/${props.selectedCard}.png`} alt={props.selectedCard}/>
        {/*<Swiper pileOfCards={props.player.pileOfCards} onSelectCardSprite={null} />*/} {/*NEEDS FIX*/} {/*DAVID*/}
        
        {props.isLoading ? (
            <Loading
            message="Please wait..."/>
            ) : (
            <DoubleAction
            description={"Did you manage to bluff your way out?"}
            primaryText={"Yes"}
            secondaryText={"No"}
            primaryOnClick={bluffSuccessACB}
            secondaryOnClick={bluffFailedACB} />
            )}


    </div>
}