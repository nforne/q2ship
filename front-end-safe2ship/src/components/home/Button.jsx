import React from "react";

export default function Button(props) {
   
 
   return (
    <div className="homebtns">
        <div>
          <hr />
          <button type="button" onClick={() => props.hv_handler("signIn")} className="btn btn-secondary btn-lg"><h2>[  Sign-In   |  <i className="bi bi-unlock-fill"></i> *]</h2></button>
          <hr />
          
          <button type="button" onClick={() => props.hv_handler("signUp")} className="btn btn-secondary btn-lg"><h2>[ Sign-Up |  <i className="bi bi-pencil-square"></i> ]</h2></button>
   
          <hr />
        </div>
    </div>
   );
 }
