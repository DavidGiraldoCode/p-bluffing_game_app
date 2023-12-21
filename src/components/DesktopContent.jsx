import "../global-style.css"
import './DesktopContent.css';

import qr_code from "./qr-code-dino.png";
import product_image from "./product-image.png"


export default
function DesktopContent(props){
  return ( 

    <div class="desktop-content-container">

        <div class="desktop-text-qr-container">
          <h3>This is a mobile-first gaming experience</h3>
          <p> If you want to play, open the web or scan this code with your phone.</p>
          <img src={qr_code} className="desktop-qr-image" /> 
        </div>

        <img src={product_image} className="desktop-product-image"/> 

    </div>

  )
}; 

