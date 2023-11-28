export default function TestUI(props) {
    console.log('Update TestUI!')
    
    async function createSessionACB() {
        // Call the getDeckID function on the model
        await props.model.getDeckID();
    }
    return (
        <div>
            <h1>UI Tester</h1>
            <h2>sessionID (deckID in the API): {props.model.sessionID} </h2>
            <h3>players (type Array): {`${props.model.players}`}</h3>
            <p>numberOfPlayer: { } </p>
            <p>yourTurn (a playerID type String): {props.model.numberOfPlayer}</p>
            <button onClick={createSessionACB}>Create session on API</button>   {/*Added by Albin & Martin to test session from API*/}
            <div>{props.model.players.map(playersRendering)}</div>
        </div>);

    function playersRendering(player) {

        return (
            <div class="players-container">
                <h4>playerID (type String): {player.playerID}</h4>
                <p>isHost (type Boolean): {`${player.isHost}`}</p>
                <p>pileOfCards (type Array): {player.pileOfCards.reduce(concatenateCardCodes)}</p>
                <p>selectedCard (type String): {`${player.selectedCard}`}</p>
                <div>{player.pileOfCards.map(cardsRendering)}</div>
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