import "../global-style.css";
import { goTo } from "../utilities";
import "./AppHeader.css";

export default function AppHeader(props) {

  function primaryEventHandlerACB(event) {
    console.log("primaryEventHandlerACB in AppHeader");
    props.primaryOnClick(event);
  }

  

  {/* Default Menu, Condition Back or Logout */}
  let iconSrc = '';
  let iconText = '';

  if (props.icon === "Backarrow") {
    iconSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/2072340872a354b8295983b332147f5945820670f76840260174181d6b8efafe?apiKey=4ff87b3424964660b6678b1b8d802ec6&";
    iconText = 'Back';
  } else if (props.icon === "Logout") {
    // Set icon source for logout if needed
    iconSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/2072340872a354b8295983b332147f5945820670f76840260174181d6b8efafe?apiKey=4ff87b3424964660b6678b1b8d802ec6&";
    iconText = 'Logout';
  } else {
    // Default icon and text for Menu
    iconSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/9ddcf00475e8ab1411e5cc9fca18fe11293de02a8854f3dfbebb11aaa6750ce4?apiKey=4ff87b3424964660b6678b1b8d802ec6&";
    iconText = 'Menu';
  }



  return (
    <div className="header-container">
        <div className="menu-container" /*onClick={TODO}*/>
          <button class="secondary-no-border" onClick={/*primaryEventHandlerACB*/ x => { goTo(props.routeDestination) }}> 
          <img
            loading="lazy"
            src={iconSrc}
            className="menu-img"
            alt="Logo"
          /></button>

          <h4 className="menu-text">{iconText}</h4>
        </div>

        <h4 className="title-container">King's Bluffer</h4>
        {/*<div className="title-container">King's Bluffer</div>*/}
        <div className="solid"></div>
    </div>
  );
}