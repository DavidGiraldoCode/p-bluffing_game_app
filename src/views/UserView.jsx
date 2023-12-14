import "../global-style.css";
import "./UserView.css";
import AppHeader from "../components/AppHeader";
import MenuItem from "../components/MenuItem";
import DoubleAction from "../components/DoubleAction";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";

export default function CreateSessionView(props) {

    function creationHandlerACB() {
        props.onCreateSession({ id: "some-user" });
    }
    //destinationTitle="Back"
    return <div>

        {/*  User Login View */}

        <AppHeader routeDestination={`/join:${12345}`} 
            icon={"Back Arrow"}
            title={"Back"}
            /> 
        
        {/*  User image here */} 

        <SectionTitle 
            title={"Hello King Bluffer!"}
            />

        <MenuItem 
            title={"Instructions"}
            />
            
        <Footer />

        <DoubleAction
            description ={"Ready for your next game?"}
            primaryText={"Host session"}
            secondaryText={"Join session"}
            /> 

    </div>
}