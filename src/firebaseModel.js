import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue } from "firebase/database";

import firebaseConfig from "./firebaseConfig.js";
import { sessionModel } from "./SessionModel.js";

console.log('Inside firebaseModel.js');
const firebaseApp = initializeApp(firebaseConfig);
const realTimeDB = getDatabase(firebaseApp);
const PATH = 'sessions';
const refDB = ref(realTimeDB, PATH);

//! ----------------------------- Test
const miniModel = { //! You can remove this once you connect the real model
    sessionID: "test1",
    players: [{
        playerID: 'someID1',
        isHost: true,
        pileOfCards: ['KH', '8C', '6H'],
        selectedCard: null,
    }, {
        playerID: 'someID2',
        isHost: false,
        pileOfCards: ['KH', '8C', '6H'],
        selectedCard: null,
    }, {
        playerID: 'someID3',
        isHost: false,
        pileOfCards: ['KH', '8C', '6H'],
        selectedCard: null,
    }],
    numberOfPlayers: 3,
}
//! ----------------------------- Test

function modelToPersistance(model) {
    return {
        [model.sessionID]: {

            sessionIDFB: model.sessionID, 
            playersFB: model.players.map(player => ({
            playerIDFB: player.playerID,
            playerNameFB: player.playerName,
            isHostFB: player.isHost,
            numberOfCardsFB: player.numberOfCards,
                })),
            playerOrderFB: model.playerOrder,
            yourTurnFB: model.yourTurn,
            gameOverFB: model.gameOver,
        }
    };
}

function persistanceToModel(firebaseData, model) {
    // TODO
}

function saveToFirebase(model) {
    if(model.ready){    //saves to firebase
        set(refDB, modelToPersistance(model)); //refDB defined above
    };
}

function readFromFirebase(model) {
    model.ready = false;
    //? check for child( path, string)

    function resolveSnapshotACB(snapshot) {
        if (snapshot.exists())
            persistanceToModel(snapshot.val(), model);
        if (!snapshot.exists())
            console.error('No Data on RealTime Database');
    }

    function setModelToReadyACB() {
        model.ready = true;
    }

    return get(refDB)
        .then(resolveSnapshotACB)
        .then(setModelToReadyACB);
}

function observeValue(model, valueToObserve) {
    console.log(`Observing changes in: ${valueToObserve}`);
    model.ready = false;
    const VALUE_PATH = valueToObserve;
    const refValue = ref(realTimeDB, `sessionTest/${VALUE_PATH}`);

    function resolveSnapshotACB(snapshot) {
        if (!snapshot.exists())
            console.error('No Data on RealTime Database');

        if (snapshot.exists()) {
            console.log(`New value of ${valueToObserve}: ${snapshot.val()}`);
            persistanceToModel(snapshot.val(), model);
            model.ready = true;
        }
    }
    return onValue(refValue, resolveSnapshotACB);
}

function connectToFirebase(model, watchFunctionACB) {
    readFromFirebase(model);
    watchFunctionACB(modelChangeCheckACB, updateFirebaseACB)
    function modelChangeCheckACB(){
        console.log("modelChangeCheckACB");
        // TODO implement the numberOfCards attribute. is it even possible?
        // players: model.players.map(player => ({playerID: player.playerID, ....}))
        return [model.players.map(player => ({playerID: player.playerID, numberOfCards: player.numberOfCards})), model.playerOrder, model.yourTurn, model.gameOver];
    }
    function updateFirebaseACB(){
        console.log("sideEffect triggered, model: ", model);
        saveToFirebase(model);
    }
    //observeValue({}, "numberOfPlayers");
    //observeValue({}, "players/0/pileOfCards");
    //set(refDB, miniModel);
}


export { modelToPersistance, persistanceToModel, saveToFirebase, readFromFirebase, observeValue };

export default connectToFirebase;