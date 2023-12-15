import "../global-style.css";
import "./SectionTitle.css";
export default
  function UserImage(props) {
  return (
    <div className='user-image'>
        <img loading="lazy" class="loading-image-class" src={props.userImage}></img>
    </div>
  );
}
