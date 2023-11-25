# p-bluffing_game_app
## App description

Social game designed for young adults, played in-person using smartphones. Each player receives five cards from a digital deck via a web app implementation, utilizing the DeckOfCardsAPI. The objective is to discard all cards by bluffing about your hand while others decipher the truth. Players join a gaming session, receive random cards, and take turns bluffing. The app sequences rounds, and prompts players' turns. Successfully deceiving others allows card disposal; failure adds a new card. The first to discard all cards wins.

## Project setup
Step by step of what we did to setup Vite project with Vue and `.jsx` (instead of `.vue`)

1. Ran Vite scaffold command for Vue <br>
    INPUT:
    ```bash
    npm create vite@latest my-vue-app -- --template vue
    ```
    OUTPUT:
    ```bash
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
    
2. Installed `@vitejs/plugin-vue-jsx` plugin and updated `vite.config.js` by adding `vueJsx()` as a new element in the `plugins` key.<br>
    INPUT:
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
4. Connected the GitHub repo <br>
   INPUT:
    ```bash
    git init
    git add -A
    git commit -m "first commit"
    git branch -M main
    git remote add origin https://github.com/DavidGiraldoCode/p-bluffing_game_app.git
    git push -u origin main
    ```
    note: No need to add README.md because Vite scaffold creates it automatically.

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
