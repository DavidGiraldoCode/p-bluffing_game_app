import "../global-style.css";
import "./JoinSessionView.css";

import AppHeader from "../components/AppHeader.jsx";
import SectionSubtitle from "../components/SectionSubtitle.jsx";
import SingleAction from "../components/SingleAction.jsx";
import Footer from "../components/Footer.jsx";

export default
function JoinSessionView(props) {

  function JoiningHandlerACB() {
    props.onJoiningSession({ id: "some-user" });
  }

  return (
    <div class="join-session-view-container">

      <AppHeader routeDestination={`/join:${12345}`} 
            icon={"Backarrow"}
            icon-text={"Back"}
            /> 
        <SectionSubtitle title="Joining Session" 
            />

        <div class="join-session-input-container">
            <p className="p-small">Your Name</p>
            <input type="text" placeholder={"MasterBluffer"} onChange={null} />
            <p className="p-small">SessionID</p>
            <input type="text" placeholder={"1234567890"} onChange={null} />
        </div>

        <SingleAction
            class=""
            description="You will join the session as a guest"
            btnLabel="Confirm"
            onCustomClick={JoiningHandlerACB}
            />

        <Footer /> 

    </div>
  
  );
}

{/*  OLD JoinSession
        {<JoinHeader />}
        {<JoinSessionForm />}
        {/*<CreateSession clickEvent={joinSessionHandler}/>
        {<Footer />}
        */}