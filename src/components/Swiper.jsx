import SwiperView from './SwiperView.jsx';

export default function Swiper(props) {
    function evenHandlerACB(value) {
        //console.log('Card', value.target.id);
        props.onSelectCardSprite(value);
    }
    //cardCodes={['AC', '5S', 'KS', '2D', 'KH']}
    console.log('props.pileOfCards: ',props.pileOfCards);
    return (
        <div>
            <SwiperView
                onSelected={evenHandlerACB}
                cardCodes={props.pileOfCards}
            />
        </div>
    );
}