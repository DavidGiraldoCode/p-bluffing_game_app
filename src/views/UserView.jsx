import "../global-style.css";
import "./UserView.css";
import AppHeader from "../components/AppHeader";
import MenuItem from "../components/MenuItem";
import DoubleAction from "../components/DoubleAction";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";
import UserGreeting from "../components/UserGreeting";
import SwiperVue from "../components/SwiperVue.jsx";
import { goTo } from "../utilities.js";

export default function CreateSessionView(props) {

    function creationHandlerACB() {
        props.onCreateSession({ id: "some-user" });
    }

    function logOutEvenHandlerACB() {
        goTo(`/exit`);
    }

    function createSessionACB() {
        goTo(`/create-session/${props.uid}`);
    }

    function joinSessionACB() {
        goTo(`/join-session/${props.uid}`);
    }

    function howToHandlerCB(){
        goTo(`/instructions`);
    }

    //destinationTitle="Back"
    return <div class="container">
        <AppHeader onLeftClick={logOutEvenHandlerACB} icon={"Logout"} icon-text={"Logout"} />
        <UserGreeting
            userImage={props.userImage}
            title={"Hello"}
            name={props.name} />
        <DoubleAction
            class="home-actions m-bottom-m"
            description={"Ready for your next game?"}
            primaryText={"HOST SESSION"}
            secondaryText={"JOIN SESSION"}
            primaryOnClick={createSessionACB}
            secondaryOnClick={joinSessionACB}
        />
        <div class="fixed-bottom container m-bottom-m" >
            <button onClick={howToHandlerCB} class="primary-no-border"> How to play? </button>
            <Footer />
        </div>

    </div>
}

/*
<MenuItem
                class="m-bottom-m"
                title={"How to play?"}
                routeDestination={`/instructions`}
            />
*/