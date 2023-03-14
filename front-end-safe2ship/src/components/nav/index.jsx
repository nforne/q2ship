import {React, useEffect, useContext, createContext} from "react";
import axios from "axios";

import Logo from "./logo";
import Menu from "./menu";

import './nav.css';

import { AppContext } from "../../App";

export const MenuContext = createContext();

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

  const navProps = useContext(AppContext);
  navProps['logoutHandler'] = logoutHandler;
    
   return (
    <div >
      <MenuContext.Provider value={navProps}>
        <nav className="nav">
          <Logo logoutHandler={logoutHandler} />
          <div className="menu">
            <div>

              {navProps.user[0].email && 
              <button id='id' type="button" className="btn btn-outline-success btn-lg"><i className="bi bi-unlock-fill"></i>: {navProps.user[0].name}</button>
              }

            </div>
            <i id='diffsquare' className="bi bi-square"></i>
            <div>
              <Menu logoutHandler={logoutHandler} {...navProps}/>
            </div>
        </div>
        
        </nav>
        <div>
          <br className='H-line'/>
        </div>
     </MenuContext.Provider>
    </div>
     
   );
 }
