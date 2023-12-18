import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue, update, child, remove } from "firebase/database";

import firebaseConfig from "./firebaseConfig.js";

// =================================== Firebase Initialization  ==========================================

const firebaseApp = initializeApp(firebaseConfig);
const realTimeDB = getDatabase(firebaseApp);

// =================================== Firebase Paths ==========================================

const PATH = 'sessions/';
const refDB = ref(realTimeDB, PATH);

// =================================== Statistics Functions ==========================================

async function playerFBCounter(){
    // Add one number to the firebase player counter. This does not have any session functionality. Only purpose for statistics.
    const refDBCounter = ref(realTimeDB, 'statistics/');
    const counterSnapshot = await get(child(refDBCounter, "playersCounter"));
    let counter = counterSnapshot.val() || 0;

    counter++;
    // Save the updated counter back to Firebase
    set(child(refDBCounter, "playersCounter"), counter);
}

async function sessionFBCounter(){
    // Add one number to the firebase session counter. This does not have any session functionality. Only purpose for statistics.
    const refDBCounter = ref(realTimeDB, 'statistics/');
    const counterSnapshot = await get(child(refDBCounter, "sessionCounter"));
    let counter = counterSnapshot.val() || 0;

    counter++;
    // Save the updated playersFB array back to Firebase
    set(child(refDBCounter, "sessionCounter"), counter);
}

// =================================== Session Validation Functions ==========================================

async function deleteSessionFromFB(model) {
    // Sets readyToWrite to false and then deletes the session on firebase.
    //! BUG: playersFB does not get deleted?
    model.readyToWriteFB = false;
    // Reference to the session in the database
    console.log("PATH : ", PATH + model.sessionID);
    const sessionRef = ref(realTimeDB, PATH + "/" + model.sessionID);

    // Remove the session from the database
    remove(sessionRef);

    // If successful, log a message
    console.log(`Session with ID ${model.sessionID} deleted from Firebase.`);
}

async function checkValidSessionID(sessionID){
    //Checks wether the sessionID is already created on firebase and valid
    //Returns true if sessionID is valid on firebase

    const sessionsSnapshot = await get(refDB);
    const currentSessions = sessionsSnapshot.val() || {};

    const sessionIDarray = Object.keys(currentSessions);
    return sessionIDarray.includes(sessionID);
}

async function checkIfPlayerExists(sessionID, userID){
    // Assuming the sessionID exists in firebase:
    // Checks wether a player exists in a session or not
    // Returns true if player exists in the session
    const playersRef = ref(realTimeDB, PATH + "/" + sessionID + "/playersFB");
    const playersSnapshot = await get(playersRef);
    const currentPlayers = playersSnapshot.val() || {};
    const playersArray = Object.keys(currentPlayers);
    return playersArray.includes(userID);

}

// =================================== Player Data Functions ==========================================

async function getPlayerData(sessionID, userID){
    const playerRef = ref(realTimeDB, PATH + "/" + sessionID + "/playersFB" + "/"+ userID);
    const playerSnapshot = await get(playerRef);
    const player = playerSnapshot.val() || {};
    return player;
}

async function checkHostFB(sessionID, userID){
    const playerHostRef = ref(realTimeDB, PATH + "/" + sessionID + "/playerHostFB");
    const playerHostSnapshot = await get(playerHostRef);
    const hostID = playerHostSnapshot.val() || {};
    return (hostID == userID);

}

// =================================== Model Conversion Functions ==========================================

function modelToPersistance(model) {
    // Converts the model into the data that will be stored in Firebase. Returns this data.
    return {
        sessionIDFB: model.sessionID, 
        playerOrderFB: model.playerOrder,
        yourTurnFB: model.yourTurn,
        playerHostFB: model.playerHost,
        gameOverFB: model.gameOver,
        winnerFB: model.winner,
    };
}

function persistanceToModel(firebaseData, model) {
    // Converts the data from Firebase and saves to the model
    if (firebaseData) {
        model.gameOver = firebaseData?.gameOverFB;
        model.yourTurn = firebaseData?.yourTurnFB || null;
        model.playerHost = firebaseData?.playerHostFB || null;
        model.playerOrder = firebaseData?.playerOrderFB || [];
        model.winner = firebaseData?.winnerFB || null;

        // Check if firebaseData.playersFB exists before using Object.values
        if (firebaseData.playersFB) {
            // Build leaderboard dictionary
            const leaderboard = Object.values(firebaseData.playersFB).reduce((acc, playerData) => {
                const playerID = playerData.playerIdFB;
                const playerName = playerData.playerNameFB;
                const numberOfCards = playerData.numberOfCardsFB;

                acc[playerID] = {playerName, numberOfCards};

                return acc;
            }, {});

            model.leaderboard = leaderboard;
        }
    }
}

// =================================== Firebase Interaction Functions ==========================================

async function savePlayersFB(model){
    // Updates the playersFB on firebase.
    // Fetches the playersFB from firebase, adds the local copy of players, then saves to FB.

    const refDB = ref(realTimeDB, PATH + "/" + model.sessionID);
    const playersSnapshot = await get(child(refDB, "playersFB"));
    const currentPlayers = playersSnapshot.val() || {};

    // Add new players from model.players to the current playersFB array
    model.player.forEach(player => {
        currentPlayers[player.playerID] = {
            playerNameFB: player.playerName,
            numberOfCardsFB: player.numberOfCards,
            playerIdFB: player.playerID,
            // Add other properties as needed
        };
    });
    // Save the updated playersFB array back to Firebase
    set(child(refDB, "playersFB"), currentPlayers);
}

async function saveToFirebase(model) {
    // Checks that the model is ready to be saved and then calls modelToPersistance and saves that data to Firebase.
    // Also calls savePlayersFB to save all playersFB
    if (model.ready && model.readyToWriteFB) {
        const refDB = ref(realTimeDB, PATH + "/" + model.sessionID);
        update(refDB, modelToPersistance(model));
        savePlayersFB(model);
        
    }
}

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
        console.log("Observed a change!")
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

    readFromFirebase(model);
    watchFunctionACB(modelChangeCheckACB, updateFirebaseACB);

    function modelChangeCheckACB() {
        // players: model.player.map(player => ({playerID: player.playerID, ....}))
        return [
            model.player.map(player => ({ playerID: player.playerID, numberOfCards: player.numberOfCards })),
            model.playerOrder,
            model.yourTurn,
            model.gameOver,
            model.winner,
            model.playerHost,
            model.readyToWriteFB,
        ];
    }

    async function updateFirebaseACB() {
        await saveToFirebase(model);
    }
    observeFirebaseModel(model);
}


export { modelToPersistance, persistanceToModel, saveToFirebase, readFromFirebase, observeFirebaseModel, checkValidSessionID, checkIfPlayerExists, getPlayerData, playerFBCounter, sessionFBCounter, checkHostFB, deleteSessionFromFB};

export default connectToFirebase;