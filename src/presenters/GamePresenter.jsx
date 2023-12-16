import { goTo } from "../utilities.js";
import GameView from "../views/GameView.jsx";
import GameOverView from "../views/GameOverView.jsx";

//TODO Continuesly check for gameOver and then change view?

export default function GamePresenter(props) {
    if (props.model.gameOver) {
        // If the game is over, render the GameOverView
        return <GameOverView 
        winner={props.model.winner}
        sessionID={props.model.sessionID}
        leaderboard={props.model.leaderboard}
        routeDestination={`/user:${1234}`} />;
    } else {
        // If the game is not over, render the GameView
        return <GameView 
            sessionID={props.model.sessionID}
            whosTurn={props.model.yourTurn}
            leaderboard={props.model.leaderboard}
            player={props.model.player[0]}
        />;
    }
}