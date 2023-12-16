import { useRoute } from "vue-router";
import SessionMenuView from "../views/SessionMenuView.jsx";
import { getPlayerNamesFromIDs } from "../utilities.js";
import { getPlayerData } from "../firebaseModel.js";
import resolvePromise from "../resolvePromise.js";
import { reactive, onMounted, watch, onUnmounted } from 'vue';

const SessionMenuPreObj = {
    props: ["model"],
    components: {
        SessionMenuView
    },
    setup(props) {
        //component state, reactive POJO
        const componentState = reactive({
            model: props.model,
            playerOrderNames: ["Oscar", "Martin", "Albin"],
            playerPromise: null,
            playerPromiseState: {},
        });

        function renderACB() {
            function skipPlayer() {
                componentState.model.nextPlayer();
            }

            return <SessionMenuView
                onSkip={skipPlayer}
                sessionID={componentState.model.sessionID}
                playerOrder={componentState.playerOrderNames}
                playerHost={componentState.model.playerHost}
                currentBluffler={componentState.model.yourTurn /* An alternative for the name*/}
            />
        };

        async function joinSessionACB(sessionIdURLparam, playerNameURLparam) {
            // Call the createPlayer function on the model with the input value. Not host
            await props.model.joinSession(sessionIdURLparam, playerNameURLparam); // Assuming the player is not the host
        }


        function createPlayerOrderNames(playerID) {
            componentState.playerPromise = getPlayerData("0lnkwyc1dxoh", "LZvSjUcIq4Nt6jzNqrruQXdXJWA2")
                .then(x => { return x.playerNameFB });
        }

        function checkACB() {
            return [componentState.playerOrderNames, componentState.playerPromiseState, componentState.playerPromise];
        }

        function effectACB() {
            //resolvePromise(componentState.playerPromise, componentState.playerPromiseState);
            console.log("🪲 --> Side Effects: ");
            console.log(componentState.playerPromiseState);
            //componentState.playerOrderNames[0] = componentState.playerPromiseState.playerNameFB;
            //console.log(componentState.playerOrderNames);

        }

        watch(checkACB, effectACB);


        function bornACB() {
            console.log("SessionMenuPreObj Alive!", componentState.model.playerOrder);
            joinSessionACB(useRoute().params.id, useRoute().params.user);
            console.log("Make the Call to Firebase");

            componentState.playerPromise = getPlayerData("0lnkwyc1dxoh", "LZvSjUcIq4Nt6jzNqrruQXdXJWA2")
              .then(x => { componentState.playerPromiseState = x; });

            //componentState.playerOrderNames = componentState.model.playerOrder.map(createPlayerOrderNames);

            //resolvePromise(componentState.playerPromise, componentState.playerPromiseState);

            /*
            componentState.playerOrderNames = componentState.model.playerOrder.map(x => getPlayerData("0lnkwyc1dxoh", x)
            .then(x => { console.log(x.playerNameFB) }));

            */
            //;
            //componentState.playerPromise = getPlayerData(useRoute().params.id, useRoute().params.user).then(x => console.log(x));
            //componentState.playerOrderNames = componentState.model.playerOrder.map(createPlayerOrderNames);

            //componentState.playerPromise = getPlayerData(useRoute().params.id, useRoute().params.user)
            //.then(player => componentState.playerPromiseState = player);

            //componentState.playerPromise = getPlayerData(useRoute().params.id, useRoute().params.user);
            ///resolvePromise(componentState.playerPromise, componentState.playerPromiseState);

            //componentState.playerOrderNames = componentState.model.playerOrder.map(createPlayerOrderNames);

        }

        function dieACB() {
            console.log("SessionMenuPreObj Die!");
        }

        //component lifecycle
        onMounted(bornACB);
        onUnmounted(dieACB);

        return renderACB;
    },
}
export default SessionMenuPreObj;