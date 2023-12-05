import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue } from "firebase/database";

import firebaseConfig from "./firebaseConfig.js";
import { sessionModel } from "./SessionModel.js";

console.log('Inside firebaseModel.js');
const firebaseApp = initializeApp(firebaseConfig);
const realTimeDB = getDatabase(firebaseApp);
const PATH = 'sessions/';
const refDB = ref(realTimeDB, PATH);


function modelToPersistance(model) {
    return {
        sessionIDFB: model.sessionID, 
        playersFB: model.players.reduce((acc, player) => {
            acc[player.playerID] = {
                playerIDFB: player.playerID,
                playerNameFB: player.playerName,
                isHostFB: player.isHost,
                numberOfCardsFB: player.numberOfCards,
            };
            return acc;
        }, {}),
        playerOrderFB: model.playerOrder,
        yourTurnFB: model.yourTurn,
        gameOverFB: model.gameOver,
    };
}

function persistanceToModel(firebaseData, model) {
    // TODO
    //model.playerOrder = firebaseData?.playerOrderFB;
    //model.yourTurn = firebaseData?.yourTurnFB;
    //model.gameOver = firebaseData[model.sessionID]?.gameOverFB;   
    console.log("inside persistanceToModel");
    console.log(firebaseData);
    // When I change the gameOverFB value in firebase the console.log above writes out the value
    // This differs from how we did it in the lab (Albin). We got the snapshot as an object which we then accessed the variable of interest.
    // TODO leaderboard should be implemented here
    // The thought is to "convert" the firebaseData to a leaderboard object.
}

function saveToFirebase(model) {
    if(model.ready){    //saves to firebase
        const refDB = ref(realTimeDB, PATH+"/"+model.sessionID);
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
    const refValue = ref(realTimeDB, `${VALUE_PATH}`);

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
    if (model.sessionID) {
        // If a sessionID exists, proceed with Firebase setup
        setupFirebase(model, watchFunctionACB);
    } else {
        // If no sessionID exists, watch for changes in sessionID and set up Firebase once available
        watchFunctionACB(() => [model.sessionID], () => {
            if (model.sessionID) {
                setupFirebase(model, watchFunctionACB);
            }
        });
    }
}

function setupFirebase(model, watchFunctionACB) {
    readFromFirebase(model);
    watchFunctionACB(modelChangeCheckACB, updateFirebaseACB);

    function modelChangeCheckACB() {
        // TODO implement the numberOfCards attribute. is it even possible?
        // players: model.players.map(player => ({playerID: player.playerID, ....}))
        return [
            model.players.map(player => ({ playerID: player.playerID, numberOfCards: player.numberOfCards })),
            model.playerOrder,
            model.yourTurn,
            model.gameOver
        ];
    }

    function updateFirebaseACB() {
        console.log("sideEffect triggered, model: ", model);
        saveToFirebase(model);
    }

    observeValue(model, `sessions/${model.sessionID}/gameOverFB`);
    observeValue(model, `sessions/${model.sessionID}/yourTurnFB`);
    observeValue(model, `sessions/${model.sessionID}/playerOrderFB`);
    observeValue(model, `sessions/${model.sessionID}/playersFB`);
    // TODO listen to playersFB/playerID/numberOfCardsFB. We believe this is solved
}


export { modelToPersistance, persistanceToModel, saveToFirebase, readFromFirebase, observeValue };

export default connectToFirebase;