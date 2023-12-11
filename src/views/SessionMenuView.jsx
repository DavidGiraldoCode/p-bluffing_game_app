import AppHeader from "../components/AppHeader.jsx";
import Footer from "../components/Footer.jsx";
import SessionID from "../components/SessionID.jsx";
import MenuItem from "../components/MenuItem.jsx";
import "../global-style.css";
import "./SessionMenuView.css";

export default
function SessionMenuView(props) {

  return (
    <div>
        // TODO Change AppHeader
        <AppHeader /> 
        <SessionID/>
        // TODO Round Order
        <p>INSERT ROUND ORDER HERE</p>
        <MenuItem
        title={"Instructions"}
        onCustomClick={null}/>
        <MenuItem
        title={"Leave the game"}
        onCustomClick={null}/>
        <Footer/>
    </div>
  );
}
