// SessionModel.js
// 2023-12-01, Albin Fransson & Martin Sandberg

import {BASE_URL} from "/src/apiConfig.js";
import { saveToFirebase, checkValidSessionID, checkIfPlayerExists, getPlayerData, playerFBCounter, sessionFBCounter, checkHostFB, deleteSessionFromFB } from "./firebaseModel";
//?---------------------------------------- Google authentication
import { getAuth, signInWithPopup, signInWithRedirect, onAuthStateChanged, signOut, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import {auth, provider } from "./main.jsx";
//?---------------------------------------- Google authentication
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
    - Remove player does not remove the player from playersFB on firebase. Only removes player from playerOrderFB.
    - Host does not have access to the playerIDs, since not fetching playersFB from FB. Therefore host cannot remove other players.
    - If one player joins same session of two devices. There will be syncronization issues.
*/

// =============================================================================
//                                 Player Class
// =============================================================================

class Player {
    constructor(playerName, playerID, isHost) {
        // Attributes of the player class. Always initialized when creating a new player.
        this.playerID = playerID;
        this.playerName = playerName;
        this.isHost = isHost;
        this.pileOfCards = []; //Local copy of the API pile. To be able to render
        this.selectedCard = null; // example: 'KD' , If a user re-joins session this will be set to null.
        this.numberOfCards = this.pileOfCards.length;
    }

    startContinuousUpdate() {
        // Set up an interval to update the player's card information every N seconds
        this.updateInterval = setInterval(async () => {
            await this.getPileOfCards();
        }, 5000);
    }

    stopContinuousUpdate() {
        // Clear the update interval when the player leaves)
        clearInterval(this.updateInterval);
    }

    async getPileOfCards(){
        // Gets the card codes from the piles of the player (from the API)
        // Example: pileOfCards = ['9H', 'AH', 'JH', '3H', 'AS']
        function listingCardCodeCB(card){
            return card.code;
        }
        const API_URL = `${BASE_URL}/deck/${sessionModel.sessionID}/pile/${this.playerID}/list/`;
        const data = await sessionModel.getDataFromAPI(API_URL);
        const id = this.playerID;
        this.pileOfCards = data.piles[id].cards.map(listingCardCodeCB);
        this.numberOfCards = this.pileOfCards.length;
    }
}


// =============================================================================
//                                 The model
// =============================================================================

export let sessionModel = {
    user: null, //? GoogleUserData
    sessionID: null, // the deck_id defined by the API
    player: [], // array of player objects
    playerOrder: [], // array of playerIDs stating the plaing order of the game
    yourTurn: null, // a playerID of 
    playerHost: null, //a playerID of the host
    localNumberOfPlayers: null, // players.length()
    gameOver: false,
    winner: null,
    leaderboard: {},
    readyToWriteFB: false,
    isloading: false,
    //! Temporal -------
    promiseState: {},
    //!-----------------

    // =================================== Session Management ==========================================
    async joinSession(sessionIdFromUI, newPlayerName){
        // Recives a sessionID from the UI.
        // Checks if sessionID is valid.
        // Checks if the user is already in the session. user.uid is in playersFB 
        // Two cases:
        // 1. The user is new to the session: OK
        // User joins session, fetches cards from API, updates firebase.
        // 2. User is already in the session.
        // get data from Firebase.
        // recreate local data using the data from Firebase and the API.

        const sessionIsValid = await checkValidSessionID(sessionIdFromUI);
        if(sessionIsValid){
            const playerExistsInFB = await checkIfPlayerExists(sessionIdFromUI, this.user.uid); // Boolean
            if(playerExistsInFB){
                // The player already exists in the session
                await this.reJoinSession(sessionIdFromUI, newPlayerName)
            }else{
                // Creates a new player which is added to the session
                if(this.localNumberOfPlayers < 1 || this.localNumberOfPlayers === null){
                    this.sessionID = sessionIdFromUI;
                    const player = await this.createPlayer(newPlayerName, this.user.uid, false)
                    await this.dealCards(player.playerID, 5); // always deals five cards
                    playerFBCounter(); // Adds one to the FBCounter
                    this.readyToWriteFB = true;
                }else{
                    //If one player already has joined on one device.
                    console.error("Only one player per device is supported!");
                }                
            }
        }else{
            console.error("SessionID is not valid!");
        }
    },

    async reJoinSession(sessionIdFromUI, newPlayerName){
        if(this.localNumberOfPlayers < 1 || this.localNumberOfPlayers === null){
            this.sessionID = sessionIdFromUI;
            console.log("this.sessionID ",  this.sessionID);
            const isHost = await checkHostFB(this.sessionID, this.user.uid);
            await this.reCreatePlayer(newPlayerName, this.user.uid, isHost);
            this.readyToWriteFB = true;
        }else{
            console.error("Only one player per device is supported!");
        } 
    },

    async createHost(newPlayerName){
        if(this.localNumberOfPlayers < 1 || this.localNumberOfPlayers === null){
            await this.getDeckID();
            // Call the createPlayer function on the model with the input value
            const player = await this.createPlayer(newPlayerName, this.user.uid, true); // Assuming the player is the host
            this.playerHost = player.playerID;
            // TODO change 5 cards into a attribute in the model that can be changed
            await this.dealCards(player.playerID, 5); // always deals five cards
            await this.nextPlayer(); // sets the host to start the first round
            playerFBCounter(); // Adds one player to the FBCounter
            sessionFBCounter(); // Adds one session to the FBCounter
            this.readyToWriteFB = true;
        }else{
            //If one player already has joined on one device.
            console.error("Only one player per device is supported!");
        }
    },



    removePlayer(playerIdToRemove){
        // Removes player from players array and leaderBoard. The playerIDToRemove of the parameter is the player that will be removed.
        // If the playerID to be removed also is yourTurn: nextPlayer() is called.
        this.playerOrder = this.playerOrder.filter(playerID => playerID !== playerIdToRemove);

        if(playerIdToRemove == this.yourTurn){
            this.nextPlayer();
        }
    },



    // =================================== Game flow ==========================================
    async nextPlayer(){
        // This function will be called while creating a session to initilize yourTurn
        // Assigns the next player in the playerOrder
        // If its the last player of a round the playerOrder will be shuffled and yourTurn = playerOrder[0]
        if(this.yourTurn === null){
            this.yourTurn = this.playerOrder[0];
        } else{
            const index = this.playerOrder.indexOf(this.yourTurn);
            const nextIndex = ((index + 1) % this.playerOrder.length);
            if (nextIndex !== 0) {
                console.log("Wihoo, got into normal nextPlayer");
                console.log("nextIndex : ", nextIndex);
                console.log("this.playerOrder[nextIndex] : ", this.playerOrder[nextIndex]);
        
                this.yourTurn = this.playerOrder[nextIndex];
                await saveToFirebase(this);  // Await the save operation
            } else {
                this.shufflePlayers();
                this.yourTurn = this.playerOrder[0];
                await saveToFirebase(this);  // Await the save operation
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

    gameOverCheck(playerID){
        // Checks if the player is out of cards. If someone is out of cards, change the model variable gameOver to True
        const player = this.player.find(p => p.playerID == playerID);
        if(player.pileOfCards.length == 0){
            this.gameOver = true;
            this.winner = playerID;
            //deleteSessionFromFB(this); //! Temporarely removed.
        };
    },

    // =================================== Player management ==========================================

    async createPlayer(playerName, playerID, isHost){
        // Creates an object from the player class and adds to the player array.
        // If no sessionID is active, no player will be added and an error is thrown
        // If there is less than 5 cards in the deck, no player will be added and an error is thrown
        if(this.sessionID !== null){
            const remaining = await this.getRemaningCardsOfDeck();
            if(remaining > 4){
                const newPlayer = new Player(playerName, playerID, isHost);
                this.player.push(newPlayer);   // adds newPlayer to players array
                this.playerOrder.push(newPlayer.playerID);
                this.localNumberOfPlayers = this.player.length;
            return newPlayer;
            } else {
                throw Error('Not enough cards in the deck to add a new player.');
            }
        }else{
            throw Error('Cannot create a non-host player without a SessionID');
        }
    },

    async reCreatePlayer(playerName, playerID, isHost){
        // Recreated the local player if a player joins a session that he has already joined.
        if(this.sessionID !== null){
            const player = new Player(playerName, playerID, isHost);
            await player.getPileOfCards();
            this.player.push(player);
            this.localNumberOfPlayers = this.player.length;
            return player;
        }
    },

    async dealCards(playerID, amountOfCards){
        // Draws amount of cards using the drawCard function. Adds these cards to a pile called playerID on the API.  When cards is removed, calls gameOverCheck to check if the player is out of cards.
        // This function will be used for example when clicking Create session or Join Session or if a player needs to draw a new card.
        const arrayOfCardCodes = await drawCard()
        const queryString = arrayOfCardCodes.join(',');
        const API_URL = `${BASE_URL}/deck/${this.sessionID}/pile/${playerID}/add/?cards=${queryString}`;
        const data = await this.getDataFromAPI(API_URL);
        const player = this.player.find(p => p.playerID == playerID);
        await player.getPileOfCards();
        this.gameOverCheck(playerID); //Might be a bit redundant to call gameOverCheck from here. You cannot get out of cards when dealing?

        async function drawCard(){
            // Help function to dealCards
            // Returns an array of the card codes eg. ['QD', 'KS', '8D'], depending of the amount of cards drawn.
            function drawCardCodeCB(card){
                return card.code;
            }
            const API_URL = `${BASE_URL}/deck/${sessionModel.sessionID}/draw/?count=${amountOfCards}`;
            const data = await sessionModel.getDataFromAPI(API_URL);
            return data.cards.map(drawCardCodeCB);
        }
    },

    async removeCard(playerID, selectedCard){
        // Removes a card from the players pile in the API. When card is removed. When cards is removed, calls gameOverCheck to check if the player is out of cards.
        // The selectedCard as argument will be passed from the player class attribute selectedCard.
        const API_URL = `${BASE_URL}/deck/${this.sessionID}/pile/${playerID}/draw/?cards=${selectedCard}`;
        const data = await this.getDataFromAPI(API_URL);
        const player = this.player.find(p => p.playerID == playerID);
        await player.getPileOfCards();  //Updates the local pile of cards.
        this.gameOverCheck(playerID);
    },

    // =================================== Authentification ==========================================
    async getAuthentification(){

        function loginACB(user){
            sessionModel.user=user;
        }
        try{

            //SignInWithPopUp version!
            await signInWithPopup(auth, provider);
            onAuthStateChanged(auth, loginACB); // the actual login
            return true;
        } catch (error){
            console.log("Authentication failed", error);
            return false;
        }
    },

    async signOut() {
        try {
            this.readyToWriteFB = false
            // Clear locally stored user data
            this.user = null
            // Sign out the user
            await signOut(auth);
    
            console.log("User signed out successfully");
            return true;
        } catch (error) {
            console.error("Sign out failed", error);
            return false;
        }
    },

    async checkAuthStatus() {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.user = user;
                    console.log("User was logged in already!")
                    resolve(true);
                } else {
                    this.user = null;
                    console.log("User was NOT logged!")
                    resolve(false);
                }
            });
        });
    },
    
    // =================================== API Interaction ==========================================

    async getDataFromAPI(API_URL){
        // Fetches data from the API in accordance to the API_URL as parameter. This function handles errors: response not OK, general errors from fetch and network offline specific error.
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`Failed to fetch deck. Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        }catch(error){
            console.error('Error fetching deck:', error.message);

            if (!navigator.onLine) {
                throw new Error('Network error: The device is offline.');
            }
            throw error;
        }
    },
 
    async getDeckID(){
        //Gets a new deck from the API and sets the sessionID from the model. Data is the whole respons.
        if(this.sessionID == null){
            const API_URL = `${BASE_URL}/deck/new/shuffle/`;
            const data = await this.getDataFromAPI(API_URL);
            const deck_id = data.deck_id;
            this.sessionID = deck_id;
        }else{
            throw Error("Cannot create a new session, since one is already active!")
        }
    },

    async getRemaningCardsOfDeck(){
        const API_URL = `${BASE_URL}/deck/${this.sessionID}/`;
        const data = await this.getDataFromAPI(API_URL);
        return data.remaining;
    },
}