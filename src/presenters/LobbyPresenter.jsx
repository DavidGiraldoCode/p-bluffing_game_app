import LobbyView from "../views/LobbyView";
import { getPlayerNamesFromIDs } from "../utilities";

export default function LobbyPresenter(props){

    function onCustomClickHandlerACB(userID, sessionID){

    }

    return <LobbyView
        sessionID = {props.model.sessionID}
        playerNames = {getPlayerNamesFromIDs(props.model.playerOrder)}
        onCustomClickACB = {onCustomClickHandlerACB(props.model.user.uid, props.model.sessionID)}

    />

}