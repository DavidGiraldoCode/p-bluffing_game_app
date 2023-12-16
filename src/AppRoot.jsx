import { createRouter, createWebHashHistory, RouterView, useRouter } from "vue-router"; //run: npm i vue-router
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
import SwiperPresenter from "./presenters/SwiperPresenter.jsx";
import SwiperVue from "./components/SwiperVue.jsx";
import BluffPresenter from "./presenters/BluffPresenter.jsx";

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
                component: <DesignSystemPresenter model={model} />
            }, {
                path: "/",
                component: <LoginSessionPresenter model={model} />
            }
            , {
                path: `/join`,
                component: <JoinSessesionPresenter model={model} />
            }
            ,   {
                path: `/login:ID`,
                component: <LoginSessionPresenter model={model} />
            }
            ,   {
                path: `/user:ID`,
                component: <UserPresenter model={model} />
            }
            , {
                path: `/create-session`, //TODO Possiblily will be remove
                component: <CreateSessionPresenter model={model}/>
            },{
                path: `/game:ID`, //previos name cards
                component: <GamePresenter model={model} />
            },{
                path: `/testing-swiper-vue`,//! TESTING ROUTE ------ for the Swiper by David
                component: <SwiperVue model={model} />
            }, {
                path: `/bluff:ID`, //previos name cards
                component: <BluffPresenter model={model} />
            }, {
                path: `/session-menu:ID`, //ALBIN
                component: <SessionMenuPresenter model={model} />
            },{
                path: `/session-menu-test/:id/:user`, //! TESTING ROUTE ------ 
                component: <SessionMenuPreObj model={model} />
            }, {
                path: `/instructions:ID`,  //ALBIN
                component: <InstructionsPresenter model={model} />

            }, {
                path: `/exit:ID`, //ALBIN Done
                component: <ExitPresenter model={model} />
            }, {
                path: `/leader-board:ID`,
                component: <LeaderBoardPresenter model={model} />
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
    //makeRouter(props.model);
    return (
        <div class="AppRoot container">
            <RouterView />
        </div>
    );
}