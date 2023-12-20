import { createRouter, createWebHashHistory, RouterView, useRoute } from "vue-router"; //run: npm i vue-router
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
import { onMounted, watch } from "vue";


import DesktopView from "./views/DesktopView.jsx";
import { useMediaQuery } from '@vueuse/core'

import GamePresenterTest from "./presenters/GamePresenterTest.jsx";

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
                path: `/home/:uid`, //? change from user:ID to home:ID, discuss with team
                component: <UserPresenter model={model} />
            }, {
                path: `/instructions`,  //ALBIN
                component: <InstructionsPresenter model={model} />
            }, {
                path: `/exit`, //? Think if we need the :ID here
                component: <ExitPresenter model={model} />
            }, {
                path: `/join-session/:uid`, //TODO: Implement OAuth after reload
                component: <JoinSessesionPresenter model={model} />
            }, {
                path: `/create-session/:uid`, //TODO: Implement OAuth after reload
                component: <CreateSessionPresenter model={model} />
            }, {
                path: `/lobby/:uid/:session`, //TODO: Discuss if we could include a lobby before starting https://eloking.com/glossary/general/lobby
                component: <div><h1>Lobby</h1></div> // <Lobby model={model} /> 
            }, {
                path: `/game/:uid/:session`, // 
                component: <GamePresenter model={model} />
            }, {//! ================================================ TESTING
                path: `/game-test/:uid/:session`, // 
                component: <GamePresenterTest model={model} />
            }, { //! ================================================ END
                path: `/bluff/:uid/:session`, //previos name cards
                component: <BluffPresenter model={model} />
            }, {
                path: `/session-menu/:uid/:session`, //ALBIN
                component: <SessionMenuPresenter model={model} />
            }, {
                path: `/leader-board/:uid/:session`,
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

export default {
    name: 'AppRoot', // Optional: Provide a name for the component
    props: ["model"],
    components: {
        RouterView,
        DesktopView
    },
    setup(props) {
        const isLargeScreen = useMediaQuery('(min-width: 720px)');
        //console.log('Test largescreen', isLargeScreen);

        /*console.log("useRoute() ", useRoute());
        if (useRoute().params !== undefined) {
            console.log("Have Params", useRoute().params.uid, " / ", useRoute().params.session);
            props.model.reJoinSessionURL(useRoute().params.uid, useRoute().params.session, watch);
        }*/

        function bornACB() {
            const route = useRoute();
            console.log("Have mounted the AppRoot");
            console.log(route);
            console.log(route.params);
        }
        //onMounted(bornACB);

        return {
            isLargeScreen,
        };
    },

    render() {
        return (
            <div class="AppRoot container">
                {/* Check the screen size */}
                {this.isLargeScreen ? <DesktopView /> : <RouterView />}
            </div>
        );
    },
};

/* AppRoot without MediaQuery 
export default
    function AppRoot(props) {
    console.log('Update App!')

    // Persistency if player refreshes page.
    if (props.model.player === null && useRoute().params.id && useRoute().params.user) {
        props.model.reJoinSessionURL(useRoute().params.id, useRoute().params.user, watch);
    } else {
    }

    return (
        <div class="AppRoot container">
            <RouterView />
        </div>
    );
}
*/