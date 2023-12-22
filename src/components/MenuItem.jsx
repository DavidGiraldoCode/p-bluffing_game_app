import "../global-style.css";
import "./MenuItem.css";
import { goTo } from "../utilities";
import arrow_right_ternary from "../assets/arrow-right-ternary.png"
import arrow_right_secondary from "../assets/arrow-right-secondary.png"
import arrow_right_primary from "../assets/arrow-right-primary.png"

export default function MenuItem(props) {

    let buttonIcon = "";
    switch (props.actionTye) {
        case "primary":
            buttonIcon = arrow_right_primary;
            break;
        case "secondary":
            buttonIcon = arrow_right_secondary;
            break;
        case "ternary":
            buttonIcon = arrow_right_ternary;
            break;
        default:
            buttonIcon = arrow_right_primary;
            break;
    }


    return <button class={`menu-item-container ${props.actionTye}`} onClick={x => { goTo(props.routeDestination) }}>
        {props.title}
        <img
            loading="lazy"
            src={buttonIcon}
            alt="Arrow"
        />
    </button>
}
/*
src="https://cdn.builder.io/api/v1/image/assets/TEMP/f644fb3a55fa67fd62626d56ec128e826763a82c9b32a9784bae4070fe0d435d?"
            
<h3 class="main-title">{props.title}</h3>*/