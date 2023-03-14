import React, {useState} from "react";
import Profile from "./Profile";
import axios from "axios";
import "./package.css";
import Pkgmessage from "./pkgmessage";



export default function Package(props) {
 
  const [view, setView] = useState({v: 'pkg', profile:{}, vtracker:[]})
  

  const [msgview, setMsgview] = useState({v: 'off', msgs: []})

  const msgsClickHandler = () => {
    if (msgview.v === 'off') setMsgview(prev => ({...prev, v:'on'}));
    if (msgview.v === 'on') setMsgview(prev => ({...prev, v:'off'}));
  }

  const vSwitch = (view) => {
    setView(prev => ({...prev, v: view }))
  }

  const profileviewHandler = (input) => {
    axios.post('/api/users/other', {id: input})
          .then((userInfo) => { 
            console.log(userInfo.data) //--------------------------------------
            setView(prev => ({...prev, profile: userInfo.data}))
            vSwitch('profile')
          })
          .catch(err => console.log(err)) //-------------------------------
  } 

  const packagesInOrdreCart = [];
  const replyCheck = {}; // for use to check for updates in the replies

  const pollQueue = (list, polltimer = polltimer) => {
    axios.post('/api/pkgs/poll', {list: packagesInOrdreCart })
         .the(res => {   // res.data === {id:** , messages:[{}]}
     
            if (props.listpkg.messages.length < res.data.messages.length) {
              let targetPkg = {...props.listpkg};
              targetPkg['messages'] = res.data.messages;
              props.updatePkgAndOders(props.setOrdercart, targetPkg, 'active');  // update array actually
              props.updatePkgAndOders(props.setPkgs, targetPkg, 'active');
              clearInterval(polltimer);  
            }

         })
  }

  
  const addToOrderCartHandler = (props) => {  // send msg to pkg owner
    // console.log(props.ordercart.active) //------------------------------------------

    axios.post('/api/pkgs/message', {
      pkgId:props.listpkg.id, 
      customer_id: props.listpkg.customer_id, 
      shipper_id:props.user[0].id, 
      message: `Hello!, Please, I would like to move your package... #${props.listpkg.id}`})
          .then(message => {
            console.log(message.data) // ------------------------
            packagesInOrdreCart.push(props.listpkg.id);
            if (packagesInOrdreCart.length !== 0) {

              const polltimer  = setInterval(() => {
                pollQueue(packagesInOrdreCart);
              } ,2000);

            } 
          })
    for (let pkg of props.ordercart.active) {
      if (pkg.id === props.listpkg.id) return;
    }
    props.updatePkgAndOders(props.setOrdercart, props.listpkg, 'active')
    
    console.log('this pkg ===>', props.listpkg) //------------------------------------------
    // console.log(props.ordercart.active.length) //------------------------------------------
    // console.log(props.ordercart.active) //------------------------------------------
  }
  
  console.log('these pops ===>', JSON.stringify(props)) //------------------------------------------
  
  const inOrdercartCheck = () => {
    for (let pkg of props.ordercart.active) {
      if (pkg.id === props.listpkg.id) {
        return true
      } else {
        return false
      };
    }
  }
//-----------------pkg msgs------------------------------------------------
console.log("these listpkg ===>", props.messages) //----------------------------------------------------------
const messages = []
// const msgsInput = props.listpkg.messages ? [...props.listpkg.messages] : [];
let key = props.id
if (Array.isArray(props.messages)) {
  props.messages.forEach(msg => {
      key += 1;
      console.log('this json message ===> ', msg) // -------------------------------------------------
      const djsMsg = JSON.parse(msg);
      if (djsMsg.shipper_id === props.user[0].id) messages.push( <Pkgmessage key={key} message={msg}/>);
  })

}

  return (
    <div className="card">
    {view.v === "profile" &&<Profile  {...view.profile} vSwitch={vSwitch} />}
      {view.v === "pkg" && 
      <div>
      <div className="card-header d-flex justify-content-between">
        <div>Package #: {props.id}</div>
        <div>Current Status:&nbsp;&nbsp;<span className="badge bg-success">{props.status}</span></div>
      </div>
      <div className="card-body">
        <div className="row justify-content-between align-items-center">
          <div className="col">
            <div className="text-center">
              <p>
                <i className="bi bi-box box-size-small"></i>
                <br></br>
                <strong>{props.size}</strong>
              </p>
              <hr></hr>
              <p className="price">${props.price/100}</p>
            </div>
          </div>
          <div className="col-md-6">
            <p><strong>Source:</strong>&nbsp;&nbsp;{props.source}</p>
            <p><strong>Destination:</strong>&nbsp;&nbsp;{props.destination}</p>
            <div className="card border-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Package Details</h5>
                <p>Size:{props.size}</p>
                <p>Weight:{props.weight}</p>
                <p>Package Description: {props.description}</p>
                <hr />
                <p>Customer Details:</p>
                
              </div>
            <div>
              <p>Owner_ID: {props.owner_id}</p>
            </div>

            </div>
          </div>
          <div className="col">
            <div>
              <h6>Estimated Delivery Deadline:</h6>
              <p>{props.delivery_deadline}</p>
            </div>
          </div>
        </div>
      </div>
   
      <div className="card-footer d-flex justify-content-end">
      {props.vpkg.v !== 'pkg' && <button type="button" onClick={() => props.zoom(props.itemKey)} className="btn btn-secondary btn-lg">ZOOM +/-</button>}
      <i id='diffsquare' className="bi bi-square"></i>
        {(!(props.vitem.key === props.itemKey)  || props.hview.v === 'packagePage') &&
      <div className="text-center">
              <button type="button" onClick={() => props.hview.v === 'packagePage' ? props.hv_handler(props.user[0].status) : props.pkgvswitch('all')} className="btn btn-secondary btn-lg"><i className="bi-lg bi-reply-all"></i></button>
      </div>
      }
      <i id='diffsquare' className="bi bi-square"></i>
{(props.user[0].status === 'shipper' && !inOrdercartCheck() && props.customer_id !== props.user[0].id ) && <button type="button" className="btn btn-secondary btn-lg" onClick={(e) =>   addToOrderCartHandler(props)}> Add [ To Order Cart : Request To Deliver ]</button>}
        <i id='diffsquare' className="bi bi-square"></i>
{(props.user[0].status === 'shipper' && inOrdercartCheck() )&& <button type="button" className="btn btn-secondary btn-lg" onClick={(e) =>   addToOrderCartHandler(props)}> Remove [From Order Cart]</button>}
        <i id='diffsquare' className="bi bi-square"></i>

        {props.itemKey  &&
        <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => profileviewHandler(props.owner_id)} > Profile [Owner]</button>
        }

        <i id='diffsquare' className="bi bi-square"></i>
        <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => {msgsClickHandler(); console.log('pkg view messages ...')}} > [ Messages ]</button>
        <i id='diffsquare' className="bi bi-square"></i>

        { (props.user[0].id === props.id || props.user[0].status === 'customer')  &&
          <div>
            <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => console.log('pkg edit messages ...')} >Edit</button>
            <i id='diffsquare' className="bi bi-square"></i>
            <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => console.log('pkg delete messages ...')} >Delete</button>
          </div>
        }

      </div>
      </div>
    }
    <br />
    <hr />
      { msgview.v === 'on' && 
        <div>
          <h5 className="card-title"> Messages [ Package ]</h5>
          <hr />
          {messages}
        </div>
      }
    </div>
  ); 
}