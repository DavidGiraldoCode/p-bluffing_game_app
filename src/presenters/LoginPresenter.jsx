import { goTo } from "../utilities.js";
import LoginView from "../views/LoginView.jsx";

export default function LoginPresenter(props) {
    
    async function onLoginACB(){
        const authOk = await props.model.checkAuthStatus();
        if(authOk){
            goTo("/join:ID")
        }else{
            const authOk = await props.model.getAuthentification(); // authOk boolean
            if(authOk){
                goTo("/join:ID")
            }
        }

    }
    return <LoginView
        onLogin={onLoginACB}/>

}