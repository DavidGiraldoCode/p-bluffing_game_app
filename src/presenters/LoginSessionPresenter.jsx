import LoginSessionView from "../views/LoginSessionView.jsx";
import { goTo } from "../utilities.js";

export default function LoginSessionPresenter(props) {

    function LoginSessionHandlerACB(obj){
        goTo(`/user:ID${obj.id}`);
    }

    return <div>
        <LoginSessionView onLoginSession={LoginSessionHandlerACB}/>
    </div >
}