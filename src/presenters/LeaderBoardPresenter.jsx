import LeaderBoardView from "../views/LeaderBoardView.jsx";
import GameOverView from "../views/GameOverView.jsx";
import { goTo } from "../utilities.js";

export default function LeaderBoardPresenter(props) {

    async function onButtonClickACB(route){
        if (props.model.gameOver){
            console.log("Reseting model")
            await props.model.reset();
            goTo(route)
        }else{
            console.log("Normal redirect")
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
            routeDestination={`/game/${props.model.sessionID}/${props.model.user.uid}`} />
        }
}