import SectionTitle from "../components/SectionTitle.jsx";
import SingleAction from "../components/SingleAction.jsx";
import Footer from "../components/Footer.jsx";
import { goTo } from "../utilities.js";
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import LoginView from "../views/LoginView.jsx";

export default function LoginPresenter(props) {
    function onLoginACB(){
        const authOk = props.model.getAuthentification(); // authOk boolean
        if(authOk){
            goTo("/join")
        }
        
    }
    return <LoginView
        onLogin={onLoginACB}/>

}