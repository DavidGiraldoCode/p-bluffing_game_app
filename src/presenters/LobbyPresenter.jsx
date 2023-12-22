import LobbyView from "../views/LobbyView";
import { goTo } from "../utilities";

export default function LobbyPresenter(props){

    function onCustomClickHandlerACB(){
        goTo(`/game/${props.model.user.uid}/${props.model.sessionID}`);
    }

    return <LobbyView
        sessionID = {props.model.sessionID}
        onCustomClickACB = {onCustomClickHandlerACB}
        leaderboard = {props.model.leaderboard}
        playerOrder = {props.model.playerOrder}
        whosHost = {props.model.playerHost}
    />

}