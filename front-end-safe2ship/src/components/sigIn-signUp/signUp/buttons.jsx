import { React, useState } from "react";

export default function Signupbuttons(props) {
 
 
   return (
    <div className="signupbtns">
      <div>
      <button style={props.view === 'shipper' ? {boxShadow:'20px 20px 50px 15px aqua'} : {}} onClick={() => props.suhandler('shipper')} type="button" className="btn btn-secondary btn-lg">[Shipper] </button>
      <i id='diffsquare' className="bi bi-square"></i>  
      <button style={props.view === 'customer' ? {boxShadow:'20px 20px 50px 15px aqua'} : {}} onClick={() => props.suhandler('customer')} type="button" className="btn btn-secondary btn-lg">[Customer]</button>
      <i id='diffsquare' className="bi bi-square"></i>  
      <button onClick={() => props.hv_handler('home')} type="button" className="btn btn-secondary btn-lg"><i className="bi bi-reply-all"></i></button>
      </div>
    </div>
   );
 }