import "../global-style.css";
import "./MenuItem.css";
import { goTo } from "../utilities";

export default function MenuItem(props) {

    return <div class="menu-item-container" onClick={x => { goTo(props.routeDestination) }}>
        <h3 class="main-title">{props.title}</h3>
        <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f644fb3a55fa67fd62626d56ec128e826763a82c9b32a9784bae4070fe0d435d?"
            alt="Logo"
        />
    </div>
}