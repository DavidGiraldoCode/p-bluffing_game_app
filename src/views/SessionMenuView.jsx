import AppHeader from "../components/AppHeader.jsx";
import Footer from "../components/Footer.jsx";
import SessionID from "../components/SessionID.jsx";
import MenuItem from "../components/MenuItem.jsx";
import PlayerOrderItem from "../components/PlayerOrderItem.jsx";
import "../global-style.css";
import "./SessionMenuView.css";
import { useRouter } from "vue-router";

export default function SessionMenuView(props) {

  const router = useRouter();

  function backEvenHandlerACB() {
    router.back()
  }
  function renderOrder(playerArray) {

    function skipHandler() {
      props.onSkip();
    }

    return (
      <div className="player-order container">
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
    <div class="container">
      <AppHeader title={"Menu"/*TODO*/} onLeftClick={backEvenHandlerACB} icon={"Backarrow"} icon-text={"Back"} />
      <SessionID sessionID={props.sessionID} />
      <p>Who's turn?</p>
      {renderOrder(props.playerOrder)}
      <MenuItem
        title={"HOW TO PLAY?"}
        routeDestination={`/instructions`/*${props.sessionID}*/} />
      <MenuItem
        title={"LEAVE THE GAME"}
        routeDestination={`/exit`/*${props.sessionID}*/} />
      
    </div>
  );
}
