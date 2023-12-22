import SectionTitle from "../components/SectionTitle.jsx";
import SectionSubtitle from "../components/SectionSubtitle.jsx";
import PlayerOrderIter from "../components/PlayerOrderItem.jsx";
import SingleAction from "../components/SingleAction.jsx";
//import SessionShare from "../components/SessionShare.jsx";



export default function LobbyView(props){

    function renderPlayers(playerNames){
        // TODO fix this one.
        return
            <div>
                <p>player 1</p>
                <p>player 2</p>
            </div>
    }


    return ( <div>
        <div class="container">
            <SectionTitle title="Lobby"/>
            {/* <SessionShare sessionID=props.sessionID>*/}
            <SectionSubtitle title="Who´s playing"/>
            {renderPlayers(props.playerNames)}


        
        
        
        
        </div>
        <div class="fixed-bottom container">
            <SingleAction
                onCustomClick={props.onCustomClickACB}
                title = ""
                description = "Start the game whenever you are ready"
                buttonState = {false}
                btnLabel = "START!"
                class = "card-selector-action"
            />
            

        </div>
        
    </div>
    );

}