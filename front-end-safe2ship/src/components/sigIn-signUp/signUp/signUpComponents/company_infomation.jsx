import{ React, useState, useEffect} from "react"
import axios from "axios";
// import Pending from "../../../home/pending";

const Company_info = (props) => {

  const coinfo_init = {email: "", password: ""};

  const [costate, setCostate] = useState({
    coinfo : {...coinfo_init},
    view: 'shipper'
  })

  const coinfo_handler = (key, value) => {
    setCostate(prev => {
      const updating = {...prev};
      updating.coinfo[key] = value;
      return updating});
  }

  const cov_handler = (view) => {
    setCostate(prev => ({...prev, view: view }))
  }

  const company_infoFormValidation = (coinfo) => {
    if (coinfo.email === '' || coinfo.email.split('').includes(' ')) return 'Enter your email, without spaces!';
    if (coinfo.password === '' || coinfo.password.split('').includes(' ')) return 'Enter a password, without spaces!';
    return 'good!'; //------------------------------------------
  }

  useEffect(() => {
   setCostate(prev => ({...prev, coinfo: {...coinfo_init} }))
  }, []);

  const handleSubmit = (coinfo, event) => {
    event.preventDefault();
    if (company_infoFormValidation(coinfo) === 'good!') {
      props.v_handler('pending')
      props.info_handler('company_information', coinfo)
      props.v_handler('shipper')
    } else {
      props.errorHandler('Oops! Check your work schedule info and resubmit!🤦‍♂️')
    }
  }

  return(
  <div>
    <div className="userform">
      <h5>[ Enter Contracting Company Information ]</h5>
      <hr />
        <form  className="form" onSubmit={(e) => handleSubmit(costate.coinfo, e)}>
          <fieldset >
          
              <p>
                <label className="form-group row" htmlFor="email">Email:</label>
                <input type="email" name='email' id="email"  onChange={(e) => coinfo_handler('email', e.target.value)} placeholder="test@example.com"/>
              </p>
              
              <p>
                <label className="form-group row" htmlFor="password">Password:</label>
                <input type="password" name='password' id="password"  onChange={(e) => coinfo_handler('password', e.target.value)} placeholder="x42x58s5d4s898"/>
              </p>

              <p>
                <label className="form-group row" htmlFor="photo">Supporting_documents:*</label>
                <input type="file" name='co_info' id="co_info" onClick={(e) => cov_handler('photo')} placeholder="./photo/diretctory/orURL"/>
              </p>
          
          </fieldset>
            
            <hr />
            
              <div className="signin-btns">
                
                <label className="form-group row" htmlFor="formSubmitButton"></label>
                <input type="submit"  name="formSubmitButton" value="Submit" className="btn btn-secondary btn-lg" onClick={(e) => console.log('coinfo ...')}/>
              
                
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

export default Company_info;