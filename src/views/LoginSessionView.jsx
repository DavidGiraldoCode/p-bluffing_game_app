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
        <SectionTitle title={"Bluffer"} />
        <p class="login-descripton">Get a deck of cards and try to bluff 
        your way out, and be the first to discard all of them</p>
        <div class="login-game-description m-bottom-m">
            <p></p>
        </div>
        <SwiperVue class="m-bottom-m" />
        <SingleAction
            class = "m-bottom-m"
            title=" "
            description="How to play?"
            btnLabel="JOIN WITH GOOGLE"
            onCustomClick={LoginHandlerACB} />
        <Footer/>
    </div>
}