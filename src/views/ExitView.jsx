import { useRouter } from "vue-router";
import AppHeader from "../components/AppHeader.jsx";
import SectionSubtitle from "../components/SectionSubtitle.jsx";
import SingleAction from "../components/SingleAction.jsx";
import "../global-style.css";
import "./ExitView.css";

export default
  function ExitView(props) {

  const router = useRouter();

  function backEvenHandlerACB() {
    router.back()
  }

  function logoutHandlerACB() {
    props.onLogOut();
  }

  return (
    <div class="container">
      <AppHeader onLeftClick={backEvenHandlerACB} icon={"Backarrow"} icon-text={"Back"} />
      <div class="exit-text">
        <SectionSubtitle title="Leaving the game" />
        <p>If you leave your progress will be saved until the current session ends.</p>
        <p>If you are the host, no one will be able to skip a players turn.</p>
      </div>
      <SingleAction
        class="fixed-bottom"
        description="Are you sure you want to leave?"
        buttonState={false}
        btnLabel="Yes"
        onCustomClick={logoutHandlerACB}    //TODO Add customEventHandler
      />
    </div>
  );
}
