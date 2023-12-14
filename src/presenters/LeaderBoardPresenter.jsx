import LeaderBoardView from "../views/LeaderBoardView.jsx";

export default function LeaderBoardPresenter() {

    return <LeaderBoardView routeDestination={`/game:${12345}`}/>
}