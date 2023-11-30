export default function TestUI(props) {
    console.log('Update TestUI!')

    const data = {
        newPlayerName: "",
    };
    
    async function createSessionACB() {
        // Call the getDeckID function on the model
        await props.model.getDeckID();
        // Call the createPlayer function on the model with the input value
        const player = props.model.createPlayer(data.newPlayerName, true); // Assuming the player is not the host
        // Clear the input field after adding the player
        data.newPlayerName = "";
        // TODO change 5 cards into a attribute in the model that can be changed
        props.model.dealCards(player.playerID, 5); // always deals five cards
        props.model.nextPlayer(); // sets the host to start the first round
    }

    function addNewPlayerACB() {
        // Call the createPlayer function on the model with the input value. Not host
        const player = props.model.createPlayer(data.newPlayerName, false); // Assuming the player is not the host
        // Clear the input field after adding the player
        data.newPlayerName = "";
        // TODO change 5 cards into a attribute in the model that can be changed
        props.model.dealCards(player.playerID, 5);
    }

    return (
        <div>
            <h1>UI Tester</h1>
            <h2>sessionID (deckID in the API): {props.model.sessionID} </h2>
            <h3>players (type Array): {`${props.model.players}`}</h3>
            <p>numberOfPlayer: {props.model.numberOfPlayers} </p>
            <p>yourTurn (a playerID type String): {props.model.yourTurn}</p>
            <p>gameOver (type Boolean): {`${props.model.gameOver}`}</p>

            <div>
                <input
                    value={data.newPlayerName}
                    onInput={(e) => (data.newPlayerName = e.target.value)}
                    placeholder="Enter host name"
                />
            </div>
            <div>
                <button onClick={createSessionACB}>Create Session</button>
            </div>
            <div>
                <input
                    value={data.newPlayerName}
                    onInput={(e) => (data.newPlayerName = e.target.value)}
                    placeholder="Enter new player name"
                />
            </div>                        
            <div>
                <button onClick={addNewPlayerACB}>Add new player/Join Session</button>
            </div>
            <div>{props.model.players.map(playersRendering)}</div>
        </div>);

    function playersRendering(player) {
        return (
            <div class="players-container">
                <h4>playerID (type String): {player.playerID}</h4>
                <button onClick={removePlayerACB} disabled={player.isHost}>Remove player</button>
                <p>playerName (type String): {player.playerName}</p>
                <p>isHost (type Boolean): {`${player.isHost}`}</p>
                {player.pileOfCards.length > 0 && (
                    <p>pileOfCards (type Array): {player.pileOfCards.reduce(concatenateCardCodesCB)}</p>
                    )}      
                <p>selectedCard (type String): {`${player.selectedCard}`}</p>
                {player.pileOfCards.length > 0 && (
                    <div>{player.pileOfCards.map(cardsRendering)}</div>
                    )}
                <p>Did you manage to bluff your way out?</p>
                <div>
                    <button 
                    onClick={successfulBluffACB} 
                    disabled={player.selectedCard === null || player.playerID !== props.model.yourTurn}>
                        Yes
                    </button>
                    <button 
                    onClick={failedBluffACB} 
                    disabled={player.selectedCard === null || player.playerID !== props.model.yourTurn}>
                        No
                    </button>
                </div>
            </div>
        )

        async function removePlayerACB(){
            await props.model.removePlayer(player.playerID);
        }

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

        async function failedBluffACB(){
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
                <button onClick={selectCardHandler} value={card}>{card}</button>
            )
        }
        function selectCardHandler(event) {
            player.selectedCard = event.target.value;
        }

    }

    function concatenateCardCodesCB(accumulator, currentCardCode) {
        return `${accumulator}, ${currentCardCode}`;
    }
}