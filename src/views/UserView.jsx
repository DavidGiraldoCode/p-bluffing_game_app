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
        goTo(`/create-session:123`);
    }

    function joinSessionACB() {
        goTo(`/join-session:123`);
    }
    //destinationTitle="Back"
    return <div class="container">
        <AppHeader onLeftClick={logOutEvenHandlerACB} icon={"Logout"} icon-text={"Logout"} />
        <UserGreeting
            userImage={props.userImage}
            title={"Hello there"}
            name={props.name} />
        <div class="fixed-bottom" >
            <DoubleAction
                class="m-bottom-m"
                description={"Ready for your next game?"}
                primaryText={"Host session"}
                secondaryText={"Join session"}
                primaryOnClick={createSessionACB}
                secondaryOnClick={joinSessionACB}
            />
            <MenuItem
                class="m-bottom-m"
                title={"How to play?"}
                routeDestination={`/instructions:${123456}`}
            />
            <Footer />
        </div>

    </div>
}