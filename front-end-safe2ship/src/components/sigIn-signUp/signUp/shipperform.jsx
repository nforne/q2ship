import { React, useState, useEffect } from "react";
import Ccard_info from './signUpComponents/ccard_info';
import Company_info from './signUpComponents/company_infomation';
import Driving_record from './signUpComponents/driving_record';
import Work_schedule from "./signUpComponents/work_schedule";
import Confirm from '../../home/confirm'
import Pending from "../../home/pending";
import { ScrollTo } from "react-scroll-to";
import axios from 'axios';

import { objectEquals } from "./signUpComponents/helpers";


export default function Shippersignup(props) {

  const shipperInfo_init = {status:'shipper', number_of_orders:0, 
    number_of_packages: 0, rating_sum:0, 
    total_declined: 0, system_id: "", messages: {},
    name: "", phone: "",  email: "", password: "", 
    photo: "", address: "",
    bio:"", ccard_info: {}, company_information: {}, 
    driving_record: {}, photo_id: "", 
    web_link: "", work_schedule: {}};

  const [sstate, setSstate] = useState({
    shipperInfo : {...shipperInfo_init},
    view: 'shipper'
  })

  const sinfo_handler = (key, value) => {
    setSstate(prev => {
      const updating = {...prev};
      updating.shipperInfo[key] = value;
      return updating});
  }

  const sv_handler = (view) => {
    setSstate(prev => ({...prev, view: view }))
  }

  const sinputFormValidation = (sinfo) => {
    if (sinfo.name === '') return 'Enter your full name!';
    if (sinfo.phone === '' || sinfo.phone.split('').includes(' ')) return 'Enter your phone number, without spaces!';
    if (sinfo.email === '' || sinfo.email.split('').includes(' ')) return 'Enter your email, without spaces!';
    if (sinfo.password === '' || sinfo.password.split('').includes(' ')) return 'Enter a password, without spaces!';
    if (sinfo.address === '' ) return 'Enter your address, without spaces!';
    if (sinfo.bio === '' ) return 'Enter a sentence or more about who you are!';
    return 'good!'; //------------------------------------------
  }

  useEffect(() => {
   setSstate(prev => ({...prev, shipperInfo: {...shipperInfo_init} }))
  }, []);

  const handleSubmit = (shipperInfo, event) => {
    // event.preventDefault();

    if (sinputFormValidation(shipperInfo) === 'good!') {
      // switch to pending...
      props.hv_handler('pending')
      axios.post('/api/users/signup', {...shipperInfo})
        .then(userinfo => {
          console.log(userinfo.data) //-----------------------------
          //switch to user view with userinfo.rows and set it to state
          props.sortUser(userinfo.data);
          // props.setUser(prev => ({...prev,  ...userinfo.data }));

          props.hv_handler('shipperHome');
        })
        .catch((error) => {
          props.hv_handler('signUp')
          props.errorHandler(`Oop! Something went wrong. ${error} Please Consider trying again shortly!`)
        })

    } else {
      props.errorHandler(`Oops! Something is missing or missentered: ${sinputFormValidation(shipperInfo)}. Please verify and make sure of the right information and resubmit. Thank you!`)
    }
  }

//--------------------------------------------------------------------------------------------
  // for confirm

  const confirm = {
    confirmMessage: [<p key={1} >[ By clicking to subscibe, you agree to the terms and conditions in place for the use of this platform! ]</p>],
    confirmHandler: handleSubmit,
    data: sstate.shipperInfo,
    v_handler: sv_handler
  }

//--------------------------------------------------------------------------------------------
  // for subforms

  const subFormsCss = (btnView) => { // to style subForm button when it has been selected for filling and when it has already been filled.
    if (sstate.view === btnView ) return {border: '2px solid #07b2f6' , backgroundColor: '#07b2f6' };
    if (!objectEquals(sstate.shipperInfo[btnView], {})) {
      return {border: '2px solid rgb(169, 253, 2)'  , backgroundColor: 'rgb(169, 253, 2)' };
    }
  }

  const handlers =  { // props for subForms
    info_handler: sinfo_handler,
    v_handler: sv_handler,
    errorHandler: props.errorHandler
  }

  const subForms = (element) => {
    if (element === 'ccard_info') return [<Ccard_info key={1} {...handlers}/>];
    if (element === 'company_information') return [<Company_info key={1} {...handlers}/>];
    if (element === 'driving_record') return [<Driving_record key={1} {...handlers}/>];
    if (element === 'work_schedule') return [<Work_schedule key={1} {...handlers}/>];
    if (element === 'confirm') return [<Confirm key={1} {...confirm}/>];
    if (element === 'pending') return [<Pending key={1}/>];
    return [];
  } 

   return (
      <div className="signUpForms">
        
        <ScrollTo>
        {({ scroll }) => ['confirm', 'ccard_info', 'company_information', 'driving_record', 'work_schedule'].includes(sstate.view) ? scroll({ x: 1, y:10, smooth: true }): '' }
        </ScrollTo>
        
    {sstate.view !== 'confirm' && 
        <div  style={sstate.view === 'confirm' ? {visibility: 'hidden', position: 'relative'} : {}} className="userform view_a">
        <h5>[ Shipper Sign-Up ]</h5>
        <hr />
          <form className="form" onSubmit={event =>  event.preventDefault() /* handleSubmit(sstate.shipperInfo, event) */}>
  
            <fieldset>
        
            <p>
            <label className="form-group row" htmlFor="input">Names:</label>
            <input type="text" name='name' placeholder="Jane Doe" onChange={(e) => sinfo_handler('name', e.target.value)}/>
            </p>
  
            <p>
              <label className="form-group row" htmlFor="phone">Phone:</label>
              <input type="text" name='phone' id="phone" onChange={(e) => sinfo_handler('phone', e.target.value)} placeholder="phone +2374302560"/>
            </p>
            <p>
              <label className="form-group row" htmlFor="email">Email:</label>
              <input type="email" name='email' id="email" onChange={(e) => sinfo_handler('email', e.target.value)} placeholder="test@example.com"/>
            </p>
            
            <p>
              <label className="form-group row" htmlFor="password">Password:</label>
              <input type="password" name='password' id="password" onChange={(e) => sinfo_handler('password', e.target.value)} placeholder="x42x58s5d4s898"/>
            </p>
            
            <p>
              <label className="form-group row"  htmlFor="address">Address:</label>
              <input type="text" name='address' id="input" onChange={(e) => sinfo_handler('address', e.target.value)} placeholder="210 Steeles Av W, Brampton ON, CA"/>
            </p>
            
            <p>
              <label className="form-group row" htmlFor="bio">Bio:</label>
              <input type="text" name='bio'  id="bio" onChange={(e) => sinfo_handler('bio', e.target.value)} placeholder="I am not a conventional person and ..." />
            </p>
  
            <p>
              <label className="form-group row" htmlFor="web_link">Web_link:</label>
              <input type="url" name='web_link' id="web_link" onChange={(e) => sinfo_handler('web_link', e.target.value)} placeholder="www.example.ca"/>
            </p>
   <hr />
            <p>
              <label className="form-group row" htmlFor="photo">Photo:</label>
              <input type="file" name='photo' id="photo" onClick={(e) => sv_handler('photo')} placeholder="./photo/diretctory/orURL"/>
            </p>
  
            <p>
              <label className="form-group row" htmlFor="photo_id">PhotoID:</label>
              <input type="file" name='photo_id' id="photo_id" onClick={(e) => sv_handler('photo_id')} placeholder="uploade one file of both faces. Clear copies!"/>
            </p>
   <hr />
            <p>
              <label className="form-group row" htmlFor="ccard_info">Payment_method:</label>
              <input style={subFormsCss('ccard_info')} type="button" name='ccard_info'   onClick={(e) => sv_handler('ccard_info')} id="ccard_info" />
            </p>
                        
            <p>
              <label className="form-group row" htmlFor="driving_record">Driving_record:</label>
              <input style={subFormsCss('driving_record')} type="button" name='driving_record' onClick={(e) => sv_handler('driving_record')} id="driving_record" />
            </p>       
            
            <p>
              <label className="form-group row" htmlFor="work_schedule">Work_schedule:</label>
               <input style={subFormsCss('work_schedule')} type="button" name='work_schedule' id="work_schedule"  onClick={(e) => sv_handler('work_schedule')} placeholder="click to enter your swork schedule. Optional!"/>
            </p>

            <hr />
            <h6>[ If Apllicable: ]</h6>
            <p>
              <label className="form-group row" htmlFor="company_information">Company_infomation:</label>
              <input style={subFormsCss('company_information')} type="button" name='company_information' onClick={(e) => sv_handler('company_information')} id="company_infomation" />
            </p>
  
          </fieldset>
          <hr />
              <label className="form-group row" htmlFor="formSubmitButton"></label>
              <input type="submit" name="formSubmitButton" value="Submit" className="btn btn-secondary btn-lg" onClick={(e) => sv_handler('confirm')}/>
         </form>
  
          <hr />
        </div>
    }
          <div style={sstate.view === 'shipper' ? {visibility: 'hidden', position: 'relative'} : {}} className="subForms view_b">
            {subForms(sstate.view)}
          </div>
      </div>
   );
 }