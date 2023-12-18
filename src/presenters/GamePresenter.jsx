import { goTo } from "../utilities.js";
import GameView from "../views/GameView.jsx";
import GameOverView from "../views/GameOverView.jsx";
import { useRoute } from "vue-router";

//TODO Continuesly check for gameOver and then change view?

export default function GamePresenter(props) {
    console.log(useRoute().params.id, useRoute().params.user);
    props.model.reJoinSession(useRoute().params.id, 'Dave');
    
    if (props.model.gameOver) {
        // If the game is over, render the GameOverView
        return <GameOverView 
        winner={props.model.winner}
        sessionID={props.model.sessionID}
        leaderboard={props.model.leaderboard}
        routeDestination={`/home/${props.model.user.uid}`} />;
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