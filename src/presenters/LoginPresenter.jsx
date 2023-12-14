import SectionTitle from "../components/SectionTitle.jsx";
import SingleAction from "../components/SingleAction.jsx";
import Footer from "../components/Footer.jsx";
import { goTo } from "../utilities.js";
import LoginView from "../views/LoginView.jsx";

export default function LoginPresenter(props) {
    async function onLoginACB(){
        const authOk = await props.model.getAuthentification(); // authOk boolean
        console.log("AuthOK : ", authOk);
        if(authOk){
            goTo("/test-ui")
        }
        
    }
    return <LoginView
        onLogin={onLoginACB}/>

}