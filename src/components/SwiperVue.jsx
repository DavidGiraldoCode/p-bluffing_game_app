import { Swiper, SwiperSlide } from "swiper/vue";
//import { EffectCards, Pagination } from "swiper/modules"
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import "./SwiperVue.css";
import { reactive, onMounted, watch, onUnmounted } from "vue";

const SwiperVue = {
  props: ["cardCodes", "onSelectCard"],
  components: {
    Swiper,
    SwiperSlide
  },
  setup(props) {
    const componentState = reactive({
      //cardCodes: ["AC", "5S", "KS", "2D", "KH"]
      cardCodes: props.cardCodes || ["AC", "KH", "KS"],
      selectedCard: ""
    });


    function renderACB() {
      //class="swiper mySwiper" effect="cards" grab-cursor={true} loop={true}
      //wrapperTag='div'

      function selectCardHandlerACB(event) {
        //console.log("Selected: ", event.target.dataset.card);
        componentState.selectedCard = event.target.dataset.card;
        props.onSelectCard(event.target.dataset.card);
      }

      function renderCardsArrayC(cardCode) {
        //console.log("cardCode: ", cardCode);
        const htmlClass = `swiper-slide ${cardCode === componentState.selectedCard ? "selected" : ""}`
        //console.log(htmlClass);
        return <SwiperSlide class={htmlClass}>
          <img  onClick={selectCardHandlerACB} data-card={cardCode} src={`https://deckofcardsapi.com/static/img/${cardCode}.svg`} />
        </SwiperSlide>
      }

      function defaultDeck() {
        return <div><SwiperSlide class="swiper-slide"><img value={card} src={`https://deckofcardsapi.com/static/img/AC.svg`} /></SwiperSlide>
          <SwiperSlide class="swiper-slide"><img src={`https://deckofcardsapi.com/static/img/KS.svg`} /></SwiperSlide>
          <SwiperSlide class="swiper-slide"><img src={`https://deckofcardsapi.com/static/img/X1.svg`} /></SwiperSlide>
          <SwiperSlide class="swiper-slide"><img src={`https://deckofcardsapi.com/static/img/KH.svg`} /></SwiperSlide></div>
      }
      //console.log("componentState.cardCodes", componentState.cardCodes[0]);
      return <Swiper
        class="swiper mySwiper"
        effect={"cards"}
        grab-cursor={true}
        loop={true}
        pagination={true}>
        {componentState.cardCodes.map(renderCardsArrayC)}
      </Swiper>
    };

    //watch(checkOnACB, effectACB);
    function checkOnACB() {
      return [componentState.selectedCard]
    }

    function effectACB() {
      //console.log("componentState.selectedCard: ", componentState.selectedCard)
    }

    onMounted(bornACB);
    function bornACB() {
      componentState.selectedCard = "";
    }

    return renderACB;
  },
};
export default SwiperVue;

/*
<SwiperSlide class="swiper-slide"><img value={card} src={`https://deckofcardsapi.com/static/img/AC.png`} /></SwiperSlide>
        <SwiperSlide class="swiper-slide"><img src={`https://deckofcardsapi.com/static/img/5S.png`} /></SwiperSlide>
        <SwiperSlide class="swiper-slide"><img src={`https://deckofcardsapi.com/static/img/KS.png`} /></SwiperSlide>
        <SwiperSlide class="swiper-slide"><img src={`https://deckofcardsapi.com/static/img/2D.png`} /></SwiperSlide>
        <SwiperSlide class="swiper-slide"><img src={`https://deckofcardsapi.com/static/img/KH.png`} /></SwiperSlide>
*/