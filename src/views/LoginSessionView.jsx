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
            title="Google Bluff"
            description="Do you want to be the host of a new session?"
            btnLabel="Login"
            onCustomClick={LoginHandlerACB}
            />

        <Footer 
            />

        



    </div>
}