import UserView from "../views/UserView.jsx";
import { goTo } from "../utilities.js";

export default function UserPresenter(props) {
    function UserHandlerACB(obj){
        goTo(`/user:ID${obj.id}`);
    }

    return <div>
        <UserView 
            onLoginSession={UserHandlerACB}
            userImage={props.model.user.photoURL}
            name={props.model.user.displayName}

            />
        </div >
}