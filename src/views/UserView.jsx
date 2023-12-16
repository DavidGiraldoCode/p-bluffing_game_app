import "../global-style.css";
import "./UserView.css";
import AppHeader from "../components/AppHeader";
import MenuItem from "../components/MenuItem";
import DoubleAction from "../components/DoubleAction";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";
import UserGreeting from "../components/UserGreeting";
import { goTo } from "../utilities.js";

export default function CreateSessionView(props) {

    function creationHandlerACB() {
        props.onCreateSession({ id: "some-user" });
    }
    function createSessionACB(){
        goTo(`/create-session`);
    }

    function joinSessionACB(){
        goTo(`/join`);
    }
    //destinationTitle="Back"
    return <div>

        {/*  User Login View */}

        <AppHeader routeDestination={`/login:${12345}`} 
            icon={"Logout"}
            icon-text={"Logout"}
            /> 
        
        <UserGreeting
            userImage={props.userImage}
            title={"Hello there"}
            name={props.name}/>  
        
        <DoubleAction
            description ={"Ready for your next game?"}
            primaryText={"Host session"}
            secondaryText={"Join session"}
            primaryOnClick={createSessionACB}
            secondaryOnClick={joinSessionACB}
            />

        <MenuItem 
            title={"Instructions"}
            onCustomClick={x => { goTo(`/instructions:${123456}`) }}
            />
            
        <Footer />

 

    </div>
}