import { createRouter, createWebHashHistory, RouterView, useRouter } from "vue-router"; //run: npm i vue-router
import TestUI from "./components/TestUI";
import DesignSystemPresenter from "./presenters/DesignSystemPresenter";

export function makeRouter(model) {
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
                component: <div>Join Dafault</div>
            }
            , {
                path: "/join",
                component: <div>Join</div>
            }
            , {
                path: "/create-session",
                component: <div>CreateSession</div>
            }, {
                path: "/cards",
                component: <div>Cards</div>
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
                component: <div>
                    Sorry not Found, find a session to <a href="#/join">join here</a>
                    </div>,
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