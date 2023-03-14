import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

import Scrollup from "../../scrollup";
import Logo1 from "../../nav/logo.jpg";
import './signIn.css'
import '../signUp/signUp.css'

export default function SignIn(props) {

  const info_init = {email:'', password:''}; 
  
  const [sistate, setSistate] = useState({
    info:{...info_init}, 
    view: 'signIn'
  })

  const signfo_handler = (key, value) => {
    setSistate(prev => {
      const updating = {...prev};
      updating.info[key] = value;
      return updating});
  }

  const signv_handler = (view) => {
    setSistate(prev => ({...prev, view: view }))
  }

  const signputFormValidation = (signfo) => {
    if (signfo.email === '' || signfo.email.split('').includes(' ')) return 'Enter your email, without spaces!';
    if (signfo.password === '' || signfo.password.split('').includes(' ')) return 'Enter a password, without spaces!';
    return 'good!';
  }

  useEffect(() => {
    setSistate(prev => ({...prev, info: {...info_init} })); 
  }, []);

  const handleSubmit = (info, event) => {
    event.preventDefault();
    
    if (signputFormValidation(info) === 'good!') {
      props.hv_handler('pending')
      axios.post('/api/users/signin', {...info})
        .then(user => {          
          props.sortUser(user.data);

          // switch to user view with userinfo.rows and set it to state // or pks queue view
          user.data.user[0].status === 'customer' ? props.hv_handler('customerHome') : props.hv_handler('shipperHome');      
        })
        .catch((error) => {
          props.hv_handler('signIn')
          props.errorHandler(`Oop! Something went wrong. ${error} Please Consider trying again shortly!`);
        })

    } else {
      props.errorHandler(`Oops! Something is missing or missentered: ${signputFormValidation(info)}. Please verify to make sure of the right information and resubmit. Thank you!`)
    }

  }

   return (
    <div className="signinform">
      
        <div>
        <img src={Logo1} className="rounded rounded-pill img-fluid homelogoimg" alt={"logo"}/>
        </div>
        <h1 > 🌷| __🚚__🚚__ |🌼 </h1>
        <br />
        <div className="signin">
        
          <div className="userform">
          <h5>[ Sign-In ]</h5>
          <hr />
            <div>
              <form  className="form" onSubmit={(e) => handleSubmit(sistate.info, e)}>
                <fieldset >
                
                    <p>
                      <label className="form-group row" htmlFor="email">Email:</label>
                      <input type="email" name='email' id="email" onChange={(e) => signfo_handler('email', e.target.value)} placeholder="test@example.com"/>
                    </p>
                    
                    <p>
                      <label className="form-group row" htmlFor="password">Password:</label>
                      <input type="password" name='password' id="password" onChange={(e) => signfo_handler('password', e.target.value)} placeholder="x42x58s5d4s898"/>
                    </p>
                
                </fieldset>
                  
                  <hr />
                  
                    <div className="signin-btns">
                      
                      <label className="form-group row" htmlFor="formSubmitButton"></label>
                      <input style={{zIndex:'1000'}} type="submit"  name="formSubmitButton" value="Submit" className="btn btn-secondary btn-lg" onClick={(e) => console.log('sign-in ...')}/>
                    
                      
                      <div style={{display: 'flex', flexDirection: 'row'}}><div style={{visibility: 'hidden'}}>--</div><h1>|</h1><div style={{visibility: 'hidden'}}>--</div></div>

                      <div style={{marginRight: '10%', zIndex:'1000'}}>
                        <div style={{color:'#47B5FF'}}>______</div>
                        <button onClick={() => props.hv_handler("home")} type="button" className="btn btn-secondary btn-lg back-button"><i className="bi bi-reply-all"></i></button>
                      </div>

                    </div>      
              </form>
            </div>
          </div>
     <hr />
     </div>
    </div>

  );

 }