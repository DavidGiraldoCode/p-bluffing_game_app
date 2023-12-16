import "../global-style.css";
import "./UserGreeting.css";
export default
  function UserGreeting(props) {
  return (
    <div className='user-greeting container m-bottom-m'>
        <img loading="lazy" class="loading-image-class" src={props.userImage}></img>
        <h2>{props.title}</h2>
        <h3>{`${props.name}`}</h3>
    </div>
  );
}
