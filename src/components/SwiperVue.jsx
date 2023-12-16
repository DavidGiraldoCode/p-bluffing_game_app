import { Swiper, SwiperSlide } from "swiper/vue";
//import { EffectCards, Pagination } from "swiper/modules"
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import "./SwiperVue.css";
import { reactive, onMounted, watch, onUnmounted } from "vue";

const SwiperVue = {
  props: [],
  components: {
    Swiper,
    SwiperSlide
  },
  setup(props) {
    const componentState = reactive({
      cardCodes: ["AC", "5S", "KS", "2D", "KH"]
    });


    function renderACB() {
      //class="swiper mySwiper" effect="cards" grab-cursor={true} loop={true}
      //wrapperTag='div'
      return <Swiper
        class="swiper mySwiper"
        effect={"cards"}
        grab-cursor={true}
        loop={true}
        pagination={true}>
        <SwiperSlide class="swiper-slide"><img src={`https://deckofcardsapi.com/static/img/AC.png`} /></SwiperSlide>
        <SwiperSlide class="swiper-slide"><img src={`https://deckofcardsapi.com/static/img/5S.png`} /></SwiperSlide>
        <SwiperSlide class="swiper-slide"><img src={`https://deckofcardsapi.com/static/img/KS.png`} /></SwiperSlide>
        <SwiperSlide class="swiper-slide"><img src={`https://deckofcardsapi.com/static/img/2D.png`} /></SwiperSlide>
        <SwiperSlide class="swiper-slide"><img src={`https://deckofcardsapi.com/static/img/KH.png`} /></SwiperSlide>
      </Swiper>
    };

    return renderACB;
  },
};
export default SwiperVue;