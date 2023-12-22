import { useRoute } from "vue-router";
import { goTo, propsWithLoading } from "../utilities.js";
import BluffView from "../views/BluffView.jsx";
import { watch } from "vue";

export default function BluffPresenter(props) {

    const route = useRoute();

    if (route.params !== undefined && props.model.player === null) {
        props.model.reJoinSessionURL(useRoute().params.uid, useRoute().params.session);
        // Go to game since selectedCard is only local. No selected card upon reload.
        goTo(`/game/${props.model.user.uid}/${props.model.sessionID}`);
    }

    async function removeCardACB(){

        const success1 = await propsWithLoading(props.model.nextPlayer(), props);
        const success2 = await propsWithLoading(props.model.removeCard(props.model.player.playerID/*[0]*/, props.model.player.selectedCard)/*[0]*/, props);
        if(success1 && success2){
            goTo(`/leader-board/${props.model.player.playerID}/${props.model.sessionID}`);
        }
    }

    async function dealCardACB(){

        const success1 = await propsWithLoading(props.model.nextPlayer(), props);
        const success2 = await propsWithLoading(props.model.dealCards(props.model.player.playerID/*[0]*/, 1), props);
        if(success1 && success2){
            goTo(`/leader-board/${props.model.player.playerID}/${props.model.sessionID}`);
        }
    }

    return <BluffView 
    sessionID = {props.model.sessionID}
    selectedCard = {props.model.player?.selectedCard || "AC" /*[0]*/}
    onBluffSuccess = {removeCardACB}
    onBluffFailed = {dealCardACB}
    isLoading={props.model.isLoading}
    />
    
}