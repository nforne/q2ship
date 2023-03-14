import React from "react";
import Scroll from './scroll.png'
import { ScrollTo } from "react-scroll-to";

import './scrollup.css';


export default function Scrollup() {

   return (
    <div className="scrollup">
      <ScrollTo>
        {({ scroll }) => (<img id='scrollup' onClick={() => scroll({ x: 1, y:1, smooth: true })} src={Scroll} alt="scroll" />)}
      </ScrollTo>
    </div>
   );
 }
