export default function TestUI(props) {
    console.log('Update TestUI!')
    return (
        <div>
            <h1>UI Tester</h1>
            <h2>sessionID (deckID in the API): {props.model.sessionID} </h2>
            <h3>players (type Array): {`${props.model.players}`}</h3>
            <p>numberOfPlayer: { } </p>
            <p>yourTurn (a playerID type String): {props.model.numberOfPlayer}</p>
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