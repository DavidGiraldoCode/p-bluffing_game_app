/*Props
props.description
props.primaryText
props.secondaryText

//Events
props.primaryOnClick
props.secondaryOnClick*/
import "../global-style.css";
import "./DoubleAction.css";
import create_session_primary from "../assets/create-session-primary.png"
import join_session_secondary from "../assets/join-session-secondary.png"
import thumb_down_secondary from "../assets/thumb-down-secondary.png"
import thumb_up_primary from "../assets/thumb-up-primary.png"

export default function DoubleAction(props) {

    function primaryEventHandlerACB(event) {
        props.primaryOnClick(event);
    }

    function secondaryEventHandlerACB(event) {
        props.secondaryOnClick(event);
    }

    return <div class="double-action-container" >
        <p>{props.description}</p>
        <div class="container double-action-btn-layout">
            
            <button class="" onClick={primaryEventHandlerACB}>
                <img loading="lazy" src={props?.isBluffin? thumb_up_primary : create_session_primary} alt="create session" />
                {props.primaryText}
            </button>

            <button class="secondary" onClick={secondaryEventHandlerACB}>
                <img loading="lazy" src={props?.isBluffin? thumb_down_secondary : join_session_secondary} alt="join session" />
                {props.secondaryText}
            </button>

        </div>
    </div>
}
