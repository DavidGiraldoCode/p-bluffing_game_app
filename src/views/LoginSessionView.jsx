import "../global-style.css";
import "./LoginSessionView.css";
import SectionTitle from "../components/SectionTitle";
import SingleAction from "../components/SingleAction";
import Footer from "../components/Footer";

export default function LoginSessionView(props) {

    function LoginHandlerACB() {
        props.onLoginSession({ id: "some-user" });
    }
    //destinationTitle="Back"

    {/*  Login Session  */}

    return <div>
        <SectionTitle 
            title={"King's Bluffer"}
            />

        <SingleAction
            title=" "
            description="Please log in below to play!"
            btnLabel="Continue with Google "
            onCustomClick={LoginHandlerACB}
            />

        <Footer 
            />

        



    </div>
}