import "./firebaseModel.js"; //? Runs the firebase instance
import connectToFirebase from "./firebaseModel.js";
//import { observeValue } from "./firebaseModel.js";
import { createApp, reactive, watch } from "vue"
import "./style.css";
import "./global-style.css";
//import "./test-style.css";
import AppRoot from "./AppRoot.jsx";
import { makeRouter } from "./AppRoot.jsx";
import { sessionModel } from "./SessionModel.js";

//?---------------------------------------- Google authentication
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//?---------------------------------------- thirparty component
import { register } from 'swiper/element/bundle';

//?---------------------------------------- thirparty component

//! -----------------------------
/*
watch(checkACB,sideEffectACB);
function checkACB(){ //? invoke after every reactive object changes
    console.log("watch");
    return [testReactiveModel.numberOfPlayers];
}
function sideEffectACB(){
    console.log("Side Effect triggered");
} */

// Initialize Firebase
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

const ReactiveModel = reactive(sessionModel);

// Connection to Firebase, missing the reactiveModel and reaction
connectToFirebase(ReactiveModel, watch);

// Check authentication status before creating the app
async function initializeApp() {
  //register(); //?thirparty component
  await ReactiveModel.checkAuthStatus();
  const rootJSX = <AppRoot model={ReactiveModel} />;
  const app = createApp(rootJSX);
  app.use(makeRouter(ReactiveModel));
  window.myModel = ReactiveModel;
  app.mount("#app");
}

// Initialize the app
initializeApp();
