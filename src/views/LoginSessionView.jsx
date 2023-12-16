import "../global-style.css";
import "./LoginSessionView.css";
import SectionTitle from "../components/SectionTitle";
import SingleAction from "../components/SingleAction";
import Footer from "../components/Footer";
import SwiperVue from "../components/SwiperVue";

export default function LoginSessionView(props) {

    function LoginHandlerACB() {
        props.onLoginSession({ id: "some-user" });
    }
    //destinationTitle="Back"

    {/*  Login Session  */ }

    return <div class="container">
        <SectionTitle title={"King's Bluffer"} />
        <div class="login-game-description m-bottom-m">
            <p>Get 5 cards and bluff you way out to be the first one with no cards.</p>
        </div>
        <SwiperVue class="m-bottom-m" />
        <SingleAction
            title=" "
            description="Please log in below to play!"
            btnLabel="Continue with Google "
            onCustomClick={LoginHandlerACB} />
        <Footer class="fixed-bottom" />
    </div>
}