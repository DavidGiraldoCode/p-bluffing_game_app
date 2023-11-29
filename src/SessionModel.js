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
*/

//-------------Player class-------------
class Player {
    constructor(playerName, isHost) {
        // Attributes of the player class. Always initialized when creating a new player.
        this.playerID = this.createPlayerID();
        this.playerName = playerName;
        this.isHost = isHost;
        this.pileOfCards = []; //Local copy of the API pile. To be able to render
        this.selectedCard = null;
    }

    createPlayerID() {
        // Creates a random playerID between 0 and 999.
        //! This may result in bugs if we are extremely unlucky. Could need some rework of how it works.
        return Math.floor(Math.random() * 1000);
    }

    async getPileOfCards(){
        // https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/list/
        //const queryString = arrayOfCardCodes.join(',');
        const API_URL = `${BASE_URL}/deck/${sessionModel.sessionID}/pile/${this.playerID}/list/`;
        const response = await fetch(API_URL).then(response => response.json());
        console.log(response);
    }
}


// -------------The model-------------
export const sessionModel = {
    sessionID: null, // the deck_id defined by the API
    players: [], // array of player objects
    playerOrder: [], // array of playerIDs stating the plaing order of the game
    yourTurn: null, // a playerID
    numberOfPlayers: null, // players.length()
    newDeckPromiseState : {},

    async getDeckID(){
        console.log("Created a sessionID")
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
    },

    async drawCard(amountOfCards){
        // Returns an array of the card codes eg. ['QD', 'KS', '8D'], depending of the amount of cards drawn.
        function drawCardCodeCB(card){
            return card.code;
        }
        const API_URL = `${BASE_URL}/deck/${this.sessionID}/draw/?count=${amountOfCards}`;
        const response = await fetch(API_URL).then(response => response.json());
        return response.cards.map(drawCardCodeCB);
    },

    async dealCards(playerID, amountOfCards){
        // Draws amount of cards using the drawCard function. Adds these cards to a pile called playerID on the API.
        // This function will be used for example when clicking Create session or Join Session or if a player needs to draw a new card.
        const arrayOfCardCodes = await this.drawCard(amountOfCards)
        const queryString = arrayOfCardCodes.join(',');
        const API_URL = `${BASE_URL}/deck/${this.sessionID}/pile/${playerID}/add/?cards=${queryString}`;
        const response = await fetch(API_URL).then(response => response.json());
        // TODO Call getPileOfCards here (in the Player class )
        
    },

    nextPlayer(){
        // This function will be called while creating a session to initilize yourTurn
        // Assigns the next player in the playerOrder
        // If its the last player of a round the playerOrder will be shuffled and yourTurn = playerOrder[0]
        if(this.yourTurn === null){
            this.yourTurn = this.playerOrder[0];
        } else{
            const justPlayed = this.yourTurn;
            const index = this.playerTurn.indexOf(this.yourTurn);
            const nextIndex = ((index + 1) % this.playerOrder.length());
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
        this.players = this.players.filter(player => player.playerID !== playerIdToRemove);
        this.playerOrder = this.playerOrder.filter(playerID => playerID !== playerIdToRemove);
        console.log("Is it removed?");
        console.log("players : " , this.players);
        console.log("playerOrder : " , this.playerOrder);
    },

    async removeCard(playerID, selectedCard){
        // Removes a card from the players pile in the API. The selectedCard is an argument of the cardCode.
        // The selectedCard as argument will be passed from the player class attribute selectedCard.
        const API_URL = `${BASE_URL}/deck/${this.sessionID}/pile/${playerID}/draw/?cards=${selectedCard}`;
        const response = await fetch(API_URL).then(response => response.json());
        console.log(response);
        // TODO when done, refresh getPileOfCards via the API
    }


}