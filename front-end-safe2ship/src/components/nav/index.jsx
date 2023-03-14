import React, {useEffect} from "react";
import axios from "axios";

import Logo from "./logo";
import Menu from "./menu";

import './nav.css';

export default function Nav(props) {

  const logoutHandler = (input) => {
    axios.post('/api/users/logout', {system_id: ""})
      .then(e => {
        console.log(props.user[0].email) //-------------------------------
        props.setUser(prev => ({...prev, ...props.user_init}))
        input.hv_handler('home');
        console.log(e.data); //----------------------------------
    });
  }
    
   return (
    <div >
     <nav className="nav">
      <Logo hv_handler={props.hv_handler} logoutHandler={logoutHandler} {...props}/>
      <div className="menu">
        <div>

          {props.user[0].email && 
          <button id='id' type="button" className="btn btn-outline-success btn-lg"><i className="bi bi-unlock-fill"></i>: {props.user[0].name}</button>
          }

        </div>
        <i id='diffsquare' className="bi bi-square"></i>
        <div>
          <Menu {...props} logoutHandler={logoutHandler}/>
        </div>
     </div>
     
     </nav>
     <div>
      <br className='H-line'/>
     </div>
    </div>
     
   );
 }
