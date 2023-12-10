import "../global-style.css";
import "./SectionSubtitle.css";
export default
  function SectionSubtitle(props) {
  return (
    <div className='section-subtitle'>
      <h2>{props.title}</h2>
    </div>
  );
}


/*
      <div className="main-header">
      <header className="header">King's Bluffer</header>
      
    </div>
*/

