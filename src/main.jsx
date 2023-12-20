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
import { useRoute } from "vue-router";

//?---------------------------------------- thirparty component

// Initialize Firebase
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

const ReactiveModel = reactive(sessionModel);

async function initializeApp() {
  connectToFirebase(ReactiveModel, watch);
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
