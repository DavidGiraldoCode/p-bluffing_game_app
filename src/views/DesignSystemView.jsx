import JoinSessionView from "./JoinSessionView.jsx";
import SelectView from "./SelectView.jsx";
import AppHeader from "../components/AppHeader.jsx";
import SessionID from "../components/SessionID.jsx";
import LBitem from "../components/LBitem.jsx";
import SelectContent from "../components/SelectContent.jsx";
import SingleAction from "../components/SingleAction.jsx";


export default function DesignSystemView(props) {
    return <div class="main-container">
        <h1>Hello h1</h1>
        <h2>Hello h2</h2>
        <h3>Hello h3</h3>
        <h4>Hello h4</h4>
        <p>Hello paragraph Normal</p>
        <p class="p-small">Hello paragraph Small</p>
        <button>Hello</button>
        <a href="#/design-system">Hello</a> <br />
        <input type="text" placeholder="Placeholder" /> <br />
        <input type="text" placeholder="Disabled input" disabled />
        <SingleAction/>
       
    </div>;
    /* <AppHeader />
        <SessionID />
        <LBitem />
        <SelectContent />*/
}