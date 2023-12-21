/*Props
props.description
props.primaryText
props.secondaryText

//Events
props.primaryOnClick
props.secondaryOnClick*/
import "../global-style.css";
import "./DoubleAction.css";
export default function DoubleAction(props) {

    function primaryEventHandlerACB(event) {
        props.primaryOnClick(event);
    }

    function secondaryEventHandlerACB(event) {
        props.secondaryOnClick(event);
    }

    return <div class="double-action-container" >
        <p>{props.description}</p>
        <div class="double-action-btn-layout">
            <button onClick={primaryEventHandlerACB}>{props.primaryText}</button>
            <button class="secondary" onClick={secondaryEventHandlerACB}>{props.secondaryText}</button>
        </div>
    </div>
}
