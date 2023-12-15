import AppHeader from "../components/AppHeader.jsx";
import Footer from "../components/Footer.jsx";
import SessionID from "../components/SessionID.jsx";
import MenuItem from "../components/MenuItem.jsx";
import PlayerOrderItem from "../components/PlayerOrderItem.jsx";
import "../global-style.css";
import "./SessionMenuView.css";

export default function SessionMenuView(props) {

  //console.table(props.sessionID);
  //console.log(SessionMenuView);

  function renderOrder(playerIDsArray) {

    function skipHandler() {
      props.onSkip();
    }

    function fillPlayerCB(playerID) {
      return <PlayerOrderItem
        isBluffing={false}
        canBeSkip={true}
        bluffIndicator={null}
        playerName={playerID}
        buttonText={null}
        onSkipPlayer={skipHandler} />
    }
    return <div class="player-order-container"> {playerIDsArray.map(fillPlayerCB)} </div>
  }

  return <div class="session-menu-view">
    <AppHeader routeDestination={`/game:${12345}`} />
    <SessionID sessionID={props.sessionID} />
    {renderOrder(props.playerOrder)}
    <MenuItem title={"Instructions"} routeDestination={`/instructions:${123456}`} />
    <MenuItem title={"Leave the game"} routeDestination={`/exit:${123456}`} />
    <Footer class="m-top-m" />
  </div>;
}
