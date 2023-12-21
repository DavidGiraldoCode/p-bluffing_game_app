import { goTo } from "../utilities.js";
import GameView from "../views/GameView.jsx";
import GameOverView from "../views/GameOverView.jsx";
import { useRoute } from "vue-router";
import { onMounted, watch } from "vue";

const GamePresenterTest = {
    props: ["model"],
    componentes: {
        GameView,
        GameOverView
    },
    setup(props) {

        function renderACB() {

            const route = useRoute();
            console.log("Render of the GamePresenterTest");
            console.log(route);
            console.log(route.params);

            if (route.params !== undefined) {
                console.log("Have Params", route.params.uid, " / ", route.params.session);
                props.model.reJoinSessionURL(useRoute().params.uid, useRoute().params.session);
            }

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

        //onMounted(bornACB);
        function bornACB() {
            const route = useRoute();
            console.log("Have mounted the GamePresenterTest");
            console.log(route);
            console.log(route.params);
            if (useRoute().params !== undefined) {
                console.log("Have Params", useRoute().params.uid, " / ", useRoute().params.session);
                props.model.reJoinSessionURL(useRoute().params.uid, useRoute().params.session);
            }
        }

        return renderACB;
    },
};

export default GamePresenterTest;