import LobbyView from "../views/LobbyView";
import { goTo } from "../utilities";
import { useRoute } from "vue-router";

export default function LobbyPresenter(props) {
  const route = useRoute();

  if (route.params !== undefined) {
    props.model.reJoinSessionURL(
      useRoute().params.uid,
      useRoute().params.session
    );
  }

  function onCustomClickHandlerACB() {
    goTo(`/game/${props.model.user.uid}/${props.model.sessionID}`);
  }

  return (
    <LobbyView
      sessionID={props.model.sessionID}
      onCustomClickACB={onCustomClickHandlerACB}
      leaderboard={props.model.leaderboard}
      playerOrder={props.model.playerOrder}
      whosHost={props.model.playerHost}
    />
  );
}
