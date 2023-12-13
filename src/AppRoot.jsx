import { createRouter, createWebHashHistory, RouterView, useRouter } from "vue-router"; //run: npm i vue-router
import TestUI from "./components/TestUI.jsx";
import DesignSystemPresenter from "./presenters/DesignSystemPresenter.jsx";
import JoinSessesionPresenter from "./presenters/JoinSessionPresenter.jsx"
import GamePresenter from "./presenters/GamePresenter.jsx";
import ExitPresenter from "./presenters/ExitPresenter.jsx";
import InstructionsPresenter from "./presenters/InstructionsPresenter.jsx";
import SessionMenuPresenter from "./presenters/SessionMenuPresenter.jsx";
import LeaderBoardPresenter from "./presenters/LeaderBoardPresenter.jsx";

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
                component: <DesignSystemPresenter model={model}/>
            }, {
                path: "/",
                component: <JoinSessesionPresenter model={model}/>
            }
            , {
                path: "/join",
                component: <JoinSessesionPresenter model={model}/>
            }
            , {
                path: "/create-session", //TODO Possiblily will be remove
                component: <h1>Create Session</h1>
            }, {
                path: "/game", //previos name cards
                component: <GamePresenter model={model}/>
            }, {
                path: "/session-menu", //ALBIN
                component: <SessionMenuPresenter model={model}/>
            }, {
                path: "/instructions",  //ALBIN
                component: <InstructionsPresenter model={model}/>
                
            }, {
                path: "/exit", //ALBIN Done
                component: <ExitPresenter model={model}/>
            }, {
                path: "/leader-board", //Oscar Done for TEST
                component: <LeaderBoardPresenter model={model}/>
            }, {
                path: "/:notFound",
                component: <p>
                    Sorry not Found, find a session to <a href="#/join">join here</a>
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