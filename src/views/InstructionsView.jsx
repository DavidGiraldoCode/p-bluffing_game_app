import { useRouter } from "vue-router";
import AppHeader from "../components/AppHeader.jsx";
import Footer from "../components/Footer.jsx";
import "../global-style.css";
import "./InstructionsView.css";

export default
  function InstructionsView() {

  const router = useRouter();

  function backEvenHandlerACB() {
    router.back()
    /*
    


Truth-telling with a twist, revealing the chosen card but adding a dash of confusion.
Crafting a well-executed lie, asserting they picked a different card than the actual choice.
Success! Players who skillfully deceive opponents earn the privilege of discarding the selected card.
Winning the Game:
The saga concludes when a player successfully discards all their cards. The victorious player stands as the ultimate Bluffing Royalty!

    */
  }

  return (
    <div class="container">
      <AppHeader class="fixed-top" onLeftClick={backEvenHandlerACB} icon={"Backarrow"} icon-text={"Back"} />

      <div class="title-text">
        <h2>Kings’s Bluffer</h2>
      </div>

      <div class="sub-title-text">
        <h3>Instructions:</h3>
      </div>





      <div class="instruction-text">
        <p>1. Each round, players take turns selection a card from their hand.</p>
        <p>2. The strategic showdown begins! Players aim to outsmart opponents by:</p>
        <p>   * <strong>Truth-telling with a twist</strong>, revealing the chosen card but adding a dash of confusion.</p>
        <p>   * <strong>Crafting a well-executed lie</strong>, asserting they picked a different card than the actual choice.</p>
        <p>3. Success! Players who skillfully deceive opponents earn the privilege of discarding the selected card.</p>
        <p> </p>
        <p>Winning the Game:</p>
        <p>The saga concludes when a player successfully discards all their cards. The victorious player stands as the ultimate Bluffing Royalty!</p>
      </div>

      <div class="sub-title-text">
        <h2>About the developers</h2>
      </div>

      <div class="instruction-text">
        <p>@github.com/Albin</p>
        <p>@github.com/martinbergsand</p>
        <p>@github.com/DavidGiraldoCode</p>
        <p>@github.com/Oscar</p>
      </div>
      <Footer />
    </div>
  );
}
