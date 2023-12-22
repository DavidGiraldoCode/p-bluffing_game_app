import "../global-style.css";
import "./WinnerBanner.css";
import green_star_left from "../assets/green-star-left-big.png";
import green_star_right from "../assets/green-star-right-big.png";

export default function WinnerBanner(props){

    return <div class="winner-banner-container">
            <h4>
                {props.description}
                {props.descriptionIcon}
            </h4>
        
            
            <div className="image-container">
                <img src={green_star_left} className="image-container small-star"> </img>
                <img src={green_star_left} className="image-container large-star"> </img> 
                <img loading="lazy" class="loading-image-class user-image" src={props.userImage}></img> 
                <img src={green_star_right} className="image-container large-star"> </img>
                <img src={green_star_right} className="image-container small-star"> </img>
            </div>

            <h3>{props.playerName}</h3>

            {/*props.winnerIconLeft*/}{/*props.winnerIconRight*/}

        
        
    </div>
}