import "../global-style.css";
import "./UserGreeting.css";
export default
  function UserGreeting(props) {
  return (
    <div className='user-greeting'>
        <img loading="lazy" class="loading-image-class" src={props.userImage}></img>
        <h1>{props.title}</h1>
        <h3>{props.name}</h3>
    </div>
  );
}
