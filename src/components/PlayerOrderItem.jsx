import "../global-style.css";
import "./PlayerOrderItem.css";
import TurnTag from "./TurnTag";

export default function PlayerOrderItem(props) {

    function skipEventHandlerACB(event) {
        props.onSkipPlayer();
        console.log("skipEventHandelerACB in PlayerOrderHandlerACB")
    }

    function showTag() {
        if (props.isBluffing)
            return <TurnTag tag={props.bluffIndicator} />
    }

    function enableSkip() {
        if (props.canBeSkip)
            return <div class="skip-button-container">
                <button class="secondary-no-border" onClick={skipEventHandlerACB}>{props.buttonText}</button>
            </div>
    }

    return <div class="player-order-item container">
        {showTag()}
        <p class="player-name-text" >{props.playerName}</p>
        {enableSkip()}
    </div>

}