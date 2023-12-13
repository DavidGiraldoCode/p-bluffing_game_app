import AppHeader from "../components/AppHeader";
import SessionID from "../components/SessionID";
import SectionTitle from "../components/SectionTitle";
import LBitem from "../components/LBitem";
import Footer from "../components/Footer";
import SingleAction from "../components/SingleAction";
import "../global-style.css";

export default function LeaderBoardView(props){

    return(
        <div>
            <AppHeader />
            <SessionID 
                sessionID = {"1234567890"}
                />
            <SectionTitle 
                title={"Leaderboard"}
                />
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

            
            />
        </div>
    );
};