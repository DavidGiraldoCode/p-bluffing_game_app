import { createRouter, createWebHashHistory, RouterView, useRoute, useRouter } from "vue-router"; //run: npm i vue-router
import TestUI from "./components/TestUI.jsx";
import DesignSystemPresenter from "./presenters/DesignSystemPresenter.jsx";
import JoinSessesionPresenter from "./presenters/JoinSessionPresenter.jsx"
import LoginSessionPresenter from "./presenters/LoginSessionPresenter.jsx";
import UserPresenter from "./presenters/UserPresenter.jsx";
import GamePresenter from "./presenters/GamePresenter.jsx";
import ExitPresenter from "./presenters/ExitPresenter.jsx";
import InstructionsPresenter from "./presenters/InstructionsPresenter.jsx";
import SessionMenuPresenter from "./presenters/SessionMenuPresenter.jsx";
import CreateSessionPresenter from "./presenters/CreateSessionPresenter.jsx";
import LeaderBoardPresenter from "./presenters/LeaderBoardPresenter.jsx";
import SessionMenuPreObj from "./presenters/SessionMenuPreObj.jsx";
import SwiperVue from "./components/SwiperVue.jsx";
import BluffPresenter from "./presenters/BluffPresenter.jsx";
import { watch } from "vue";

export function makeRouter(model) {
    return createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: "/",
                component: <LoginSessionPresenter model={model} />
            }, {
                path: `/login`, //? change from login:ID to login, discuss with team if we need the ID there
                component: <LoginSessionPresenter model={model} />
            }, {
                path: `/home/:ID`, //? change from user:ID to home:ID, discuss with team
                component: <UserPresenter model={model} />
            }, {
                path: `/instructions`,  //ALBIN
                component: <InstructionsPresenter model={model} />
            }, {
                path: `/exit`, //? Think if we need the :ID here
                component: <ExitPresenter model={model} />
            }, {
                path: `/join-session:ID`, //TODO: Implement OAuth after reload
                component: <JoinSessesionPresenter model={model} />
            }, {
                path: `/create-session:ID`, //TODO: Implement OAuth after reload
                component: <CreateSessionPresenter model={model} />
            }, {
                path: `/lobby:ID`, //TODO: Discuss if we could include a lobby before starting https://eloking.com/glossary/general/lobby
                component: <div><h1>Lobby</h1></div> // <Lobby model={model} /> 
            }, {
                path: `/game/:id/:user`, // obu2r2ndjhmu
                component: <GamePresenter model={model} />
            }, {
                path: `/bluff:ID`, //previos name cards
                component: <BluffPresenter model={model} />
            }, {
                path: `/session-menu/:id/:user`, //ALBIN
                component: <SessionMenuPresenter model={model} />
            }, {
                path: `/session-menu-test/:id/:user`, //! TESTING ROUTE ------ 
                component: <SessionMenuPreObj model={model} />
            }, {
                path: `/leader-board:ID`,
                component: <LeaderBoardPresenter model={model} />
            }, {
                path: `/:notFound`,
                component: <p> Sorry not Found, find a session to <a href="#/">Login here</a></p>,
            }, {
                path: "/test-ui",
                component: <TestUI model={model} />
            }, {
                path: "/design-system",
                component: <DesignSystemPresenter model={model} />
            }, {
                path: `/testing-swiper-vue`,//! TESTING ROUTE ------ for the Swiper by David
                component: <SwiperVue model={model} />
            }
        ]
    })
}

export default
    function AppRoot(props) {
    console.log('Update App!')

    //! TODO Checking of the URLs ID
    if (props.model.player === null && useRoute().params.id ) {
        console.log("User re-load brower");
        props.model.reJoinSessionURL(useRoute().params.id, useRoute().params.user, watch);
    } else {
        console.log("Wrong logic!");
    }
    //!

    //makeRouter(props.model);
    return (
        <div class="AppRoot container">
            <RouterView />
        </div>
    );
}