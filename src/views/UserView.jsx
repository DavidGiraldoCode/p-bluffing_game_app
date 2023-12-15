import "../global-style.css";
import "./UserView.css";
import AppHeader from "../components/AppHeader";
import MenuItem from "../components/MenuItem";
import DoubleAction from "../components/DoubleAction";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";
import { goTo } from "../utilities.js";

export default function CreateSessionView(props) {

    function creationHandlerACB() {
        props.onCreateSession({ id: "some-user" });
    }
    //destinationTitle="Back"
    return <div>

        {/*  User Login View */}

        <AppHeader routeDestination={`/login:${12345}`} 
            icon={"Logout"}
            icon-text={"Logout"}
            /> 
        
        {/*<UserImage
            ???={props.userImage}/>  
        User image here, create component and pass props.userImage (in presenter: props.model.user.photoURL) */} 

        <SectionTitle 
            title={`Hello ${props.playerName}!`}
            />
        
        <DoubleAction
            description ={"Ready for your next game?"}
            primaryText={"Host session"}
            secondaryText={"Join session"}
            />

        <MenuItem 
            title={"Instructions"}
            onCustomClick={x => { goTo(`/instructions:${123456}`) }}
            />
            
        <Footer />

 

    </div>
}