import "../global-style.css";
import "./Loading.css"

export default function Loading(props) {

    return <div class="loading_container" >
        <h3>{props.message}</h3>
        <img loading="lazy" class="loading-image-class" src="src\components\Loading.gif"></img>
    </div>
}