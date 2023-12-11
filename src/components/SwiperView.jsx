// Import Swiper styles
//import Swiper from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './SwiperView.css';
import { reactive, onMounted, watch, onUnmounted } from 'vue';

const SwiperView = {
  props: ["cardCodes", "reactiveModeValue", "text"],
  components: {
    Swiper,
    SwiperSlide
  },
  setup(props) {
    //component state, reactive POJO
    const componentState = reactive({
      cardCodes: props.cardCodes,
      appStateObj: props.reactiveModeValue,
      text: props.text
    });

    function renderACB() {

      function arrayRendering(card) {
        const CARD_SPRITE = `https://deckofcardsapi.com/static/img/${card}.png`;
        return <swiper-slide class="swiper-slide">
          <img src={CARD_SPRITE} alt={card} onClick={null} id={card} />
        </swiper-slide>
          ;
      }

      function setEvent(n) {
        componentState.text = n
      }

      return <swiper class="swiper mySwiper" effect="cards" grab-cursor="true" loop="true">
        {componentState.cardCodes.map(arrayRendering)}
      </swiper>

    };



    function checkACB() {
      return [componentState.text, componentState.stateCards];
    }

    function effectACB() {
      console.log("do something about: ", componentState.text, componentState.stateCards);
    }

    function bornACB() {
      const swiper = new Swiper('.mySwiper', {
        effect: "cards",
        grabCursor: true,
        loop: true
      });
      console.log("🃏 SwiperView Alive!");
    }

    function dieACB() {
      console.log("🃏 SwiperView Die!");
    }

    //component lifecycle
    onMounted(bornACB);
    onUnmounted(dieACB);
    //side effect in compoent state
    watch(checkACB, effectACB);

    return renderACB;
  },
}
export default SwiperView;
/*
  console.log('props.cardCodes.length: ', props.cardCodes.length);

  //3rd party initiallization
  const swiper = new Swiper('.mySwiper', {
    effect: "cards",
    grabCursor: true,
    loop: true
  });



  function arrayRendering(card) {
    //console.log('arrayRendering: ', props.cardCodes);
    const CARD_SPRITE = `https://deckofcardsapi.com/static/img/${card}.png`;
    return (
      <div class="swiper-slide" >
        <img src={CARD_SPRITE} alt={card} onClick={eventHandlerACB} id={card} />
      </div>
    );
  }
  function eventHandlerACB(e) {
    props.onSelected(e.target.id);
  }
  return (
    <swiper-container>
      <div class="swiper mySwiper" >
        <div class="swiper-wrapper" >
          <slot />
          {props.cardCodes.map(arrayRendering)}
        </div>
      </div>
    </swiper-container>
  );
}
*/
/*
<swiper-container class="swiper" effect="cards" grab-cursor="true" loop="true">
      {props.cardCodes.map(arrayRendering)}
    </swiper-container>

     <swiper-slide class="swiper-slide" >
        <img src={CARD_SPRITE} alt={card} onClick={eventHandlerACB} id={card} />
      </swiper-slide>
*/