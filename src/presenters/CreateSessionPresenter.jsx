import CreateSessionView from "../views/CreateSessionView.jsx";
import { goTo, propsWithLoading } from "../utilities.js";

export default function CreateSessionPresenter(props) {

    async function createSessionHandlerACB(playerName) {

        const success = await propsWithLoading(props.model.createHost(playerName), props);
        if (success) {
            goTo(`/game:${props.model.sessionID}`);
        }
    }

    return <CreateSessionView
        onCreateSession={createSessionHandlerACB}
        name={props.model.user.displayName}
        isLoading={props.model.isLoading} />
}