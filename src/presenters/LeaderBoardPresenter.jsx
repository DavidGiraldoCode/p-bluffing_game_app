import LeaderBoardView from "../views/LeaderBoardView.jsx";

export default function LeaderBoardPresenter(props) {

    return <LeaderBoardView 
    sessionID={props.model.sessionID}
    leaderboard={props.model.leaderboard}

    
    routeDestination={`/game:${props.model.sessionID}`}/>
}