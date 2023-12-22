import { useRoute } from "vue-router";
import SessionMenuView from "../views/SessionMenuView.jsx";
import { getPlayerNamesFromIDs } from "../utilities.js";
import { getPlayerData } from "../firebaseModel.js";
import resolvePromise from "../resolvePromise.js";
import { watch } from "vue";


export default function SessionMenuPresenter(props) {

    const route = useRoute();

    if (route.params !== undefined) {
        props.model.reJoinSessionURL(useRoute().params.uid, useRoute().params.session);
    }

    //* A view needs to bubbles all the events that change model data

    //* For every custom event, the presenter needs a function to make the change
    function skipPlayer() {
        props.model.nextPlayer();
    }
    //*Joins a session when reloads

    async function joinSessionACB(sessionIdURLparam, playerNameURLparam) {
        // Call the createPlayer function on the model with the input value. Not host
        //await props.model.reJoinSessionURL(sessionIdURLparam, playerNameURLparam); // Assuming the player is not the host
    }


    function createPlayerOrderNames(playerID) {
        const localPromiseState = {}
        resolvePromise(getPlayerData(useRoute().params.id, playerID), localPromiseState);
        if (!localPromiseState.data)
            return localPromiseState.data;
    }

    const playerOrderNames = props.model.playerOrder.map(createPlayerOrderNames);

    //getPlayerNamesFromIDs(props.model.playerOrder);

    joinSessionACB(useRoute().params.id, useRoute().params.user);
    //*The presenter passes only the necesarry varaibles
    return <SessionMenuView
        onSkip={skipPlayer}
        sessionID={props.model.sessionID}
        player={props.model.player/*[0]*/}
        playerOrder={props.model.playerOrder}
        leaderboard={props.model.leaderboard}
        whosTurn={props.model.yourTurn}
        whosHost={props.model.playerHost}
        playerHost={props.model.playerHost}
        currentBluffler={props.model.yourTurn /* An alternative for the name*/}
    />
}