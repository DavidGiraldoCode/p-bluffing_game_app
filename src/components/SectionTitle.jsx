import "../global-style.css";
import "./SectionTitle.css";
export default function SectionTitle(props) {
  return (
    <div className='section-title'>
      <h1>{props.title}</h1>
    </div>
  );
}

