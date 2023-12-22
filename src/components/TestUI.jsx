//import Swiper from "./Swiper.jsx";

import { goTo } from "../utilities.js";
import "../global-style.css";

export default function TestUI(props) {
    console.log('Update TestUI!');

    const data = {
        newPlayerName: (props.model.user.displayName),
        sessionIdFromUI: "",
        playerIdtoRemove: "",
    };

    async function createSessionACB() {
        // Call the getDeckID function on the model
        await props.model.createHost(data.newPlayerName)
        // Clear the input field after adding the player
        data.newPlayerName = "";
    }

    async function joinSessionACB() {
        // Call the createPlayer function on the model with the input value. Not host
        await props.model.joinSession(data.sessionIdFromUI, data.newPlayerName); // Assuming the player is not the host
        // Clear the input field after adding the player
        data.newPlayerName = "";
    }

    async function removePlayerACB(){
        await props.model.removePlayer(data.playerIdtoRemove);
    }

    async function signOutACB(){
        const sucessLogOut = await props.model.signOut();
        if(sucessLogOut){
            goTo("/login")
        }
        
    }

    return (
        <div class="test-body" style="width: 400px">
            <h1>UI Tester</h1>
            <h2>sessionID (deckID in the API): {props.model.sessionID} </h2>
            <h3>player (type Array): {`${props.model.player}`}</h3>
            <p>playerOrder (type Array): {JSON.stringify(props.model.playerOrder)}</p>
            <p>localNumberOfPlayer: {props.model.localNumberOfPlayers} </p>
            <p>playerHost (a playerID type String): {props.model.playerHost}</p>
            <p>yourTurn (a playerID type String): {props.model.yourTurn}</p>
            <p>gameOver (type Boolean): {`${props.model.gameOver}`}</p>
            <p>winner (a playerID type String): {props.model.winner}</p>
            <p>leaderBoard (type Object): {JSON.stringify(props.model.leaderboard)}</p>

            <div>
                <input
                    type="text"
                    value={data.newPlayerName}
                    onInput={(e) => (data.newPlayerName = e.target.value)}
                    placeholder="Enter host name"
                />
            </div>
            <div class="m-bottom-m">
                <button class="test-button" onClick={createSessionACB}>Create Session</button>
            </div>
            <div>
                <input
                    type="text"
                    value={data.newPlayerName}
                    onInput={(e) => (data.newPlayerName = e.target.value)}
                />
            </div> 
            <div>
                <input
                    value={data.sessionIdFromUI}
                    onInput={(e) => (data.sessionIdFromUI = e.target.value)}
                    placeholder="Enter a valid sessionID"
                />
            </div>                        
            <div>
                <button onClick={joinSessionACB}>Join Session</button>
            </div>
            <div>
                <input
                    value={data.sessionIdFromUI}
                    onInput={(e) => (data.playerIdtoRemove = e.target.value)}
                    placeholder="Enter a playerID to remove"
                />
            </div>                        
            <div>
                <button onClick={removePlayerACB}>Remove player</button>
            </div>
            <div>
                <button onClick={signOutACB}>Sign Out</button>
            </div>

            <div>{props.model.player.map(playersRendering)}</div>
        </div>);

    function playersRendering(player) {
        function selectCardSpriteHandler(code) {
            console.log(code);
            player.selectedCard = code;
        }
        return (
            <div class="test-players-container">
                <h4>playerID (type String): {player.playerID}</h4>
                <p>playerName (type String): {player.playerName}</p>
                <p>isHost (type Boolean): {`${player.isHost}`}</p>
                {player.pileOfCards.length > 0 && (
                    <p>pileOfCards (type Array): {player.pileOfCards.reduce(concatenateCardCodesCB)}</p>
                )}
                <p>selectedCard (type String): {`${player.selectedCard}`}</p>
                {player.pileOfCards.length > 0 && (
                    <div>{player.pileOfCards.map(cardsRendering)}</div>
                )}
                {/*<Swiper pileOfCards={player.pileOfCards.reduce(concatenateCardCodesCB).split(", ")} onSelectCardSprite={selectCardSpriteHandler}/>*/}

                <p>Did you manage to bluff your way out?</p>
                <div>
                    <button
                        class="test-button"
                        onClick={successfulBluffACB}
                        disabled={player.selectedCard === null || player.playerID !== props.model.yourTurn}>
                        Yes
                    </button>
                    <button
                        class="test-button"
                        onClick={failedBluffACB}
                        disabled={player.selectedCard === null || player.playerID !== props.model.yourTurn}>
                        No
                    </button>
                </div>
            </div>
        )

        async function successfulBluffACB(){
            // player managed to bluff its apponents
            // 1. removes the selected card
            // 2. sessionModel yourTurn should change to th next player
            // 3. selectedCard = null
            // 4. if (round is done ) -> update leaderboard
            await props.model.removeCard(player.playerID, player.selectedCard);
            player.selectedCard = null;
            props.model.nextPlayer();
        }

        async function failedBluffACB() {
            // player managed not to bluff its apponents
            // 1. draw ONE new card
            // 2. sessionModel yourTurn should change to the next player
            // 3. selectedCard = null
            await props.model.dealCards(player.playerID, 1);
            player.selectedCard = null;
            props.model.nextPlayer();
        }

        function cardsRendering(card) {
            return (
                <button class="secondary" onClick={selectCardHandler} value={card}>{card}</button>
            )
        }
        function selectCardHandler(event) {
            console.log('selectCardHandler')
            player.selectedCard = event.target.value;
        }

    }

    function concatenateCardCodesCB(accumulator, currentCardCode) {
        return `${accumulator}, ${currentCardCode}`;
    }
}