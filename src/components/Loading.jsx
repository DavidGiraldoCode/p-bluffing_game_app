import "../global-style.css";
import "./Loading.css"
import loading_gif from "../assets/Loading.gif"

export default function Loading(props) {
    return <div class="loading_container" >
        <h3>{props.message}</h3>
        <img loading="lazy" class="loading-image-class" src={loading_gif} ></img>
    </div>
}