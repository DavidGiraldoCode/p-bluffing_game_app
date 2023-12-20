import { goTo } from "../utilities.js";
import ExitView from "../views/ExitView.jsx";

export default function ExitPresenter(props) {

    function logOutHandler(){
        //TODO Logout
        props.model.reset();
        props.model.signOut();
        goTo(`/`);
    }

    return <ExitView onLogOut={logOutHandler}/>
}