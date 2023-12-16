import LoginSessionView from "../views/LoginSessionView.jsx";
import { goTo } from "../utilities.js";

export default function LoginSessionPresenter(props) {

    async function LoginSessionHandlerACB(){
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

    return <div>
        <LoginSessionView onLoginSession={LoginSessionHandlerACB}/>
    </div >
}