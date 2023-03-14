import React from "react";


const Confirm = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return( 
      <center>
    <div className="userform">
      <h5>[ Confirm Your Intentions! ]</h5>
      <hr />
        <form  className="form" onSubmit={(e) => handleSubmit(e)}>
          <fieldset style={{color:'yellow'}}>
          
                {props.confirmMessage}
              
          </fieldset>
            
            <hr />
            
              <div className="signin-btns">
                
                <label className="form-group row" htmlFor="formSubmitButton"></label>
                <input type="submit"  name="formSubmitButton" value='Submit' className="btn btn-secondary btn-lg" onClick={(e) => props.confirmHandler(props.data)}/>
              
                
                <div style={{display: 'flex', flexDirection: 'row'}}><div style={{visibility: 'hidden'}}>--</div><h1>|</h1><div style={{visibility: 'hidden'}}>--</div></div>

                <div style={{marginRight: '10%', zIndex:'1000'}}>
                  <div style={{color:'#47B5FF'}}>______</div>
                  <button onClick={() => props.v_handler("shipper")} type="button" className="btn btn-secondary btn-lg back-button"><i className="bi bi-reply-all"></i></button>
                </div>

              </div>      
        </form>
      </div>
    </center>
  )
}

export default Confirm;