import{ React, useState, useEffect} from "react"
import axios from "axios";
// import Pending from "../../../home/pending";

const Work_schedule = (props) => {

  const winfo_init = {email: "", password: ""};

  const [wstate, setWstate] = useState({
    winfo : {...winfo_init},
    view: 'shipper'
  })

  const winfo_handler = (key, value) => {
    setWstate(prev => {
      const updating = {...prev};
      updating.winfo[key] = value;
      return updating});
  }

  const wv_handler = (view) => {
    setWstate(prev => ({...prev, view: view }))
  }

  const work_scheduleFormValidation = (winfo) => {
    if (winfo.email === '' || winfo.email.split('').includes(' ')) return 'Enter your email, without spaces!';
    if (winfo.password === '' || winfo.password.split('').includes(' ')) return 'Enter a password, without spaces!';
    return 'good!'; //------------------------------------------
  }

  useEffect(() => {
   setWstate(prev => ({...prev, winfo: {...winfo_init} }))
  }, []);

  const handleSubmit = (winfo, event) => {
    event.preventDefault();
    if (work_scheduleFormValidation(winfo) === 'good!') {
      props.v_handler('pending')
      props.info_handler('work_schedule', winfo)
      props.v_handler('shipper')
    } else {
      props.errorHandler('Oops! Check your work schedule info and resubmit!🤦‍♂️')
    }
  }

  return(
  <div>
    <div className="userform">
      <h5>[ Create Work_Schedule ]</h5>
      <hr />
        <form  className="form" onSubmit={(e) => handleSubmit(wstate.winfo, e)}>
          <fieldset >
          
              <p>
                <label className="form-group row" htmlFor="email">Email:</label>
                <input type="email" name='email' id="email" onChange={(e) => winfo_handler('email', e.target.value)} placeholder="test@example.com"/>
              </p>
              
              <p>
                <label className="form-group row" htmlFor="password">Password:</label>
                <input type="password" name='password' id="password"  onChange={(e) => winfo_handler('password', e.target.value)} placeholder="x42x58s5d4s898"/>
              </p>
          
          </fieldset>
            
            <hr />
            
              <div className="signin-btns">
                
                <label className="form-group row" htmlFor="formSubmitButton"></label>
                <input type="submit"  name="formSubmitButton" value="Submit" className="btn btn-secondary btn-lg" onClick={(e) => console.log('winfo ...')}/>
              
                
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

export default Work_schedule;