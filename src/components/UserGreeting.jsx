import "../global-style.css";
import "./UserGreeting.css";
export default
  function UserGreeting(props) {
  return (
    <div className='user-greeting container m-bottom-m'>
        <img loading="lazy" class="loading-image-class user-image m-bottom-m" src={props.userImage}></img>
        <p>{props.title}</p>
        <h2>{`${props.name}`}</h2>
    </div>
  );
}
