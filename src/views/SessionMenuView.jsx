import AppHeader from "../components/AppHeader.jsx";
import Footer from "../components/Footer.jsx";
import SessionID from "../components/SessionID.jsx";
import MenuItem from "../components/MenuItem.jsx";
import PlayerOrderItem from "../components/PlayerOrderItem.jsx";
import "../global-style.css";
import "./SessionMenuView.css";
import { goTo } from "../utilities.js";

export default
  function SessionMenuView(props) {
  return (
    <div>

      <AppHeader routeDestination={`/game:${12345}`} />
      <SessionID sessionID={"1234567890"/*props.sessionID*/} />
        // TODO Round Order
      <p>INSERT ROUND ORDER HERE</p>
      <PlayerOrderItem
        bluffIndicator={"Bluff!"}
        playerName={"Martin Sandberg"}
        buttonText={"Skip"} />
      <PlayerOrderItem
        bluffIndicator={null}
        playerName={"Martin Sandberg"}
        buttonText={null} />
      <PlayerOrderItem
        bluffIndicator={null}
        playerName={"Martin Sandberg"}
        buttonText={null} />
      <PlayerOrderItem
        bluffIndicator={null}
        playerName={"Martin Sandberg"}
        buttonText={null} />
      <MenuItem
        title={"Instructions"}
        onCustomClick={x => { goTo(`/instructions:${123456}`) }} />
      <MenuItem
        title={"Leave the game"}
        onCustomClick={x => { goTo(`/exit:${123456}`) }} />
      <Footer />
    </div>
  );
}
