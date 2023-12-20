import AppHeader from "../components/AppHeader.jsx";
import SessionID from "../components/SessionID.jsx";
import LBitem from "../components/LBitem.jsx";
import SingleAction from "../components/SingleAction.jsx";
import SwiperVue from "../components/SwiperVue.jsx";
import "../global-style.css";
import "./GameView.css";
import { goTo } from "../utilities.js";
import { useRoute } from "vue-router";

// TODO Add conditional rendering if its not your turn!

export default function GameView(props) {
    console.log(`We are at /game/${useRoute().params.uid}/${useRoute().params.session}`);
    // Reworks the leaderboard to be able to easier work with it.
    const players = Object.keys(props.leaderboard).map((playerID) => ({
        playerID,
        ...props.leaderboard[playerID]
    }));

    // Sorts the players to be able to get rankning.
    const sortedPlayers = players.sort((a, b) => a.numberOfCards - b.numberOfCards);

    // Getting the rank of the player from the sortedPlayer.
    const playerRank = (sortedPlayers.findIndex(
        (player) => player.playerID === props.player.playerID)) + 1;

    // Indicates if a card is selected or not.
    const cardNotSelected = props.player.selectedCard === null;

    // Indicates if its the players turn
    const yourTurn = props.whosTurn == props.player.playerID;

    function menuEvenHandlerACB(event) {
        goTo(`/session-menu/${props.uid}/${props.sessionID}`);
    }

    function howToHandlerCB() {
        goTo(`/instructions`);
    }

    function blufferStageHandlerACB() {
        // Pre-loads the image to avoid rendering delay of image at BluffView
        const image = new Image();
        image.src = `https://deckofcardsapi.com/static/img/${props.player.selectedCard}.png`;
        image.onload = () => {
            // After the image is loaded, navigate to BluffView
            goTo(`/bluff/${props.uid}/${props.sessionID}`);
        };
    }

    function selectCardHandler(card) {
        props.player.selectedCard = card;
    }

    return <div class="game-view container">
        <AppHeader onLeftClick={menuEvenHandlerACB} icon="Playerorder" />
        <SessionID sessionID={props.sessionID} />
        <LBitem
            rank={`No.${playerRank}`} // TODO Implement your current rank
            playerName={props.player.playerName}
            cardIcon={"🃏"}
            cardText={"Cards:"}
            score={props.player.numberOfCards}
        />
        <div class="swiper-vue container m-top-m">
            <SwiperVue cardCodes={props.player.pileOfCards} onSelectCard={selectCardHandler} />
        </div>
        <div class="fixed-bottom container">
            {yourTurn ? (
                <SingleAction
                    class="card-selector-action"
                    title="Your turn!"
                    description={`${props.player.selectedCard ? "You selected " + props.player.selectedCard + ", now bluff your way out" : "Pick a card to bluff your way out"}`}
                    buttonState={cardNotSelected}
                    btnLabel="Confirm"
                    onCustomClick={blufferStageHandlerACB} />
            ) : (
                <SingleAction
                    class="card-selector-action"
                    title="Wait for your turn"
                    description=""
                    buttonState={true}
                    btnLabel="⏳"
                    onCustomClick={null} />
            )}
            <button onClick={howToHandlerCB} class="primary-no-border"> How to play? </button>
        </div>




    </div>
}

/*
<p> How to play? </p> {/TODO LINK/}
    //! Temporary instead of Swiper
    function cardsRendering(card) {
        return (
            <button class="secondary" onClick={selectCardHandler} value={card}>{card}</button>
        )
    }

    function selectCardHandler(/event/ card) {
        console.log('selectCardHandler')
        //props.player.selectedCard = event.target.value;
        props.player.selectedCard = card;
    }
    //! End

/! Temporary instead of Swiper
        {/*props.player.pileOfCards.length > 0 && (
            <div class="container">{props.player.pileOfCards.map(cardsRendering)}</div>
        )/}
/! End

<div class="wait-text">
    <h3>⏳ Wait for your turn</h3>
</div> */