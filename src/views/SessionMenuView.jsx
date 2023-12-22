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
import { goTo } from "../utilities.js";

export default function SessionMenuView(props) {

  const router = useRouter();

  function backEvenHandlerACB() {
    router.back()
  }

  function howToHandlerACB() {
    goTo(`/instructions`);
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
      <AppHeader class="m-bottom-s" title="Menu" actionType={"secondary"} onLeftClick={backEvenHandlerACB} icon={"Playerorder"} iconText={"Back to game"} />
      <SessionShare
        sessionID={props.sessionID}
      />
      <SectionSubtitle title="Who's turn?" />

      {renderOrder(props.playerOrder)}
      <div class="menu-items container fixed-bottom">
        <button onClick={howToHandlerACB} class="primary-no-border"> How to play? </button>
        <MenuItem
          title={"Leave the game"}
          actionTye={"ternary"}
          routeDestination={`/exit`/*${props.sessionID}*/} />
      </div>
    </div>
  );
}
/* <MenuItem
          title={"How to play?"}
          actionTye={"primary"}
          routeDestination={`/instructions`} />*/
