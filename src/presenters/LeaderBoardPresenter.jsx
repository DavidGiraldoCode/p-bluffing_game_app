import LeaderBoardView from "../views/LeaderBoardView.jsx";
import GameOverView from "../views/GameOverView.jsx";

export default function LeaderBoardPresenter(props) {

    const route = useRoute();
    console.log("Render of the LeaderBoardPresenter");
    console.log(route);
    console.log(route.params);

    if (route.params !== undefined) {
        console.log("Have Params", route.params.uid, " / ", route.params.session);
        props.model.reJoinSessionURL(useRoute().params.uid, useRoute().params.session, watch);
    }

    if (props.model.gameOver) {
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
            routeDestination={`/game/${props.model.user.uid}/${props.model.sessionID}`} />
    }
}