
import "./AppHeader.css";

export default 
function AppHeader(props) {
  return (
    <div className="main-container">
        <div className="menu-container">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f0583266f0571ec3117815906db333166f8cfc277ce42cc3e29ca6384e9fbff?apiKey=4ff87b3424964660b6678b1b8d802ec6&"
            className="img"
            alt="Logo"
          />
    
          <div className="menu-button">Menu</div>
          <h4> King’s bluffer </h4>
        </div>


      <div className="description" />

    </div>

  );
}