import AppHeader from "../components/AppHeader.jsx";
import SessionID from "../components/SessionID.jsx";
import LBitem from "../components/LBitem.jsx";
import SelectContent from "../components/SelectContent.jsx";
import SingleAction from "../components/SingleAction.jsx";
import Swiper from "../components/Swiper.jsx";
import { goTo } from "../utilities.js";

export default function GamePresenter(props) {

    //TODO implement Component state for handeling the bluffing state
    let isBluffing = false;

    function blufferStageHandlerACB() {
        console.log(`isBluffing: ${isBluffing}`);
        //TODO for now, go to leader board
        goTo(`/leader-board:123456`);
    }

    return <div class="game-presenter">
        <AppHeader />
        <SessionID
            sessionID={props.model.sessionID}
        />
        <LBitem
            rank={"1º"}
            playerName={"Nicolas Gomez"}
            cardIcon={"🃏"}
            cardText={"Cards:"}
            score={"5"}
        />
        <Swiper pileOfCards={['AC', '5S', 'KS', '2D', 'KH']} onSelectCardSprite={null} /> {/*NEEDS FIX*/} {/*DAVID*/}
        <SingleAction
            title="Your turn!"
            description="Select a card to bluff your way out"
            buttonState={false}
            btnLabel="Confirm"
            onCustomClick={blufferStageHandlerACB} />

    </div>
}