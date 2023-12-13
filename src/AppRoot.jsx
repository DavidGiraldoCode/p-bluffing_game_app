import { createRouter, createWebHashHistory, RouterView, useRouter } from "vue-router"; //run: npm i vue-router
import TestUI from "./components/TestUI.jsx";
import DesignSystemPresenter from "./presenters/DesignSystemPresenter.jsx";
import JoinSessesionPresenter from "./presenters/JoinSessionPresenter.jsx"
import GamePresenter from "./presenters/GamePresenter.jsx";
import ExitPresenter from "./presenters/ExitPresenter.jsx";
import InstructionsPresenter from "./presenters/InstructionsPresenter.jsx";
import SessionMenuPresenter from "./presenters/SessionMenuPresenter.jsx";
import CreateSessionPresenter from "./presenters/CreateSessionPrenter.jsx";

export function makeRouter(model) {
    console.table(model);
    return createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: "/test-ui",
                component: <TestUI model={model} />
            },
            {
                path: "/design-system",
                component: <DesignSystemPresenter model={model} />
            }, {
                path: "/", //TODO change for new login with google view
                component: <JoinSessesionPresenter model={model} />
            }
            , {
                path: `/join:ID`,
                component: <JoinSessesionPresenter model={model} />
            }
            , {
                path: `/create-session:ID`, //TODO Possiblily will be remove
                component: <CreateSessionPresenter />
            }, {
                path: `/game:ID`, //previos name cards
                component: <GamePresenter model={model} />
            }, {
                path: `/session-menu:ID`, //ALBIN
                component: <SessionMenuPresenter model={model} />
            }, {
                path: `/instructions:ID`,  //ALBIN
                component: <InstructionsPresenter model={model} />

            }, {
                path: `/exit:ID`, //ALBIN Done
                component: <ExitPresenter model={model} />
            }, {
                path: `/leader-board:ID`,
                component: <div>LeaderBoard</div>
            }, {
                path: `/:notFound`,
                component: <p>
                    Sorry not Found, find a session to <a href="#/join:ID">join here</a>
                </p>,
            },
        ]
    })
}

export default
    function AppRoot(props) {
    console.log('Update App!')
    makeRouter(props.model);
    return (
        <div class="AppRoot container">
            <RouterView />
        </div>
    );
}