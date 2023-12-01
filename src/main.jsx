import "./firebaseModel.js"; //? Runs the firebase instance
import connectToFirebase from "./firebaseModel.js";
import { observeValue } from "./firebaseModel.js";
import { createApp, reactive } from 'vue'
import './style.css'
import App from './App.jsx'
import { sessionModel } from './SessionModel.js';

//?---------------------------------------- thirparty component
import { register } from 'swiper/element/bundle';
register(); //thirparty component
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
const testReactiveModel = reactive(sessionModel)
//! -----------------------------

const rootJSX = <App model={testReactiveModel} />
const app = createApp(rootJSX);
app.mount('#app');

//? Connection to Firebase, missing the reactiveModel and reaction
connectToFirebase(null, null);
