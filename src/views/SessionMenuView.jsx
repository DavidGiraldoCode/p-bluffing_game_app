import AppHeader from "../components/AppHeader.jsx";
import Footer from "../components/Footer.jsx";
import SessionID from "../components/SessionID.jsx";
import MenuItem from "../components/MenuItem.jsx";
import SectionSubtitle from "../components/SectionSubtitle.jsx"
import PlayerOrderItem from "../components/PlayerOrderItem.jsx";
import "../global-style.css";
import "./SessionMenuView.css";
import { useRouter } from "vue-router";
import SessionShare from "../components/SessionShare.jsx";

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
      <div className="players-order container">
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
      <SessionShare 
      sessionID={props.sessionID}
      />
      <SectionSubtitle title="Who's turn?" />

      {renderOrder(props.playerOrder)}
      <div class="menu-items container fixed-bottom">
        <MenuItem
          title={"How to play?"}
          actionTye={"primary"}
          routeDestination={`/instructions`/*${props.sessionID}*/} />
        <MenuItem
          title={"Leave the game"}
          actionTye={"secondary"}
          routeDestination={`/exit`/*${props.sessionID}*/} />
      </div>


    </div>
  );
}
