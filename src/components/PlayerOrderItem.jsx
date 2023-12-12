import "../global-style.css";
import "./PlayerOrderItem.css";
import TurnTag from "./TurnTag";

export default function PlayerOrderItem(props){

    function skipEventHandlerACB(event){
        console.log("skipEventHandelerACB in PlayerOrderHandlerACB")
    }
    return <div class="player-order-item-container">
        <div class="player-order-item-component-layout">
            <TurnTag tag={props.bluffIndicator}></TurnTag>
            <p class="player-name-text" >{props.playerName}</p>
            <div class="skip-button-container">
                <button class="secondary" onClick={skipEventHandlerACB}>{props.buttonText}</button>
                </div>
            
        </div>
    </div>
}