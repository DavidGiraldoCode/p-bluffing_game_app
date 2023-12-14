import { goTo } from "../utilities.js";
import ExitView from "../views/ExitView.jsx";

export default function ExitPresenter() {

    function logOutHandler(){
        goTo(`/join:${123456}`);
    }

    return <ExitView onLogOut={logOutHandler}/>
}