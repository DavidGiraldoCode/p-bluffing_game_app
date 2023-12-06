import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue } from "firebase/database";

import firebaseConfig from "./firebaseConfig.js";
import { sessionModel } from "./SessionModel.js";

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
    if (firebaseData) {
        model.gameOver = firebaseData?.gameOverFB;
        model.yourTurn = firebaseData?.yourTurnFB || null;
        model.playerOrder = firebaseData.playerOrderFB || [];
        
        // Build leaderboard dictionary
        const leaderboard = Object.values(firebaseData.playersFB).reduce((acc, playerData) => {
            const playerName = playerData.playerNameFB;
            const numberOfCards = playerData.numberOfCardsFB;
            
            acc[playerName] = numberOfCards;
            
            return acc;
        }, {});
        model.leaderboard = leaderboard;
    }
}

function saveToFirebase(model) {
    if(model.ready){    //saves to firebase
        const refDB = ref(realTimeDB, PATH+"/"+model.sessionID);
        set(refDB, modelToPersistance(model)); //refDB defined above
    };
}

async function readFromFirebase(model) {
    model.ready = false;
    //? check for child( path, string)
    const PATH = `sessions/${model.sessionID}`;
    const refDB = ref(realTimeDB, PATH);

    function resolveSnapshotACB(snapshot) {
        if (snapshot.exists())
            persistanceToModel(snapshot.val(), model);
        if (!snapshot.exists())
            console.log('No Data on RealTime Database');
    }

    function setModelToReadyACB() {
        model.ready = true;
    }

    return get(refDB)
        .then(resolveSnapshotACB)
        .then(setModelToReadyACB);
}

function observeFirebaseModel(model) {
    model.ready = false;
    const SESSION_PATH = `sessions/${model.sessionID}`;
    const refSession = ref(realTimeDB, SESSION_PATH);

    function resolveSnapshotACB(snapshot) {
        if (!snapshot.exists()) {
            console.log(`No Data on RealTime Database at path: ${SESSION_PATH}`);
            return;
        }

        persistanceToModel(snapshot.val(), model);
        model.ready = true;
    }

    return onValue(refSession, resolveSnapshotACB);
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
        //console.log("sideEffect triggered, model: ", model);
        saveToFirebase(model);
    }
    observeFirebaseModel(model);
}


export { modelToPersistance, persistanceToModel, saveToFirebase, readFromFirebase, observeFirebaseModel };

export default connectToFirebase;