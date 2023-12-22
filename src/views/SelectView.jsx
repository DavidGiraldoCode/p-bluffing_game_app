

import AppHeader from "../components/AppHeader.jsx";
import SessionID from "../components/SessionID.jsx";
import LBitem from "../components/LBitem.jsx";
import SelectContent from "../components/SelectContent.jsx";


export default function SelectView(props){

    return(
        <div>
            <AppHeader />
            <SessionID />
            <LBitem />
            <SelectContent />
        </div>
    );
};