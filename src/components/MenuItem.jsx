import "../global-style.css";
import "./MenuItem.css";

export default function MenuItem(props) {

    function eventHandlerACB(event) {
        console.log('eventHandlerACB in MenuItem');
        props.onCustomClick(event);
    }

    return (
    <div class="menu-item-container" onClick={eventHandlerACB}>
        <h3 class="main-title">{props.title}</h3>
        <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f644fb3a55fa67fd62626d56ec128e826763a82c9b32a9784bae4070fe0d435d?"
            alt="Logo"
        />
    </div>)
}