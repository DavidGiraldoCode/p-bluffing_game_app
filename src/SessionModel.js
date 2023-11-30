// 2023-11-28, Albin Fransson & Martin Sandberg

import {BASE_URL} from "/src/apiConfig.js";

/*
                ☆           *
   *            .o             *
     *         .*.'.
              .'.'o'.       *
        *    o'.*.'.o.
            .'.o.'.'.*.        *
           .*.'.o.'.o.'.     *
*         o'.'.'.'*'.'.'.        *
      *  .'.'*'.'o'.'.'*'o  *
  *           [_____]            
        *      \___/      *       *

          Merry Christmas!
source: https://github.com/rhysd
*/

/*
! Known issues/bugs:
    - If 1000 uesers join, no more IDs are available and app will crash.
    - If deck is empty (0 cards left) new player that will join will automatically win since no cards can be deald to that player.
*/

//-------------Player class-------------
class Player {
    constructor(playerName, isHost) {
        // Attributes of the player class. Always initialized when creating a new player.
        this.playerID = this.createPlayerID();
        this.playerName = playerName;
        this.isHost = isHost;
        this.pileOfCards = []; //Local copy of the API pile. To be able to render
        this.selectedCard = null; // example: 'KD'
    }

    createPlayerID() {
        // Creates a random playerID between 0 and 999. If any other player has the same ID. A new one will be created.
        return sessionModel.generateUniquePlayerID();
    }

    async getPileOfCards(){
        // Gets the card codes from the piles of the player (from the API)
        // Example: pileOfCards = ['9H', 'AH', 'JH', '3H', 'AS']
        function listingCardCodeCB(card){
            return card.code;
        }
        const API_URL = `${BASE_URL}/deck/${sessionModel.sessionID}/pile/${this.playerID}/list/`;
        const response = await fetch(API_URL).then(response => response.json());
        const id = this.playerID;
        this.pileOfCards = response.piles[id].cards.map(listingCardCodeCB);
    }
}


// -------------The model--------------
export const sessionModel = {
    sessionID: null, // the deck_id defined by the API
    players: [], // array of player objects
    playerOrder: [], // array of playerIDs stating the plaing order of the game
    yourTurn: null, // a playerID
    numberOfPlayers: null, // players.length()
    gameOver: false,
    winner: null,
    newDeckPromiseState : {},
 
    async getDeckID(){
        //Gets a new deck from the API and sets the sessionID from the model. Data is the whole respons.
        const API_URL = `${BASE_URL}/deck/new/shuffle/`;
        const response = await fetch(API_URL).then(response => response.json());
        const deck_id = response.deck_id;
        this.sessionID = deck_id;
    },

    createPlayer(playerName, isHost){
        // Creates an object from the player class and adds to the players array.
        const newPlayer = new Player(playerName, isHost);
        this.players.push(newPlayer);   // adds newPlayer to players array
        this.playerOrder.push(newPlayer.playerID);
        this.numberOfPlayers = this.players.length;
        return newPlayer;
    },

    async dealCards(playerID, amountOfCards){
        // Draws amount of cards using the drawCard function. Adds these cards to a pile called playerID on the API.  When cards is removed, calls gameOverCheck to check if the player is out of cards.
        // This function will be used for example when clicking Create session or Join Session or if a player needs to draw a new card.
        const arrayOfCardCodes = await drawCard()
        const queryString = arrayOfCardCodes.join(',');
        const API_URL = `${BASE_URL}/deck/${this.sessionID}/pile/${playerID}/add/?cards=${queryString}`;
        const response = await fetch(API_URL).then(response => response.json());
        const player = this.players.find(p => p.playerID == playerID);
        await player.getPileOfCards();
        this.gameOverCheck(playerID); //Might be a bit redundant to call gameOverCheck from here. You cannot get out of cards when dealing?

        async function drawCard(){
            // help function to dealCards
            // Returns an array of the card codes eg. ['QD', 'KS', '8D'], depending of the amount of cards drawn.
            function drawCardCodeCB(card){
                return card.code;
            }
            const API_URL = `${BASE_URL}/deck/${sessionModel.sessionID}/draw/?count=${amountOfCards}`;
            const response = await fetch(API_URL).then(response => response.json());
            return response.cards.map(drawCardCodeCB);
        }
    },

    nextPlayer(){
        // This function will be called while creating a session to initilize yourTurn
        // Assigns the next player in the playerOrder
        // If its the last player of a round the playerOrder will be shuffled and yourTurn = playerOrder[0]
        if(this.yourTurn === null){
            this.yourTurn = this.playerOrder[0];
        } else{
            const index = this.playerOrder.indexOf(this.yourTurn);
            const nextIndex = ((index + 1) % this.playerOrder.length);
            if(nextIndex !== 0){
                this.yourTurn = this.playerOrder[nextIndex]
            } else{
                this.shufflePlayers();
                this.yourTurn = this.playerOrder[0]
            }
        }
    },

    shufflePlayers(){
        // Shuffles the playerOrder array using the Fisher-Yates Shuffle Algorithm.
        function shuffleArray(array) {
            // Fisher-Yates (Knuth) Shuffle Algorithm. Not our implementation.
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        shuffleArray(this.playerOrder);
    },

    removePlayer(playerIdToRemove){
        // Removes player from players array. The playerIDToRemove of the parameter is the player that will be removed.
        // If the playerID is the host. Nothing will happen.
        // If the playerID to be removed also is yourTurn: nextPlayer() is called.
        const player = this.players.find(player => player.playerID === playerIdToRemove);
        if(!player.isHost){
            this.players = this.players.filter(player => player.playerID !== playerIdToRemove);
            this.playerOrder = this.playerOrder.filter(playerID => playerID !== playerIdToRemove);
            if(playerIdToRemove == this.yourTurn){
                this.nextPlayer();
            }
        }
    },

    async removeCard(playerID, selectedCard){
        // Removes a card from the players pile in the API. When card is removed. When cards is removed, calls gameOverCheck to check if the player is out of cards.
        // The selectedCard as argument will be passed from the player class attribute selectedCard.
        const API_URL = `${BASE_URL}/deck/${this.sessionID}/pile/${playerID}/draw/?cards=${selectedCard}`;
        await fetch(API_URL).then(response => response.json());
        const player = this.players.find(p => p.playerID == playerID);
        await player.getPileOfCards();
        this.gameOverCheck(playerID);
    },

    gameOverCheck(playerID){
        // Checks if the player is out of cards. If someone is out of cards, change the model variable gameOver to True
        const player = this.players.find(p => p.playerID == playerID);
        if(player.pileOfCards.length == 0){
            this.gameOver = true;
            this.winner = playerID;
        };
    },

    generateUniquePlayerID() {
        // Help function to the player class. Gives a randon number to the player. If another player has the same number. It will try to give another one.
        //! If we create 1000 users. This will result in a infinity loop since no more numbers are available.
        let ID;
        do {
            ID = Math.floor(Math.random() * 1000);
        } while (this.players.some(player => player.playerID === ID));

        return ID;
    },
}