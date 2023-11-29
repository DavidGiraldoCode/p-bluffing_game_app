import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue } from "firebase/database";
import firebaseConfig from "./firebaseConfig.js";

console.log('Inside firebaseModel.js');
const firebaseApp = initializeApp(firebaseConfig);
const realTimeDB = getDatabase(firebaseApp);
const PATH = "sessionTest";
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
    //TODO
}

function persistanceToModel(firebaseData, model) {
    //TODO
    //console.log(firebaseData);
}

function saveToFirebase(model) {
    //TODO
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

function connectToFirebase(model, watchFuntion) {
    readFromFirebase({});
    observeValue({}, "numberOfPlayers");
    observeValue({}, "players/0/pileOfCards");
    set(refDB, miniModel);
}


export { modelToPersistance, persistanceToModel, saveToFirebase, readFromFirebase, observeValue };

export default connectToFirebase;