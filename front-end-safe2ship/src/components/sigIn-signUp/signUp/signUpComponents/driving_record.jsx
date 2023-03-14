import{ React, useState, useEffect} from "react"
import axios from "axios";
// import Pending from "../../../home/pending";

const Driving_record = (props) => {

  const drinfo_init = {email: "", password: ""};

  const [drstate, setDrstate] = useState({
    drinfo : {...drinfo_init},
    view: 'shipper'
  })

  const drinfo_handler = (key, value) => {
    setDrstate(prev => {
      const updating = {...prev};
      updating.drinfo[key] = value;
      return updating});
  }

  const drv_handler = (view) => {
    setDrstate(prev => ({...prev, view: view }))
  }

  const driving_recordFormValidation = (drinfo) => {
    if (drinfo.email === '' || drinfo.email.split('').includes(' ')) return 'Enter your email, without spaces!';
    if (drinfo.password === '' || drinfo.password.split('').includes(' ')) return 'Enter a password, without spaces!';
    return 'good!'; //------------------------------------------
  }

  useEffect(() => {
   setDrstate(prev => ({...prev, drinfo: {...drinfo_init} }))
  }, []);

  const handleSubmit = (drinfo, event) => {
    event.preventDefault();
    if (driving_recordFormValidation(drinfo) === 'good!') {
      props.v_handler('pending')
      props.info_handler('driving_record', drinfo)
      props.v_handler('shipper')
    } else {
      props.errorHandler('Oops! Check your work schedule info and resubmit!🤦‍♂️')
    }
  }

  return(
  <div>
    <div className="userform">
      <h5>[ Enter &/ Upload Driving_record ]</h5>
      <hr />
        <form  className="form" onSubmit={(e) => handleSubmit(drstate.drinfo, e)}>
          <fieldset >
          
              <p>
                <label className="form-group row" htmlFor="email">Email:</label>
                <input type="email" name='email' id="email"  onChange={(e) => drinfo_handler('email', e.target.value)} placeholder="test@example.com"/>
              </p>
              
              <p>
                <label className="form-group row" htmlFor="password">Password:</label>
                <input type="password" name='password' id="password"  onChange={(e) => drinfo_handler('password', e.target.value)} placeholder="x42x58s5d4s898"/>
              </p>

              <p>
                <label className="form-group row" htmlFor="photo">Driving_extract:</label>
                <input type="file" name='dr_record' id="dr_record" onClick={(e) => drv_handler('photo')} placeholder="./photo/diretctory/orURL"/>
              </p>
          
          </fieldset>
            
            <hr />
            
              <div className="signin-btns">
                
                <label className="form-group row" htmlFor="formSubmitButton"></label>
                <input type="submit"  name="formSubmitButton" value="Submit" className="btn btn-secondary btn-lg" onClick={(e) => console.log('drinfo ...')}/>
              
                
                <div style={{display: 'flex', flexDirection: 'row'}}><div style={{visibility: 'hidden'}}>--</div><h1>|</h1><div style={{visibility: 'hidden'}}>--</div></div>

                <div style={{marginRight: '10%', zIndex:'1000'}}>
                  <div style={{color:'#47B5FF'}}>______</div>
                  <button onClick={() => props.v_handler("shipper")} type="button" className="btn btn-secondary btn-lg back-button"><i className="bi bi-reply-all"></i></button>
                </div>

              </div>      
        </form>
      </div>
    
     <hr />
  </div>
  );
}

export default Driving_record;