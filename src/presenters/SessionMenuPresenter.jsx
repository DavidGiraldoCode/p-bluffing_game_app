import SessionMenuView from "../views/SessionMenuView.jsx";

export default function SessionMenuPresenter(props) {

    console.log("SessionMenuPresenter",props.model);
    //* A view needs to bubbles all the events that change model data

    //* For every custom event, the presenter needs a function to make the change
    function skipPlayer() {
        props.model.nextPlayer();
    }

    //*The presenter passes only the necesarry varaibles
    return <SessionMenuView
        onSkip={skipPlayer}
        sessionID={props.model.sessionID}
        playerOrder={props.model.playerOrder}
        playerHost={props.model.playerHost}
        currentBluffler={props.model.yourTurn /* An alternative for the name*/}
    />
}