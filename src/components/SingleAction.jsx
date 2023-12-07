import "../global-style.css";
import "./SingleAction.css"

export default function SingleAction(props) {
    console.log('props.buttonState',props.buttonState);
    function eventHandlerACB(event) {
        console.log('Event in SingleAction');
        props.onCustomClick(event);
    }
    return <div class="single_action_container" >
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <button disabled={props.buttonState} onClick={eventHandlerACB}>{props.btnLabel}</button>
    </div>
}