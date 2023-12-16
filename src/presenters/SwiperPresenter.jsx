import "../global-style.css";
import "../components/SwiperView.css";
//import { register } from 'swiper/element/bundle';
import SwiperComponent from "../components/SwiperComponent";

//thirparty component

//import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js";
//import Swiper from 'swiper';
//import { Swiper, SwiperSlide } from 'swiper/vue';
//
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
//register();

//import 'swiper/css';
//import 'swiper/css/effect-cards';

export default function SwiperPresenter(props) {

    return <SwiperComponent/>
}


/*


<div class="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">Slide 1!</div>
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
            </div>
        </div>

        <swiper-container>
            <div class="swiper">
                <div class="swiper-wrapper"> Slide A </div>
                <div class="swiper-wrapper"> Slide B </div>
                <div class="swiper-wrapper"> Slide C </div>
                <div class="swiper-wrapper"> Slide D </div>
            </div>
        </swiper-container>˝˝˝f

  function arrayRendering(card) {
        const CARD_SPRITE = `https://deckofcardsapi.com/static/img/${card}.png`;
        return  <swiper-slide class="swiper-slide">
                <img src={CARD_SPRITE} alt={card} onClick={null} id={card} />
                </swiper-slide>;
      }

       <swiper-container >
             {['AC', '5S', 'KS', '2D', 'KH'].map(arrayRendering)}
            </swiper-container>

*/
