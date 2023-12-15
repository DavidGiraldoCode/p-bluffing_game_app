import { goTo, propsWithLoading } from "../utilities.js";
import BluffView from "../views/BluffView.jsx";

export default function BluffPresenter(props) {

    async function removeCardACB(){

        const success = await propsWithLoading(props.model.removeCard(props.model.player[0].playerID, props.model.player[0].selectedCard), props);
        if(success){
            goTo(`/leader-board:${props.model.sessionID}`);
        }
    }

    async function dealCardACB(){

        const success = await propsWithLoading(props.model.dealCards(props.model.player[0].playerID, 1), props);
        if(success){
            goTo(`/leader-board:${props.model.sessionID}`);
        }
    }

    return <BluffView 
    sessionID = {props.model.sessionID}
    selectedCard = {props.model.player[0].selectedCard}
    onBluffSuccess = {removeCardACB}
    onBluffFailed = {dealCardACB}
    isLoading={props.model.isLoading}
    />
    
}