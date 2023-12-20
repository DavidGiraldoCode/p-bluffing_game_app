## App description

Social game designed for young adults, played in-person using smartphones. Each player receives five cards from a digital deck via a web app implementation, utilizing the DeckOfCardsAPI. The objective is to discard all cards by bluffing about your hand while others decipher the truth. Players join a gaming session, receive random cards, and take turns bluffing. The app sequences rounds, and prompts players' turns. Successfully deceiving others allows card disposal; failure adds a new card. The first to discard all cards wins.

**Visit the app here:**

> [https://kth-bluffing-game.web.app](https://kth-bluffing-game.web.app) <br>
> [Play here in the Test UI](https://kth-bluffing-game.web.app/#/test-ui) <br>
> [Design System](https://kth-bluffing-game.web.app/#/design-system) <br>

## How to clone and run

```bash
git clone https://github.com/DavidGiraldoCode/p-bluffing_game_app.git
npm install
npm run dev
```

## Product road map (project on-going plan)

| Backlog (ToDo)                                | Doing (Develop)                                | Done (Deploy) |
|-----------------------------------------------|-------------------------------------------------|---------------|
|  - Create lobby                               | - Running usability test                        | - Working Model |
|                                               | - Implement final UI brand design               | - Configure hosting on Firebase and Deploy app |
|                                               |                                                 | - Connect app to RealTimeDatabase |
|                                               |                                                 | - Select and test third-party component |
|                                               |                                                 | - Create Firebase RealTime communication scheme |
|                                               |                                                 | - Connect to API |
|                                               |                                                 | - Multiplayer functionality |
|                                               |                                                 | - Mobile-only-experience |
|                                               |                                                 | - Setup project with in Vite + Vue + JSX |

## Ongoing branches

- `main`: Has not been updated
- `develop:` contains the most stable version of the code
- `deploy_test:` contains a copy of develop that has built for deployment
- **Other branches:** Container on-going work by features.

## Project file structure

```
p-bluffing_game_app/
├── index.html
├── .gitignore
├── src/
│ ├── assets/
│ │ └── images/
│ ├── components/
│ │ ├── AppHeader.jsx
│ │ ├── AppHeader.css
│ │ ├── Footer.jsx
│ │ ├── Footer.css
│ │ └── ...
│ ├── presenters/
│ │ ├── DesignSystemPresenter.jsx
│ │ ├── GamePresenter.jsx
│ │ ├── JoinSessionPresenter.jsx
│ │ └── ...
│ ├── views/
│ │ ├── DesignSystemView.jsx
│ │ └── ...
│ ├── AppRoot.jsx
│ ├── main.jsx
│ ├── SessionModel.js
│ ├── firebaseModel.js
│ ├── utilities.js
│ ├── reset.css
│ └── global-style.css
├── package.json
├── vite.config.js
└── [README.md](http://readme.md/)
```

This folder follows a modular structure, grouping related files into distinct directories based on their functionality. this approach aims to preserve a clear separation of concerns, isolating reusable components that can implemented across different parts of the application.. Also, as the application grows, this structure can accommodate new views, components, and presenters without becoming cluttered or disorganized.

### Folders purpose:

1. **Components**: Contains reusable UI components like `AppHeader` and `Footer`, each paired with its corresponding `.jsx` and `.css` files. This allows for component-specific styles and logic to be neatly encapsulated.
2. **Presenters**: Contains presenter components responsible for handling logic and state management for specific views or sections of the application. Each presenter has its own `.jsx`.
3. **Views**: Stores individual view components like `DesignSystemView`, each representing a distinct page or section of the application. These components render the UI and handle the layout using imported components from the `Components` directory.
4. **Assets**: Stores assets like images, providing a centralized location for project-related media.
5. **main.jsx:** Bootstraps the application and mounts the App.js to the HTML.
6. **AppRoot.jsx** : Entry point for Routers and presenters that define the application structure. It import views, presenters, and other necessary files to build the app.
7. **SessionModel.js**, **firebaseModel.js**, Contains the business logic, API interactions, the models for managing data and interactions within the application.
8. **utilities.js**: Contain utility functions.
9. **Reset.css** and **global-style.css**: Contain global styles and resets for consistent styling across the application.

## App Model Documentation

📜File **SessionModel.js**

### S**essionModel**

The sessionModel object represents the overall game state and functionality.

**Attributes:**

- `sessionID`: The unique identifier for the game session.
- `player`: Local player object.
- `playerOrder`: An array representing the order in which players take their turns.
- `yourTurn`: The `playerID` indicating whose turn it is.
- `playerHost`: PlayerID of the host.
- `localNumberOfPlayers`: The number of players in the local machine.
- `gameOver`: A boolean indicating whether the game is over.
- `winner`: The `playerID` of the winner.
- `leaderboard`: A dictionary containing player information.
- `readyToWriteFB`: A boolean indicating whether the model is ready to be saved to Firebase.
- `isLoading`: Boolean indicating whether data is being loaded.
- `startWithCards`: Number of cards to start the game with.

**Functions for Session Management:**

- `joinSession(sessionIdFromUI, newPlayerName)`: Joins a session, creates a new player, and deals 5 cards to that player.
- `reJoinSession(sessionIdFromUI, newPlayerName)`: Rejoins a session the player already been a part of. Able to choose a new name.
- `reJoinSessionURL`: Function to handle add the user again for persistency of page refresh.
- `createHost(newPlayerName)`: Creates a host player, initializes the deck, and deals 5 cards.
- `removePlayer(playerIdToRemove)`: Removes the playerID from playerOrder.
- `removePlayer(playerIdToRemove)`: Removes a player from the game.
- `reset()`: Resets the model, except the users google data.
  
**Functions for Game Flow:**
  
- `nextPlayer()`: Advances to the next player in the turn order.
- `shufflePlayers()`: Shuffles the player order array using Fisher-Yates Shuffle Algorithm. */This function is never used in current version./*
- `gameOverCheck(playerID)`: Checks if a player is out of cards and updates the game state accordingly.

**Functions for Player Management:**
  
- `createPlayer(playerName, playerID, isHost)`: Creates a player object and sets local player and adds to the playerOrder.
- `reCreatePlayer(playerName, playerID, isHost)`: Recreates the player (only locally) if the player already has joined once.
- `dealCards(playerID, amountOfCards)`: Draws cards and adds them to a player's pile.
- `removeCard(playerID, selectedCard)`: Removes a card from a player's pile.

  
**Functions for Authentification:**
- `getAuthentification()`: Gets the authentification from the Google provider and saves the user to the model.
- `signOut()`: Removes the user from the model and signs out from the Google provider.
- `checkAuthStatus()`: Checks if the user already is logged in to Google and saves the user to the model.

**Functions for API Interaction:**
- `getDataFromAPI(API_URL)`: Fetches data from the API, handling errors.
- `getDeckID()`: Gets a new deck ID from the API.
- `getRemainingCardsOfDeck()`: Retrieves the remaining cards of the current deck.

### **Player Class**

📜File **SessionModel.js**

The Player class represents a player in the card game.

**Attributes:**

- `playerID`: A unique identifier for the player.
- `playerName`: The name of the player.
- `isHost`: A boolean indicating whether the player is the host.
- `pileOfCards`: An array representing the player's pile of cards. For local rendering purpose only.
- `selectedCard`: The currently selected card.
- `numberOfCards`: The total number of cards in the player's pile.

**Methods:**

- `getPileOfCards()`: Fetches the card codes from the API for the player's pile. For rendering purpose.

### Firebase persistence

📜 file **firebaseModel.js**

**Functions for Statistics:**

- `playerFBCounter()`: Adds one number of how many players have played the game to the FB database. For statistic purpose.
- `sessionFBCounter()`: Adds one number of how many sessions have created to the FB database. For statistic purpose.

**Functions for Session Validation:**

- `deleteSessionFromFB(model)`: Deletes the session from FB. */This function is not used in current version/*
- `checkValidSessionID(sessionID)`: Checks whether a session ID is valid on Firebase.
- `checkIfPlayerExists(sessionID, userID)`: Checks if the userID already exists on the session on FB.

**Functions for Player Data:**

- `getPlayerData(sessionID, userID)`: Gets the a certain players information from the session on FB.
- `checkHostFB(sessionID, userID)`: Gets a certain players information if the player is host or not.

**Functions for Model Conversion:**

- `modelToPersistance(model)`: Converts the model into data to be stored in Firebase.
- `persistanceToModel(firebaseData, model)`: Converts Firebase data and saves it to the model.

**Functions for Firebase Interaction:**

- `savePlayersFB(model)`: Updates the playersFB on Firebase. Separate function since no information regarding cards should be stored on FB.
- `saveToFirebase(model)`: Checks if the model is ready and saves it to Firebase.
- `readFromFirebase(model)`: Reads data from Firebase and sets the model to ready.
- `observeFirebaseModel(model)`: Observes changes in the model and updates Firebase accordingly.
- `connectToFirebase(model, watchFunctionACB)`: Connects to Firebase and sets up Firebase if a session ID exists.
- `setupFirebase(model, watchFunctionACB)`: Sets up Firebase by calling readFromFirebase and observeFirebaseModel.
  
## Project setup

Step by step of what we did to setup Vite project with Vue and `.jsx` (instead of `.vue`)

1. Ran Vite scaffold command for Vue
    
    ```jsx
    npm create vite@latest my-vue-app -- --template vue
    ```
    
    ```jsx
    Scaffolding project in /Users/davidmacbook/Documents/kth_code_workspace/p-bluffing_cards_game_app/p-bluffing_game_app...
    
    Done. Now run:
    
      cd p-bluffing_game_app
      npm install
      npm run dev
    ```
    

1. Created a App.jsx file as the Root
    
    ```jsx
    export default
    function App(props){
        return (<div>Hello World!</div>);
    }
    ```
    

1. Changed extension from `.vue` to `.jsx` on the `main.js` when importing App
    
    ```jsx
    //import App from './App.vue'
    import App from './App.jsx'
    ```
    
2. Installed `@vitejs/plugin-vue-jsx` plugin and updated `vite.config.js` by adding `vueJsx()` as a new element in the `plugins` key.
    
    ```bash
    npm install @vitejs/plugin-vue-jsx
    ```
    
    ```jsx
    //vite.config.js
    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'
    import vueJsx from '@vitejs/plugin-vue-jsx';
    
    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [vue(), vueJsx()],
    })
    ```
    

1. Re-started the `npm run dev`.
2. Removed the `App.vue` and `HelloWorld.vue` files.
3. Went to GitHub to create repo **‘’p-bluffing_game_app”**
4. Connected the GitHub repo
    
    ```bash
    git init
    git add -A
    git commit -m "first commit"
    git branch -M main
    git remote add origin https://github.com/DavidGiraldoCode/p-bluffing_game_app.git
    git push -u origin main
    ```
    
    ***note:** No need to add README.md because Vite scaffold creates it automatically.*

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
