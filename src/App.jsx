import { createRouter, createWebHashHistory, RouterView, useRouter } from "vue-router"; //run: npm i vue-router
import TestUI from "./components/TestUI";
import DesignSystemPresenter from "./presenters/DesignSystemPresenter";
import JoinSessesionPresenter from "./presenters/JoinSessionPresenter.jsx"
import GamePresenter from "./presenters/GamePresenter.jsx";

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
                path: "/session-menu",
                component: <div>SessionMenu</div>
            }, {
                path: "/instructions",
                component: <div>Instructions</div>
            }, {
                path: "/exit",
                component: <div>Exit</div>
            }, {
                path: "/leader-board",
                component: <div>LeaderBoard</div>
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
    function App(props) {
    console.log('Update App!')
    makeRouter(props.model);
    return (
        <div>
            <RouterView />
        </div>
    );
}