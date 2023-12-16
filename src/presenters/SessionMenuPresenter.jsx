import SessionMenuView from "../views/SessionMenuView.jsx";

export default function SessionMenuPresenter(props) {
    //* A view needs to bubbles all the events that change model data

    //* For every custom event, the presenter needs a function to make the change
    function skipPlayer() {
        props.model.nextPlayer();
    }

    //*The presenter passes only the necesarry varaibles
    return <SessionMenuView
        onSkip={skipPlayer}
        sessionID={props.model.sessionID}
        player={props.model.player[0]}
        playerOrder={props.model.playerOrder}
        leaderboard={props.model.leaderboard}
        whosTurn={props.model.yourTurn}
        whosHost={props.model.playerHost}
        playerHost={props.model.playerHost}
        currentBluffler={props.model.yourTurn /* An alternative for the name*/}
    />
}