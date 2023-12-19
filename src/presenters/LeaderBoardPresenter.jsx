import LeaderBoardView from "../views/LeaderBoardView.jsx";
import GameOverView from "../views/GameOverView.jsx";

export default function LeaderBoardPresenter(props) {

/*
<GameOverView 
            winner={props.model.winner}
            sessionID={props.model.sessionID}
            leaderboard={props.model.leaderboard}
            routeDestination={`/home/${props.model.user.uid}`} />
*/

    if (props.model.gameOver) {
        // If the game is over, render the GameOverView
        return <LeaderBoardView
            gameOver={props.model.gameOver}
            winner={props.model.winner}
            title={"Game Over"}
            btnLabel={"Exit"}
            sessionID={props.model.sessionID}
            leaderboard={props.model.leaderboard}
            routeDestination={`/home/${props.model.user.uid}`} />
        } else {
        return <LeaderBoardView
            gameOver={props.model.gameOver}
            winner={props.model.winner}
            title={""}
            btnLabel={"Continue"}
            sessionID={props.model.sessionID}
            leaderboard={props.model.leaderboard}
            routeDestination={`/game/${props.model.sessionID}/${props.model.user.uid}`} />

        }
}