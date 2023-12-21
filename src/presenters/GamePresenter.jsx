import { goTo } from "../utilities.js";
import GameView from "../views/GameView.jsx";
import GameOverView from "../views/GameOverView.jsx";
import { useRoute } from "vue-router";
import { watch } from "vue";

export default function GamePresenter(props) {

    const route = useRoute();

    if (route.params !== undefined) {
        props.model.reJoinSessionURL(useRoute().params.uid, useRoute().params.session);
    }

    // Watch for changes in both yourTurn and playerOrder
    watch(() => props.model.yourTurn, (newYourTurn, oldYourTurn) => {
        // Check if either yourTurn has changed
        if (newYourTurn !== oldYourTurn) {
            handleYourTurnChangeACB(props);
        }
    });

    function handleYourTurnChangeACB(props) {
        // Someone has ended their turn => all users in the game will se the leaderboard
        goTo(`/leader-board/${props.model.user?.uid}/${props.model?.sessionID}`);
    };
    if(props.model.player){
        if (props.model.gameOver) {
            // If the game is over, render the GameOverView
            return <GameOverView
                winner={props.model.winner}
                sessionID={props.model.sessionID}
                leaderboard={props.model.leaderboard}
                routeDestination={`/home/${props.model.user.uid}`}
            />;
        } else {
            // If the game is not over, render the GameView
            return <GameView
                uid={props.model.user.uid}
                sessionID={props.model.sessionID}
                whosTurn={props.model.yourTurn}
                leaderboard={props.model.leaderboard}
                player={props.model.player/*[0]*/}
            />;
        }
    }
}