import React from "react";
import logo1 from "./logo.svg";
// import logo1 from "./logo_2.svg";


export default function Logo(props) {
   return (
    <div className="logotag rounded-pill">
      <div className="logo">
          <button type="button" id="logobtn" onClick={(e) => props.hv_handler('home')} className="btn btn-secondary rounded-pill"><h1>safe2ship</h1></button>
      </div>
      <i id='diffsquare' className="bi bi-square"></i> 
      <div className="circle">
          <img src={logo1} id="logoimg" onClick={(e) => props.logoutHandler(props)} className="rounded rounded-pill" alt={"logo"}/>
      </div>
    </div>
   );
 }