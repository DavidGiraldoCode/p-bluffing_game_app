import "../global-style.css";
import "./JoinSessionView.css";

import AppHeader from "../components/AppHeader.jsx";
import SectionSubtitle from "../components/SectionSubtitle.jsx";
import SingleAction from "../components/SingleAction.jsx";
import Loading from "../components/Loading.jsx";
import { useRouter } from "vue-router";
export default
  function JoinSessionView(props) {

  const router = useRouter();

  function backEvenHandlerACB() {
    router.back()
  }

  const data = {
    sessionID: "",
    playerName: props.name,
  }

  function joinSessionHandlerACB() {
    props.onJoinSessionEvent(data.sessionID, data.playerName);
  }

  return (
    <div class="join-session-view container">

      <AppHeader onLeftClick={backEvenHandlerACB} icon={"Backarrow"} icon-text={"Back"} />
      <SectionSubtitle title="Joining Session" />

      <div class="join-session-input container">
        <div class="label-input container">
          <label>Your Name</label>
          <input
            onInput={(e) => (data.playerName = e.target.value)}
            type="text"
            value={data.playerName}
          />
        </div>
        <div class="label-input container">
          <label>SessionID</label>
          <input
            onInput={(e) => (data.sessionID = e.target.value)}
            type="text" placeholder={"ex. 12abc3de45f"}
          />
        </div>
      </div>
      {props.isLoading ? (
        <Loading
          message="Joining Session" />
      ) : (
        <SingleAction
          class="fixed-bottom"
          description="You will join the session as a guest"
          btnLabel="Confirm"
          onCustomClick={joinSessionHandlerACB}
        />
      )}
    </div>

  );
}