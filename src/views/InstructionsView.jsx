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
  }

  return (
    <div class="container">
      <AppHeader class="fixed-top" onLeftClick={backEvenHandlerACB} icon={"Backarrow"} icon-text={"Back"} />

      <div class="title-text">
        <h1>Instructions</h1>
      </div>

      <div class="sub-title-text">
        <h2>How to play?</h2>
      </div>

      <div class="instruction-text">
        <p>1. A person creates a gaming session.</p>
        <p>2. Others join that gaming session using the ID, only by enering a gaming sesion player are able to get their cards.</p>
        <p>3. Each player get 5 random cards The app indicates a random order for round.</p>
        <p>4. The app indicates a random order for round.</p>
        <p>5. The app indicates whose turn is it.</p>
        <p>6. The player selects a card to bluff about.</p>
        <p>7. The others ones agree on if is it true or false.</p>
        <p>8. If the player deceived the others, gets rid of that card, if not, a new card will be added to his hand.</p>
        <p>9. The first player to get rid of all their card wins.</p>
      </div>

      <div class="sub-title-text">
        <h2>About the developers</h2>
      </div>

      <div class="instruction-text">
        <p>@github.com/Albin</p>
        <p>@github.com/Martin</p>
        <p>@github.com/DavidGiraldoCode</p>
        <p>@github.com/Oscar</p>
      </div>
      <Footer />
    </div>
  );
}
