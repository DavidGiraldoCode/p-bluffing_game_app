import AppHeader from "../components/AppHeader";
import SessionID from "../components/SessionID";
import SectionTitle from "../components/SectionTitle";
import SectionSubtitle from "../components/SectionSubtitle";
import LBitem from "../components/LBitem";
import Footer from "../components/Footer";
import SingleAction from "../components/SingleAction";
import "../global-style.css";
import { goTo } from "../utilities";

export default function LeaderBoardView(props) {

    return (
        <div>
            <SectionTitle title={"King's bluffer 🃏"} />
            <SessionID sessionID={"1234567890"}/>
            <SectionSubtitle title={"Leaderboard"}/>
            <LBitem
                rank={"1º"}
                playerName={"Martin"}
                cardIcon={"🃏"}
                cardText={"Cards:"}
                score={"2"}
            />
            <LBitem
                rank={"2º"}
                playerName={"David (Host)"}
                cardIcon={"🃏"}
                cardText={"Cards:"}
                score={"4"}
            />
            <LBitem
                rank={"3º"}
                playerName={"Oscar"}
                cardIcon={"🃏"}
                cardText={"Cards:"}
                score={"5"}
            />
            <LBitem
                rank={"4º"}
                playerName={"Albin"}
                cardIcon={"🃏"}
                cardText={"Cards:"}
                score={"5"}
            />
            <Footer />

            <SingleAction
                title={"Useful Description"}
                description={"More Description"}
                buttonstate={"/* TODO */"}
                btnLabel={"Continue"}
                onCustomClick= {x => {goTo(props.routeDestination)}}
            />
        </div>
    );
};