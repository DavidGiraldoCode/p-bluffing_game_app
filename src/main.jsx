import { createApp, reactive } from 'vue'
import './style.css'
import App from './App.jsx'
import { sessionModel } from './SessionModel.js';

//* ----------------------------- Updates
// main.js changed to main.jsx to use <App> syntaxis
//* ----------------------------- 

//! ----------------------------- Test
const miniModel = { //! You can remove this once you connect the real model
    sessionID: "test",
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
    numberOfPlayer: 3,
}
const testReactiveModel= reactive(sessionModel)
//! -----------------------------

const rootJSX = <App model={testReactiveModel}/>
const app = createApp(rootJSX);
app.mount('#app')
