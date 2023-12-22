import UserView from "../views/UserView.jsx";
import { goTo } from "../utilities.js";

export default function UserPresenter(props) {
    /*    function UserHandlerACB(obj) {
            goTo(`/home:ID${obj.id}`); //? Previously /user:ID
        }*/
    //onLoginSession={UserHandlerACB}

    return <UserView
        uid={props.model.user.uid}

        userImage={props.model.user.photoURL}
        name={props.model.user.displayName} />
}