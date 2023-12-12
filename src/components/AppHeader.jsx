import "../global-style.css";
import "./AppHeader.css";

export default 
function AppHeader(props) {
  return (
    <div className="header-container">
      <div className="header">

        {/*Change div to button TODO*/}
        <div className="menu-container" /*onClick={TODO}*/>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ddcf00475e8ab1411e5cc9fca18fe11293de02a8854f3dfbebb11aaa6750ce4?apiKey=4ff87b3424964660b6678b1b8d802ec6&"
            className="menu-img"
            alt="Logo"
          />
          <h4 className="menu-text">{props.menuText}</h4>
        </div>

        <h4 className="title-container">{props.headTitle}</h4>
        {/*<div className="title-container">King's Bluffer</div>*/}

        <div className="solid"></div>

      </div>
    </div>
  );
}