import { register } from 'swiper/element/bundle';

register(); //thirparty component

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import './SwiperView.css';

export default function SwiperView(props) {
  function arrayRendering(card) {
    const CARD_SPRITE = `https://deckofcardsapi.com/static/img/${card}.png`;
    return (
      <swiper-slide class="swiper-slide" >
        <img src={CARD_SPRITE} alt={card} onClick={eventHandlerACB} id={card}/>
      </swiper-slide>
    );
  }
  function eventHandlerACB(e) {
    props.onSelected(e.target.id);
  }
  return (
    <swiper-container class="swiper" effect="cards" grab-cursor="true">
      {props.cardCodes.map(arrayRendering)}
    </swiper-container>
  );
}