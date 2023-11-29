export default function TestUI(props) {
    console.log('Update TestUI!')

    const data = {
        newPlayerName: "",
        dealPlayerID: "",
    };
    
    async function createSessionACB() {
        // Call the getDeckID function on the model
        await props.model.getDeckID();
    }

    function addNewPlayerACB() {
        // Call the createPlayer function on the model with the input value. Not host
        props.model.createPlayer(data.newPlayerName, false); // Assuming the player is not the host
        // Clear the input field after adding the player
        data.newPlayerName = "";
    }

    function addNewHostPlayerACB() {
        // Call the createPlayer function on the model with the input value
        props.model.createPlayer(data.newPlayerName, true); // Assuming the player is not the host
        // Clear the input field after adding the player
        data.newPlayerName = "";
    }

    function dealFiveCardsACB(){
        //dealCards(playerID, amountOfCards)
        props.model.dealCards(data.dealPlayerID, 5)
        data.dealPlayerID = "";
    }

    return (
        <div>
            <h1>UI Tester</h1>
            <h2>sessionID (deckID in the API): {props.model.sessionID} </h2>
            <h3>players (type Array): {`${props.model.players}`}</h3>
            <p>numberOfPlayer: {props.model.numberOfPlayers} </p>
            <p>yourTurn (a playerID type String): {props.model.yourTurn}</p>
            <div>
                <button onClick={createSessionACB}>Create session on API</button>   {/*Added by Albin & Martin to test session from API*/}
            </div>
            <div>
                <input
                    value={data.newPlayerName}
                    onInput={(e) => (data.newPlayerName = e.target.value)}
                    placeholder="Enter new player name"
                />
            </div>
            <div>
                <button onClick={addNewPlayerACB}>Add new player</button>
                <button onClick={addNewHostPlayerACB}>Add new host player</button>
            </div>
            <div>
                <input
                    value={data.dealPlayerID}
                    onInput={(e) => (data.dealPlayerID = e.target.value)}
                    placeholder="Enter playerID"
                />
            </div>
            <div>
                <button onClick={dealFiveCardsACB}>Deal 5 cards to</button>
            </div>
            <div>{props.model.players.map(playersRendering)}</div>
        </div>);

    function playersRendering(player) {

        return (
            <div class="players-container">
                <h4>playerID (type String): {player.playerID}</h4>
                <p>playerName (type String): {player.playerName}</p>
                <p>isHost (type Boolean): {`${player.isHost}`}</p>
                {/*<p>pileOfCards (type Array): {player.pileOfCards.reduce(concatenateCardCodes)}</p>   Removed since reduce wont work on null variable.*/}
                <p>selectedCard (type String): {`${player.selectedCard}`}</p>
                {/*<div>{player.pileOfCards.map(cardsRendering)}</div>  Removed since map wont work on null variable.*/}
            </div>
        )

        function cardsRendering(card) {
            return (
                <button onClick={selectCardHandler} value={card}>{card}</button>
            )
        }
        function selectCardHandler(event) {
            player.selectedCard = event.target.value;
        }

    }

    function concatenateCardCodes(accumulator, currentCardCode) {
        return `${accumulator}, ${currentCardCode}`;
    }
}