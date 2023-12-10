import "./firebaseModel.js"; //? Runs the firebase instance
import connectToFirebase from "./firebaseModel.js";
import { observeValue } from "./firebaseModel.js";
import { createApp, reactive, watch } from "vue"
import "./style.css";
import "./global-style.css";
import "./test-style.css";
import App from "./App.jsx";
import { makeRouter } from "./App.jsx";
import { sessionModel } from "./SessionModel.js";

//?---------------------------------------- thirparty component
//import { register } from 'swiper/element/bundle';
//register(); //thirparty component
//?---------------------------------------- thirparty component

//* ----------------------------- Updates
// main.js changed to main.jsx to use <App> syntaxis
//* ----------------------------- 

//! ----------------------------- Test
/*const miniModel = { //! You can remove this once you connect the real model
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
}*/
//! -----------------------------
const testReactiveModel = reactive(sessionModel);
/*
watch(checkACB,sideEffectACB);

function checkACB(){ //? invoke after every reactive object changes
    console.log("watch");
    return [testReactiveModel.numberOfPlayers];
}

function sideEffectACB(){
    console.log("Side Effect triggered");
} */

const rootJSX = <App model={testReactiveModel} />
const app = createApp(rootJSX);
app.use(makeRouter(testReactiveModel));
app.mount('#app');

//? Connection to Firebase, missing the reactiveModel and reaction
connectToFirebase(testReactiveModel, watch);
