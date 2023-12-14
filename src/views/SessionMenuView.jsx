import AppHeader from "../components/AppHeader.jsx";
import Footer from "../components/Footer.jsx";
import SessionID from "../components/SessionID.jsx";
import MenuItem from "../components/MenuItem.jsx";
import PlayerOrderItem from "../components/PlayerOrderItem.jsx";
import "../global-style.css";
import "./SessionMenuView.css";
import { goTo } from "../utilities.js";

export default function SessionMenuView(props) {

  console.table(props);
  console.log(SessionMenuView);

  function renderOrder(playerArray) {

    function skipHandler() {
      props.onSkip();
    }

    function fillPlayer() {
      return <PlayerOrderItem
        isBluffing={false}
        canBeSkip={true}
        bluffIndicator={null}
        playerName={"Martin Sandberg"}
        buttonText={null}
        onSkipPlayer={skipHandler} />
    }
    return <div class="player-order-container"> {playerArray.map(fillPlayer)} </div>
  }

  return (
    <div>
      <AppHeader routeDestination={`/game:${12345}`} />
      <SessionID sessionID={props.sessionID} />
      {renderOrder(props.playerOrder)}
      <MenuItem
        title={"Instructions"}
        onCustomClick={x => { goTo(`/instructions:${123456}`) }} />
      <MenuItem
        title={"Leave the game"}
        onCustomClick={x => { goTo(`/exit:${123456}`) }} />
      <Footer class="m-top-m" />
    </div>
  );
}
