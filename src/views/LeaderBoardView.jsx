import SessionID from "../components/SessionID";
import SectionTitle from "../components/SectionTitle";
import SectionSubtitle from "../components/SectionSubtitle";
import LBitem from "../components/LBitem";
import Footer from "../components/Footer";
import SingleAction from "../components/SingleAction";
import "../global-style.css";
import { goTo } from "../utilities";
import WinnerBanner from "../components/WinnerBanner";

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

function renderGameOverBanner(winnerName, gameOver){
    return gameOver ? (
        <WinnerBanner
            description={"The winner is"}
            descriptionIcon={""}
            playerName={winnerName}
            winnerIconLeft={"🃏"}
            winnerIconRight={"🎉"}
            />
    ) : null;
}


export default function LeaderBoardView(props) {

    // creates an array from the leaderboard object
    const players = Object.keys(props.leaderboard).map((playerID) => ({
        playerID,
        ...props.leaderboard[playerID]
    }));

    const data = {
        sortedPlayers: players.sort((a, b) => a.numberOfCards - b.numberOfCards),
        winnerName: props.winner ? props.leaderboard[props.winner]?.playerName : "Unknown",
        gameOver: props.gameOver,
    }

    function buttonHandlerACB(){
        props.onButtonClick(props.routeDestination)
    }

    return (
        <div class="container">
            <SectionTitle title={"Leaderboard 🃏"} />
            {/*<SessionID sessionID={props.sessionID}/>*/}
            {renderGameOverBanner(data.winnerName, data.gameOver)}
            {/*<SectionSubtitle title={"Leaderboard"}/>*/}
            {renderLeaderboard(data.sortedPlayers)}
            <SingleAction
                title={props.title}
                description={""}
                buttonstate={"/* TODO */"}
                btnLabel={props.btnLabel}
                onCustomClick= {buttonHandlerACB}
            />
            
        </div>
    );
};