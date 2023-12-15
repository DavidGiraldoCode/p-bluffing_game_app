import { goTo } from "../utilities.js";
import GameView from "../views/GameView.jsx";

//TODO Continuesly check for gameOver and then change view?

export default function GamePresenter(props) {
    return <GameView 
    sessionID = {props.model.sessionID}
    whosTurn = {props.model.yourTurn}
    leaderboard = {props.model.leaderboard}
    player = {props.model.player[0]}
    />
    
}