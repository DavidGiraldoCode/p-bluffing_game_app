import SessionID from "../components/SessionID";
import SectionTitle from "../components/SectionTitle";
import SectionSubtitle from "../components/SectionSubtitle";
import LBitem from "../components/LBitem";
import Footer from "../components/Footer";
import SingleAction from "../components/SingleAction";
import "../global-style.css";
import { goTo } from "../utilities";

function renderLeaderboard(sortedPlayers){
    return sortedPlayers.map((player, index) => (
        <LBitem
            rank={`No.${index + 1}`}
            playerName={player.playerName}
            cardIcon={"🃏"}
            cardText={"Cards:"}
            score={`${player.numberOfCards}`}        
        />
    ));
}

export default function LeaderBoardView(props) {

    // creates an array from the leaderboard object
    const players = Object.keys(props.leaderboard).map((playerID) => ({
        playerID,
        ...props.leaderboard[playerID]
    }));
    const sortedPlayers = players.sort((a, b) => a.numberOfCards - b.numberOfCards);

    return (
        <div>
            <SectionTitle title={"King's bluffer 🃏"} />
            <SessionID sessionID={props.sessionID}/>
            <SectionSubtitle title={"Leaderboard"}/>
            {renderLeaderboard(sortedPlayers)}
            <SingleAction
                title={""}
                description={""}
                buttonstate={"/* TODO */"}
                btnLabel={"Continue"}
                onCustomClick= {x => {goTo(props.routeDestination)}}
            />
            <Footer />
        </div>
    );
};