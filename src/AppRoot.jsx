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
    const router = createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: "/",
                component: <LoginSessionPresenter model={model} />,
                meta: { requiresAuth: false }, // Authentication is required
            }, {
                path: `/login`, //? change from login:ID to login, discuss with team if we need the ID there
                component: <LoginSessionPresenter model={model} />,
                meta: { requiresAuth: false }, // Authentication is required
            }, {
                path: `/home/:uid`,
                component: <UserPresenter model={model} />,
                meta: { requiresAuth: true }, // Authentication is required
            }, {
                path: `/instructions`,  //ALBIN
                component: <InstructionsPresenter model={model} />,
                meta: { requiresAuth: true }, // Authentication is required
            }, {
                path: `/exit`, //? Think if we need the :ID here
                component: <ExitPresenter model={model} />,
                meta: { requiresAuth: true }, // Authentication is required
            }, {
                path: `/join-session/:uid`,
                component: <JoinSessesionPresenter model={model} />,
                meta: { requiresAuth: true }, // Authentication is required
            }, {
                path: `/create-session/:uid`,
                component: <CreateSessionPresenter model={model} />,
                meta: { requiresAuth: true }, // Authentication is required
            }, {
                path: `/lobby/:uid/:session`, //TODO: Discuss if we could include a lobby before starting https://eloking.com/glossary/general/lobby
                component: <div><h1>Lobby</h1></div>, // <Lobby model={model} /> 
                meta: { requiresAuth: true }, // Authentication is required
            }, {
                path: `/game/:uid/:session`, // 
                component: <GamePresenter model={model} />,
                meta: { requiresAuth: true }, // Authentication is required
            }, {//! ================================================ TESTING
                path: `/game-test/:uid/:session`, // 
                component: <GamePresenterTest model={model} />
            }, { //! ================================================ END
                path: `/bluff/:uid/:session`, //previos name cards
                component: <BluffPresenter model={model} />,
                meta: { requiresAuth: true }, // Authentication is required
            }, {
                path: `/session-menu/:uid/:session`, //ALBIN
                component: <SessionMenuPresenter model={model} />,
                meta: { requiresAuth: true }, // Authentication is required
            }, {
                path: `/leader-board/:uid/:session`,
                component: <LeaderBoardPresenter model={model} />,
                meta: { requiresAuth: true }, // Authentication is required
            }, {
                path: `/session-menu-test/:uid/:session`, //! TESTING ROUTE ------ 
                component: <SessionMenuPreObj model={model} />,
                meta: { requiresAuth: true }, // Authentication is required
            }, {
                path: `/:notFound`,
                component: <p> Sorry not Found, find a session to <a href="#/">Login here</a></p>,
                meta: { requiresAuth: false }, // Authentication is required
            }, {
                path: "/test-ui",
                component: <TestUI model={model} />,
                meta: { requiresAuth: true }, // Authentication is required
            }, {
                path: "/design-system",
                component: <DesignSystemPresenter model={model} />,
                meta: { requiresAuth: true }, // Authentication is required
            }, {
                path: `/testing-swiper-vue`,//! TESTING ROUTE ------ for the Swiper by David
                component: <SwiperVue model={model} />,
                meta: { requiresAuth: true }, // Authentication is required
            }
        ]
    });

    // Redirect to login page if authentication is required and user is not logged in
    router.beforeEach((to, from, next) => {
        if (to.meta.requiresAuth) {
            // Check if the route requires authentication
            if (!model.user) {
                // Redirect to login page if user is not logged in
                next("/login");
            } else {
                // Check if the route has a user parameter
                const routeUserID = to.params.user;
                console.log("routeUserID: ", routeUserID)
                
                if (routeUserID !== undefined) {
                    // Compare the userID in the route with the authenticated user's uid
                    const authenticatedUserID = model.user.uid;
                    
                    console.log("authenticatedUserID: ", authenticatedUserID)
        
                    if (routeUserID !== authenticatedUserID) {
                        // Redirect to login page if user tries to access another user's route
                        next("/login");
                    } else {
                        // Allow navigation to the intended route
                        next();
                    }
                } else {
                    // If the route doesn't have a user parameter, allow navigation
                    next();
                }
            }
        } else {
            // For routes that don't require authentication, allow navigation
            next();
        }
    });

    return router;
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