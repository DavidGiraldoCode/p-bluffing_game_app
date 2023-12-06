import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue, update, child, push } from "firebase/database";

import firebaseConfig from "./firebaseConfig.js";
import { sessionModel } from "./SessionModel.js";

const firebaseApp = initializeApp(firebaseConfig);
const realTimeDB = getDatabase(firebaseApp);
const PATH = 'sessions/';
const refDB = ref(realTimeDB, PATH);


function modelToPersistance(model) {
    // Converts the model into the data that will be stored in Firebase. Returns this data.
    return {
        sessionIDFB: model.sessionID, 
        playerOrderFB: model.playerOrder,
        yourTurnFB: model.yourTurn,
        gameOverFB: model.gameOver,
    };
}

function persistanceToModel(firebaseData, model) {
    // Converts the data from Firebase and saves to the model
    if (firebaseData) {
        model.gameOver = firebaseData?.gameOverFB;
        model.yourTurn = firebaseData?.yourTurnFB || null;
        model.playerOrder = firebaseData.playerOrderFB || [];

        // Check if firebaseData.playersFB exists before using Object.values
        if (firebaseData.playersFB) {
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
}


//! TESTING
async function saveToFirebase(model) {
    // Checks that the model is ready to be saved and then calls modelToPersistance and saves that data to Firebase.
    if (model.ready && model.readyToWriteFB) {
        const refDB = ref(realTimeDB, PATH + "/" + model.sessionID);
        update(refDB, modelToPersistance(model));
        // Get the current playersFB array from Firebase
        const playersSnapshot = await get(child(refDB, "playersFB"));
        const currentPlayers = playersSnapshot.val() || {};

        // Add new players from model.players to the current playersFB array
        model.players.forEach(player => {
            currentPlayers[player.playerID] = {
                playerNameFB: player.playerName,
                numberOfCardsFB: player.numberOfCards,
                // Add other properties as needed
            };
        });

        // Save the updated playersFB array back to Firebase
        set(child(refDB, "playersFB"), currentPlayers);

        // Update the rest of the model data
        
    }
}
//! END OF TESTING

/*
function saveToFirebase(model) {
    // Checks that the model is ready to be saved and then calls modelToPersistance and saves that data to firebase.
    if(model.ready && model.readyToWriteFB){    //saves to firebase
        const refDB = ref(realTimeDB, PATH+"/"+model.sessionID);
        update(refDB, modelToPersistance(model)); //refDB defined above
    };
}*/

async function readFromFirebase(model) {
    // If a snapshot from firebase is valid, calls for persistanceToModel. Then sets the model to ready.
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
    // Observse the model for changes. When a change has been noticed on firebase, persistanceToModel is called.
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
    // Checks so that the model has a valid sessionID. When that is the case, setupFirebase is called.
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
    // Calls readFromFirebase to set model to ready. Always observing changes from the model on players, playerOrder, yourTurn, gameOver. If a change has been made on the model
    // saveToFirebase is called. Lastely calls observeFirebaseModel to check for changes on the database.

    let updatingFirebase = false;

    readFromFirebase(model);
    watchFunctionACB(modelChangeCheckACB, updateFirebaseACB);

    function modelChangeCheckACB() {
        // players: model.players.map(player => ({playerID: player.playerID, ....}))
        if (!updatingFirebase) {
            return [
                model.players.map(player => ({ playerID: player.playerID, numberOfCards: player.numberOfCards })),
                model.playerOrder,
                model.yourTurn,
                model.gameOver,
                model.readyToWriteFB,
            ];
        }
    }

    async function updateFirebaseACB() {
        // Set the flag to prevent further updates until this one completes
        updatingFirebase = true;

        await saveToFirebase(model);

        // Reset the flag after the update is complete
        updatingFirebase = false;
    }
    observeFirebaseModel(model);
}


export { modelToPersistance, persistanceToModel, saveToFirebase, readFromFirebase, observeFirebaseModel };

export default connectToFirebase;