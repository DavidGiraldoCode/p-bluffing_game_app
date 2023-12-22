import "../global-style.css";
import "./SingleAction.css"

export default function SingleAction(props) {
    
    function eventHandlerACB(event) {
        props.onCustomClick(event);
    }

    return <div class="single_action_container" >
        <h3>{props.title}</h3>
        <p class="p-small">{props.description}</p>
        <button disabled={props.buttonState} onClick={eventHandlerACB}>{props.btnLabel}</button>
    </div>
}