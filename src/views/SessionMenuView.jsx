import AppHeader from "../components/AppHeader.jsx";
import Footer from "../components/Footer.jsx";
import SessionID from "../components/SessionID.jsx";
import MenuItem from "../components/MenuItem.jsx";
import PlayerOrderItem from "../components/PlayerOrderItem.jsx";
import "../global-style.css";
import "./SessionMenuView.css";
import { goTo } from "../utilities.js";

export default function SessionMenuView(props) {

  function renderOrder(playerArray) {

    function skipHandler() {
      props.onSkip();
    }

    return (
      <div className="player-order-container">
          {playerArray.map((playerID) => {
              const playerInfo = props.leaderboard[playerID];
              const playerName = playerInfo ? playerInfo.playerName : "Unknown";
              const playerNameWithHost = (playerID == props.whosHost) ? `${playerName} (host)` : playerName;
              const yourTurn = props.whosTurn == playerID
              const skipEnable = (props.player.isHost && yourTurn)

              return (
                  <PlayerOrderItem
                      isBluffing={yourTurn}
                      canBeSkip={skipEnable}
                      bluffIndicator={"Bluffing"}
                      playerName={playerNameWithHost}
                      buttonText={"Skip"}
                      onSkipPlayer={skipHandler}
                  />
              );
          })}
      </div>
  );
  }

  return (
    <div>
      <AppHeader 
      routeDestination={`/game:${props.sessionID}`}
      icon={"Backarrow"}
      icon-text={"Back"}
      />
      <SessionID sessionID={props.sessionID} />
      {renderOrder(props.playerOrder)}
      <MenuItem
        title={"Instructions"}
        onCustomClick={x => { goTo(`/instructions:${props.sessionID}`) }} />
      <MenuItem
        title={"Leave the game"}
        onCustomClick={x => { goTo(`/exit:${props.sessionID}`) }} />
      <Footer class="m-top-m" />
    </div>
  );
}
