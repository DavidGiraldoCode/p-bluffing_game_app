import CreateSessionView from "../views/CreateSessionView";
import { goTo } from "../utilities.js";

export default function CreateSessionPresenter(props) {

    function createSessionHandlerACB(obj){
        goTo(`/game:${obj.id}`);
    }

    return <div class="create-session P" >
        <CreateSessionView onCreateSession={createSessionHandlerACB}/>
    </div >
}