import {React, useContext } from "react";
import logo1 from "./logo.svg";

import { AppContext } from "../../App";

export default function Logo(props) {
  const { hv_handler } = useContext(AppContext);
   return (
    <div className="logotag ">
      
      <h1 id="logobtn" onClick={(e) => hv_handler('home')}>safe2ship</h1>
      
      <div className="circle">
          <img src={logo1} id="logoimg" onClick={(e) => {hv_handler('home'); props.logoutHandler(props);}} className="rounded rounded-pill" alt={"logo"}/>
      </div>
    </div>
   );
 }