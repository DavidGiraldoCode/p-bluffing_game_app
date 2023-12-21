import LeaderBoardView from "../views/LeaderBoardView.jsx";
import GameOverView from "../views/GameOverView.jsx";
import { goTo } from "../utilities.js";
import { useRoute } from "vue-router";

export default function LeaderBoardPresenter(props) {

    const route = useRoute();

    if (route.params !== undefined) {
        props.model.reJoinSessionURL(useRoute().params.uid, useRoute().params.session);

    } 
    async function onButtonClickACB(route){
        if (props.model.gameOver){
            console.log("Reseting model!")
            await props.model.reset();
            goTo(route)
        }else{
            goTo(route)
        }
    }

    if (props.model.gameOver) {
        return <LeaderBoardView
            gameOver={props.model.gameOver}
            winner={props.model.winner}
            title={"Game Over"}
            btnLabel={"Exit"}
            sessionID={props.model.sessionID}
            leaderboard={props.model.leaderboard}
            onButtonClick={onButtonClickACB}
            routeDestination={`/home/${props.model.user.uid}`} />
    } else {
        return <LeaderBoardView
            gameOver={props.model.gameOver}
            winner={props.model.winner}
            title={""}
            btnLabel={"Continue"}
            sessionID={props.model.sessionID}
            leaderboard={props.model.leaderboard}
            onButtonClick={onButtonClickACB}
            routeDestination={`/game/${props.model.user.uid}/${props.model.sessionID}`} />
        }
}