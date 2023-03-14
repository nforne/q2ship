import{ React, useState, useEffect} from "react"
import axios from "axios";
// import Pending from "../../../home/pending";

const Ccard_info = (props) => {

  const ccinfo_init = {email: "", password: ""};

  const [ccstate, setCcstate] = useState({
    ccinfo : {...ccinfo_init},
    view: 'shipper'
  })

  const ccinfo_handler = (key, value) => {
    setCcstate(prev => {
      const updating = {...prev};
      updating.ccinfo[key] = value;
      return updating});
  }

  const ccv_handler = (view) => {
    setCcstate(prev => ({...prev, view: view }))
  }

  const ccard_infoFormValidation = (ccinfo) => {
    if (ccinfo.email === '' || ccinfo.email.split('').includes(' ')) return 'Enter your email, without spaces!';
    if (ccinfo.password === '' || ccinfo.password.split('').includes(' ')) return 'Enter a password, without spaces!';
    return 'good!'; //------------------------------------------
  }

  useEffect(() => {
   setCcstate(prev => ({...prev, ccinfo: {...ccinfo_init} }))
  }, []);

  const handleSubmit = (ccinfo, event) => {
    event.preventDefault();
    if (ccard_infoFormValidation(ccinfo) === 'good!') {
      props.v_handler('pending')
      props.info_handler('ccard_info', ccinfo)
      props.v_handler('shipper')
    } else {
      props.errorHandler('Oops! Check your work schedule info and resubmit!🤦‍♂️')
    }
  }

  return(
  <div>
    <div className="userform">
      <h5>[ Enter Payment Card Information ]</h5>
      <hr />
        <form  className="form" onSubmit={(e) => handleSubmit(ccstate.ccinfo, e)}>
          <fieldset >
          
              <p>
                <label className="form-group row" htmlFor="email">Email:</label>
                <input type="email" name='email' id="email"  onChange={(e) => ccinfo_handler('email', e.target.value)} placeholder="test@example.com"/>
              </p>
              
              <p>
                <label className="form-group row" htmlFor="password">Password:</label>
                <input type="password" name='password' id="password"  onChange={(e) => ccinfo_handler('password', e.target.value)} placeholder="x42x58s5d4s898"/>
              </p>

              <p>
                <label className="form-group row" htmlFor="photo">Scan_card:</label>
                <input type="file" name='cc_info' id="cc_info" onClick={(e) => ccv_handler('photo')} placeholder="./photo/diretctory/orURL"/>
              </p>
          
          </fieldset>
            
            <hr />
            
              <div className="signin-btns">
                
                <label className="form-group row" htmlFor="formSubmitButton"></label>
                <input type="submit"  name="formSubmitButton" value="Submit" className="btn btn-secondary btn-lg" onClick={(e) => console.log('ccinfo ...')}/>
              
                
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

export default Ccard_info;