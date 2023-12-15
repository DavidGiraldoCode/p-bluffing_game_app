import { goTo } from "../utilities.js";
import LoginView from "../views/LoginView.jsx";

export default function LoginPresenter(props) {
    
    async function onLoginACB(){
        const authOk = await props.model.checkAuthStatus();
        if(authOk){
            goTo(`/user:${props.model.user.uid}`) // TODO change ID
        }else{
            const authOk = await props.model.getAuthentification(); // authOk boolean
            if(authOk){
                goTo(`/user:${props.model.user.uid}`)
            }
        }

    }
    return <LoginView
        onLogin={onLoginACB}
        />

}