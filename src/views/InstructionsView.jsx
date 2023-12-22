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
    <div class="container m-bottom-m">
      <AppHeader class="fixed-top" onLeftClick={backEvenHandlerACB} icon={"Backarrow"} icon-text={"Back"} />

      <div class="title-text"> { /*<h2> OLD King bluffer /h2> */}  <br></br> </div>


      <div class="sub-title-text">
        <h3>Instructions</h3>
      </div>

      <div class="instruction-text-2">
        <p>1. Each round, pick a card from your hand.</p>
        <br></br>

        <p>2. Outsmart opponents by </p>
        <ul>
          <li><p><strong>Truth with a twist: </strong> reveal your card with a dash of confusion.</p></li>
          <br></br>
          <li><p><strong>Bluff, a well-executed lie: </strong> assert a different card than your actual choice.</p></li>
        </ul>
        <br></br>


        <p>3. Success! Deceive opponents to discard the selected card.</p>
        <br></br>

        <p>Winning the Game:</p>
        <p>The saga concludes when you successfully discard all your cards. You become the Bluffing Royalty!</p>

      </div>

      <div class="sub-title-text">
        <h3>About the developers</h3>
      </div>

      <div class="instruction-text-2 m-bottom-m">
        <p class="p-small">
          We're proudly KTH students, merging tech
          and design for innovative solutions.
          Check out our GitHub profiles: </p>
        <ul>
          <li><p>👨‍💻<a class="p-small" href="https://github.com/AlbinFransson" target="_blank">AlbinFransson</a> </p></li>
          <li><p>👨‍💻<a class="p-small" href="https://github.com/martinbergsand" target="_blank">MartinSandberg</a> </p></li>
          <li><p>👨‍💻<a class="p-small" href="https://github.com/DavidGiraldoCode" target="_blank">DavidGiraldoCode</a> </p></li>
          <li><p>👨‍💻<a class="p-small" href="https://github.com/osbac" target="_blank">OscarBackstrom</a> </p></li>
        </ul>
      </div>

      <Footer />

    </div>
  );
}
