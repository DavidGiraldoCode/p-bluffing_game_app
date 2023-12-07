import "../global-style.css";
import "./SingleAction.css"

export default function SingleAction(props) {
    return <div class="single_action_container" >
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <button disabled={props.buttonState} >{props.btnLabel}</button>
    </div>
}