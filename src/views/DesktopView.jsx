import DesktopHeader from "../components/DesktopHeader";
import DesktopContent from "../components/DesktopContent";
import DesktopFooter from "../components/DesktopFooter";
import "../global-style.css"
import './DesktopView.css';

export default
function DesktopView(props){
  return (
        <div className="desktop-container">
            <DesktopHeader /> 
            <DesktopContent />
            <DesktopFooter />
        </div>
        );
    };