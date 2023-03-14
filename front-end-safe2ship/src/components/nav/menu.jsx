import React from "react";
import classNames from "classnames";


export default function Menu(props) {

  const vSwitch = (user) => {  //yet to rectify
    user[0].status === 'customer' ? props.hv_handler('customerHome') : props.hv_handler('shipperHome')
  }
  
  //  className="btn disabled"
  // disabled={true}
  // const buttonClass = classNames("dropdown-item", {"disabled": props.confirm,}) 

  const s = props.user[0].status === 'shipper' ? true : false;
  const c = props.user[0].status === 'customer' ? true : false;
  const a = props.user[0].status === 'admin' ? true : false;
  const o = !['shipper', 'customer', 'admin'].includes(props.user[0].status) ? true : false;

  
   return (
    <div className='menu'>
      <div className="dropdown">
      
      <button className="btn btn-secondary dropdown-toggle dropdown-toggle-split btn-lg" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false"> [  🌷__🚚__ |<i className="bi bi-list"></i> ]</button>
      
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
      
        <li><hr className="dropdown-divider"/></li>
        <li><button className={classNames("dropdown-item danger", {"disabled": o, })} type="button" onClick={(e) => props.logoutHandler(props)} > <i className="bi bi-eject"></i> - [🚧Logout🌷]</button></li>
        <li><hr className="dropdown-divider"/></li>
        {(!c && !o) && <li><button className={classNames("dropdown-item", {"disabled": c || o, })} type="button" onClick={(e) => {props.setPkgsview(() => props.ordercart.active); console.log(props.ordercart.active.length); vSwitch(props.user)}}> <i className="bi bi-chevron-left"></i> [ Order Cart ]</button></li>}
        {(!c && !o) && <li><button className={classNames("dropdown-item", {"disabled": c || o })} type="button" onClick={(e) => {props.setPkgsview(() => [...props.ordercart.declined, ...props.ordercart.delivered]); vSwitch(props.user)}}> <i className="bi bi-chevron-left"></i> [ Order History ]</button></li>}
        {!o && <li><button className={classNames("dropdown-item", {"disabled": o, })} type="button" onClick={(e) => {props.setPkgsview(() => props.pkgs.active); vSwitch(props.user)}}> <i className="bi bi-chevron-left"></i>[ Packages ]</button></li>}
        {!o && <li><button className={classNames("dropdown-item", {"disabled": o })} type="button" onClick={(e) => {props.setPkgsview(() => [...props.pkgs.declined, ...props.pkgs.delivered]); vSwitch(props.user)}}> <i className="bi bi-chevron-left"></i> [ Package History ]</button></li>}
        {!o && <li><button className={classNames("dropdown-item", {"disabled": o })} type="button" > <i className="bi bi-chevron-left"></i>[ Messages ]</button></li>}
        {!o && <li><button className={classNames("dropdown-item", {"disabled": o })} type="button" onClick={(e) => props.hv_handler('profile')} > <i className="bi bi-chevron-left"></i> [ Profile ] </button></li>}
        {!o && <li><button className={classNames("dropdown-item", {"disabled": o })} type="button" > <i className="bi bi-chevron-left"></i> [ Help? ]</button></li>}
        {!o && <li><button className={classNames("dropdown-item", {"disabled": o })} type="button" > <i className="bi bi-chevron-left"></i> [ safe2ship? ]</button></li>}
        {!o && <li><button className={classNames("dropdown-item", {"disabled": o })} type="button" > <i className="bi bi-chevron-left"></i> [ Settings ]</button></li>}
        <li><hr className="dropdown-divider"/></li>
        {!o && a && <li><button className={classNames("dropdown-item", {"disabled": c || s || o,})} type="button" > <i className="bi bi-chevron-left"></i> [ Admin ]</button></li>}
      </ul>
   
      </div>  
    </div>
   );
 }



