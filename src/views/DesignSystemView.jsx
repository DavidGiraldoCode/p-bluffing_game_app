import AppHeader from "../components/AppHeader.jsx";
import SessionID from "../components/SessionID.jsx";
import LBitem from "../components/LBitem.jsx";
import SelectContent from "../components/SelectContent.jsx";
import SingleAction from "../components/SingleAction.jsx";
import SectionTitle from "../components/SectionTitle.jsx"
import SectionSubtitle from "../components/SectionSubtitle.jsx"
import Swiper from "../components/Swiper.jsx";
import Footer from "../components/Footer.jsx"

export default function DesignSystemView(props) {
    return <div class="View container">
        <SectionTitle title="Design System" />
        <SectionSubtitle title="Native Components" />
        <h1>Hello h1</h1>
        <h2>Hello h2</h2>
        <h3>Hello h3</h3>
        <h4>Hello h4</h4>
        <p>Hello paragraph Normal</p>
        <p class="p-small">Hello paragraph Small</p>
        <button>Primary action</button>
        <button class="secondary">Secondary action</button>
        <a href="#/design-system">External link</a> <br />
        <label> Input Label (enable)</label>
        <input type="text" placeholder="Placeholder" />
        <label> Input Label (disable)</label>
        <input type="text" placeholder="Disabled input" disabled />
        <SectionSubtitle title="Custom Components" />
        <JoinSessionForm
            class="m-bottom-m"
            onInputName={null}
            onInputSessionID={null}
            onJoinSession={null} />
        <SelectContent /> 
        <AppHeader /> {/*NEEDS FIX*/}
        <SessionID /> {/*NEEDS FIX*/}
        {/*<WinnerBanner>*/}
        <LBitem /> {/*NEEDS FIX*/}
        {/*<MenuItem>*/}
        {/*<TurnTag>*/}
        {/*<PlayerOrderItem>*/}
        <Swiper pileOfCards={['AC', '5S', 'KS', '2D', 'KH']} onSelectCardSprite={null}/> {/*NEEDS FIX*/}
        {/*<DoubleAction>*/}
        <SingleAction
            title="Title"
            description="Description"
            buttonState={false}
            btnLabel="Create session"
            onCustomClick={null} />
        <SingleAction
            title=""
            description="Description"
            buttonState={false}
            btnLabel="Create session"
            onCustomClick={null} />
        <SingleAction
            title=""
            description=""
            buttonState={false}
            btnLabel="Create session"
            onCustomClick={null} />
        <Footer />
    </div>;
}