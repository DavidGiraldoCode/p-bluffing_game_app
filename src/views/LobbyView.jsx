import SectionTitle from "../components/SectionTitle.jsx";
import SectionSubtitle from "../components/SectionSubtitle.jsx";
import PlayerOrderItem from "../components/PlayerOrderItem.jsx";
import SingleAction from "../components/SingleAction.jsx";
import SessionShare from "../components/SessionShare.jsx";
import "../global-style.css";
import "./LobbyView.css";
import { goTo } from "../utilities";

export default function LobbyView(props) {

  function renderPlayers(playerArray) {
    //playerArray = props.playerOrder
    // TODO fix this one.
    return (
      <div class="lobby-player-order container">
        {playerArray.map((playerID) => {
          const playerInfo = props.leaderboard[playerID];
          const playerName = playerInfo ? playerInfo.playerName : "Unknown";
          const playerNameWithHost =
            playerID == props.whosHost ? `${playerName} (host)` : playerName;

          return (
            <PlayerOrderItem
              isBluffing={""}
              canBeSkip={false}
              bluffIndicator={""}
              playerName={playerNameWithHost}
              buttonText={""}
              onSkipPlayer={""}
            />
          );
        })}
      </div>
    );
  }

  function howToClickHandlerACB() {
    goTo(`/instructions`);
  }

  return (
    <div class="container">
      <SectionTitle title="Lobby" />
      <SessionShare sessionID={props.sessionID} />
      <SectionSubtitle title="Who´s playing" />
      {renderPlayers(props.playerOrder)}
      <div class="fixed-bottom container">
        <SingleAction
          onCustomClick={props.onCustomClickACB}
          title=""
          description="Start the game whenever you are ready"
          buttonState={false}
          btnLabel="START!"
          class="card-selector-action m-bottom-m"
        />
        <button class="primary-no-border m-bottom-s" onClick={howToClickHandlerACB}>
          How to play?
        </button>
      </div>
    </div>
  );
}
