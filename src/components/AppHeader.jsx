import "../global-style.css";
import { goTo } from "../utilities";
import "./AppHeader.css";
import arrow_left_ternary from "../assets/arrow-left-ternary.png"
import arrow_left_secondary from "../assets/arrow-left-secondary.png"
import arrow_right_primary from "../assets/arrow-right-primary.png"

export default function AppHeader(props) {

  function leftEventHandlerACB(event) {
    console.log("primaryEventHandlerACB in AppHeader");
    props.onLeftClick(event);
  }

  {/* Default Menu, Condition Back or Logout */ }
  let iconSrc = '';
  let iconText = '';

  /*if (props.icon === "Backarrow") {
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
  }*/

  switch (props.icon) {
    case "Backarrow":
      iconSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/2072340872a354b8295983b332147f5945820670f76840260174181d6b8efafe?apiKey=4ff87b3424964660b6678b1b8d802ec6&";
      iconText = 'Back';
      break;
    case "Playerorder":
      iconSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/2072340872a354b8295983b332147f5945820670f76840260174181d6b8efafe?apiKey=4ff87b3424964660b6678b1b8d802ec6&";
      iconText = 'Player order';
      break;
    case "Logout":
      iconSrc = arrow_left_ternary;
      //"https://cdn.builder.io/api/v1/image/assets/TEMP/2072340872a354b8295983b332147f5945820670f76840260174181d6b8efafe?apiKey=4ff87b3424964660b6678b1b8d802ec6&";
      iconText = "Logout";
      break;
    case "Leave":
      iconSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/2072340872a354b8295983b332147f5945820670f76840260174181d6b8efafe?apiKey=4ff87b3424964660b6678b1b8d802ec6&";
      iconText = "Leave the game";
      break;
    default:
      iconSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/9ddcf00475e8ab1411e5cc9fca18fe11293de02a8854f3dfbebb11aaa6750ce4?apiKey=4ff87b3424964660b6678b1b8d802ec6&";
      iconText = 'Menu';
      break;
  }

  return (
    <div class="header-container">

      <button class="ternary header-action" onClick={leftEventHandlerACB/*goTo(props.routeDestination) x => { }*/}>
        <img class="menu-img" loading="lazy" src={iconSrc} alt="Logo" />
        <h4 class="menu-text">{iconText}</h4>
      </button>

      <h3 class="title-container">Bluffer</h3>

      <button style="display: none" class="ternary header-action" onClick={leftEventHandlerACB/*goTo(props.routeDestination) x => { }*/}>
        <img class="menu-img" loading="lazy" src={iconSrc} alt="Logo" />
        <h4 class="menu-text">{iconText}</h4>
      </button>

    </div>
  );
}
/*
 <div class="menu-container" 
 </div>
<div class="solid"></div>*/