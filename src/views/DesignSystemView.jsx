import AppHeader from "../components/AppHeader.jsx";
import SessionID from "../components/SessionID.jsx";
import LBitem from "../components/LBitem.jsx";
import SelectContent from "../components/SelectContent.jsx";
import SingleAction from "../components/SingleAction.jsx";
import SectionTitle from "../components/SectionTitle.jsx"
import SectionSubtitle from "../components/SectionSubtitle.jsx"
import Swiper from "../components/Swiper.jsx";
import Footer from "../components/Footer.jsx";
import DoubleAction from "../components/DoubleAction.jsx";
import TurnTag from "../components/TurnTag.jsx";
import PlayerOrderItem from "../components/PlayerOrderItem.jsx";
import WinnerBanner from "../components/WinnerBanner.jsx";
import MenuItem from "../components/MenuItem.jsx";


export default function DesignSystemView(props) {

    function evtHandlerDSACB(e) {
        console.log("evtHandlerDSACB in DesignSystemView");
        props.onDesignSystem();
    }

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
        <SelectContent /> {/*NEEDS FIX*/}
        <AppHeader 
            headTitle={"King's Bluffer"}
            menuText={"Menu"}
            /> {/*OSCAR*/} {/*Working on MenuIcon*/}
        <SessionID 
            sessionID={"1234567890"}
            />  {/*OSCAR*/}
        <WinnerBanner
            description={"The winner is..."}
            descriptionIcon={""}
            playerName={"Martin"}
            winnerIconLeft={"🃏"}
            winnerIconRight={"🎉"}
            /> {/*MARTIN*/}
        <LBitem 
            rank={"1º"}
            playerName={"Nicolas Gomez"}
            cardIcon={"🃏"}
            cardText={"Cards:"}
            score={"5"}
            /> {/*OSCAR*/}
        <TurnTag 
            tag={"Bluff!"}/> {/*MARTIN*/}
        <PlayerOrderItem
            bluffIndicator={"Bluff!"}
            playerName={"Martin Sandberg"}
            buttonText={"Skip"}/> {/*MARTIN*/}
        <PlayerOrderItem
            bluffIndicator={"Bluff!"}
            playerName={"Albin Fransson"}
            buttonText={"Skip"}/> {/*MARTIN*/}
        {<MenuItem
        title={"How to play?"}/>} {/*ALBIN*/}
        <Swiper pileOfCards={['AC', '5S', 'KS', '2D', 'KH']} onSelectCardSprite={null} /> {/*NEEDS FIX*/} {/*DAVID*/}
        <DoubleAction
            description={"Hello, this is double action"}
            primaryText={"Yes"}
            secondaryText={"No"}
            primaryOnClick={evtHandlerDSACB}
            secondaryOnClick={null} /> {/*DAVID*/}
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