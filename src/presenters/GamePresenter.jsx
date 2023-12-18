import { goTo } from "../utilities.js";
import GameView from "../views/GameView.jsx";
import GameOverView from "../views/GameOverView.jsx";
import { useRoute } from "vue-router";
import { watch } from "vue";

//TODO Continuesly check for gameOver and then change view?

export default function GamePresenter(props) {

    console.log(useRoute().params.id, useRoute().params.user);
    props.model.reJoinSessionURL(useRoute().params.id, useRoute().params.user);
    


    // Watch for changes in both yourTurn and playerOrder
    watch([() => props.model.yourTurn, () => props.model.playerOrder], (newYourTurn, oldYourTurn) => {
        // Check if either yourTurn or playerOrder has changed
        if (newYourTurn !== oldYourTurn) {
            // Call the function to handle the change
            handleYourTurnChangeACB();
        }
    });

    function handleYourTurnChangeACB(){
        // Someone has ended their turn => all users in the game will se the leaderboard
        goTo(`/leader-board:${props.model.sessionID}`);
    }

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