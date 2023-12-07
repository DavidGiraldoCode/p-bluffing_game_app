
import "./AppHeader.css";

export default 
function SelectHeader(props) {
  return (
    <div className="main-container">
      <header className="header">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ddcf00475e8ab1411e5cc9fca18fe11293de02a8854f3dfbebb11aaa6750ce4?apiKey=4ff87b3424964660b6678b1b8d802ec6&"
          className="img"
          alt="Logo"
        />
        <div className="menu-button">Menu</div>
      </header>
      <div className="title">King’s bluffer</div>
      <div className="div-6" />
    </div>
  );
}