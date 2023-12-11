import "../global-style.css";
import "./WinnerBanner.css";

export default function WinnerBanner(props){

    return <div class="winner-banner-container">
        <h4>{props.description}{props.descriptionIcon}</h4>
        <div>
            
            <h1>{props.winnerIconLeft} {props.playerName} {props.winnerIconRight}</h1>


        </div>
        
    </div>
}