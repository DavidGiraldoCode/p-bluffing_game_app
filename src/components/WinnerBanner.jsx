import "../global-style.css";
import "./WinnerBanner.css";
import green_star_left from "../assets/green-star-left-big.png";
import green_star_right from "../assets/green-star-right-big.png";
import green_star_center from "../assets/green-star-center-big.png";

export default function WinnerBanner(props){

    return <div class="winner-banner-container">
            
        
            <div>

            </div>
            <div className="image-container">
                <img src={green_star_left} className="image-container small-star"> </img>
                <img src={green_star_left} className="image-container large-star"> </img> 
                <img src={green_star_center} className="image-container center-star"> </img> 
                <img src={green_star_right} className="image-container large-star"> </img>
                <img src={green_star_right} className="image-container small-star"> </img>
            </div>
            <div>
                <h4>
                    {props.description}
                    {props.descriptionIcon}
                </h4>
                <h3>{props.winnerIconLeft}{props.playerName}{props.winnerIconRight}</h3>
            </div>   
    </div>
}