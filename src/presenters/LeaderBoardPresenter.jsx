import LeaderBoardView from "../views/LeaderBoardView.jsx";
import GameOverView from "../views/GameOverView.jsx";

export default function LeaderBoardPresenter(props) {



    if (props.model.gameOver) {
        // If the game is over, render the GameOverView
        return <GameOverView 
            winner={props.model.winner}
            sessionID={props.model.sessionID}
            leaderboard={props.model.leaderboard}
            routeDestination={`/home/${props.model.user.uid}`} />
        } else {
        return <LeaderBoardView
            sessionID={props.model.sessionID}
            leaderboard={props.model.leaderboard}
            routeDestination={`/game/${props.model.sessionID}/${props.model.user.uid}`} />
        }
}