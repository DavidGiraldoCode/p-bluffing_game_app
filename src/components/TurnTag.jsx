import "../global-style.css";
import "./TurnTag.css";

export default function TurnTag(props) {
    
    return <div class="turn-tag-container">
        <div class="turn-tag">
            <h4 class="turn-tag-text">{props.tag}</h4>
        </div>
            
    </div>
}