import { useState, useEffect } from "react";
import { ScrollTo } from "react-scroll-to";

import Nav from "./components/nav";
import Home from "./components/home"
import Pending from "./components/home/pending";
import Scrollup from "./components/scrollup";

import SignIn from './components/sigIn-signUp/signIn';
import SignUp from './components/sigIn-signUp/signUp';

import Package from "./pages/PackagePage";
import ShipperHome from "./pages/ShipperHome";
import CustomerHome from "./pages/CustomerHome";
import PostPackage from "./pages/PostPackage";
import Profile from "./components/Profile";
import './App.css';


// client-side
import  io  from "socket.io-client";

const URL = "http://localhost:3001";



const App = () => {

  const [conn, setConn ] = useState('');
  useEffect(() => {

    const socket = io(URL, {
      withCredentials: false,
    });

  }, []);

  const [hview, setHview] = useState({v: 'home', hvtracker: []})

  const [currentv, setCurrentv] = useState({v:'active', pkgs: 'packages'}) // for the user home views
  
  const user_init = {user: [{}], packages: [{}], orders:[{}]};

  const [user, setUser] = useState({...user_init});
  const [error, setError] = useState([]);
  const [errorstate, setErrorstate] = useState([]);
  const [pkg, setPkg] = useState({}); // when a new package is created, return to view it on the home here ----------------------------------- ?
  
  // for differentiated view of packages in packages and orders
  const [ordercart, setOrdercart] = useState({delivered:[], active:[], declined:[] }); 
  const [pkgs, setPkgs] = useState({delivered:[], active:[], declined:[]});

  //for pages in current view
  const [pkgsview, setPkgsview] = useState([]);
  const [ordersview, setOrdersview] = useState([]);


  const sortUser = (data) => {

    let pkgList = {delivered:[], active:[], declined:[] };
    let ordList = {delivered:[], active:[], declined:[] };

    const updateList = (object, element, status) => {
      object[status] = [...object[status], element];
    }

    if (data.packages.length !== 0) {
      for (let pkg of data.packages) {
        if (pkg.status === 'delivered') {
          updateList(pkgList, pkg, 'delivered')
        } else if (pkg.status === 'inqueue' || pkg.status === 'ready') {
          updateList(pkgList, pkg, 'active')
        } else if (pkg.status === 'declined') {
          updateList(pkgList, pkg, 'declined')
        }
      }
      setPkgs(prev => ({...prev, ...pkgList}))
      pkgList = {delivered:[], active:[], declined:[] };
    }

    if (data.orders.length !== 0) {
      for (let ord of data.orders) {
        if (ord.status === 'delivered') {
          updateList(ordList, ord, 'delivered')
        } else if (ord.status === 'inqueue' || ord.status === 'ready') {
          updateList(ordList, ord, 'active')
        } else if (ord.status === 'declined') {
          updateList(ordList, ord, 'declined')
        }
      }
      setOrdercart(prev => ({...prev, ...ordList}))
      ordList = {delivered:[], active:[], declined:[] };
    }
    setUser(prev => ({...prev, ...data}))
    setPkgsview(prev => ([...prev, ...pkgs.active]))
    setOrdersview(prev => ([...prev, ...ordercart.active]));
  }


  const hv_handler = (view) => {
    setHview(prev => ({...prev, v: view }))
  }

 const set = {timeout: ''};
 const errorHandler = (errorMessage) => {
   const timeoutHandler = (a) => { // a === 1 to set and a === 0 to unset the timeout
     if (a === 1) {
        set['timeout'] = setTimeout(() => {setError(() => []); setErrorstate(() => [])}, 10000);
      } else if (a === 0) {
        const { timeout } = set;
        clearTimeout(timeout);
      } 
    }

    if (!errorstate.includes(errorMessage)) {
      if (errorstate.length !== 0) timeoutHandler(0);
      setErrorstate((prev) => ([...prev, errorMessage]));
      setError((prev) => ([...prev, <p key={errorstate.length + 1}>{errorMessage}</p>]));
    } else if (errorstate.includes(errorMessage)) {
      timeoutHandler(0);
    }
    timeoutHandler(1)
  }

  const props = {
    hv_handler: hv_handler,
    hview: hview,
    user: user.user,
    setUser: setUser,
    user_init: {...user_init},
    errorHandler: errorHandler,
    udata:{...user},
    sortUser,
    pkg, setPkg,
    ordercart, setOrdercart,
    pkgs, setPkgs,
    pkgsview, setPkgsview,
    ordersview, setOrdersview,
    currentv, setCurrentv
  }

  return (
    <div className="App">
      
      <Nav {...props}/>
      
      <hr className='H-line'/>
      

      {error.length > 0 &&  <div className='errmsgs'>{error}</div>}
      
      <ScrollTo>
        {({ scroll }) => error.length > 0 || hview.v === "home" ? scroll({ x: 1, y:1, smooth: true }): '' }
      </ScrollTo>
    
      <hr/>
      <section className='main'>
        {hview.v === 'pending' &&  <Pending/>}
        {hview.v === "home" && <Home  {...props} />}
        {hview.v === "profile" &&<Profile  {...user.user[0]} {...props} />}

        {hview.v === "signIn" && <SignIn {...props}/>}
        {hview.v === "signUp" && <SignUp {...props}/>}
        {hview.v === "customerHome" && <CustomerHome  {...props}/>}
        {hview.v === "shipperHome" && <ShipperHome  {...props}/>}
        {hview.v === "packagePage" && <Package {...props}/> /* // when a new package is created, return to view it on the home */} 
        {hview.v === "postPackage" && <PostPackage {...props}/>}

        {/* ## --Working Notes-- ##
            -Each package carries a messaging platform client like Whatsapp
            -Profile on the main view(here home) and on the package view
            -Perhaps no package on the main view
            ---------------------------------------------------------------------------------------
            -CRUD operations functionality for users(shipper, customer, admin) and packages
            -add the admin, messages, help, and documentation views. the messeges view to view inbox or mail
            -user profile update or upgrade
            -package edit - available only when package is not yet shipped.
            -uploads, subforms, pkg messaging platform service, backend and data storage, websocket
            -security, ssl, cleenup props and refactor
            -Every created package carries a group chat room with stati available, dilivered, shipped, canceled, declined - in which case it comes back to availabe or canceled depending on owners choice
            -each request to ship subsribes to the group chatroom and carries a button to Accept? and button to the shipper's(requester's) profile
            -once a shipping request is accepted the group chat room is temporally frozen and all other participants notified by and package status change to shipped.
            -the accpepted request now oppens into a private chatroom with the chipper. A status appears on it as shipped and changes to delivered when it is done. 
            -delivery time is tracked and indicated with green for before or in time or red for late.
            -The private chatroom opens by the apperance of a message button on the request message and the disapperance or freeze of the accept buttton.
            -if the shipper declines the package, buttons appear to cancel it or repost it - in which case a new group chatroom is opened. within 24hours after which its automatically canceled and automated messages sent to both parties on whats next., 
            -there will also be a status to show if a user is online or not.
            -on the shipper side, once in charge of a package, button appears to indicate diliverd. on press, status light becomes orange from green pending owner confirmation.
            -on owner side once delivered, a button appears to confirm delivery in which case the light changes blue for delivered.
            -there should be a view to lodge a complain or querry and messenging to indicate regularised.
            -add mapping service on the packages
            -add search service for shipper depending on location/area
            -add monetizing scheme service
            -add public authority and security service connection in admin view
            -add subscription brackground verification service
            -account creation pending background verification service results and notification - creation declined or accepted and messaging
            -Upgrade style, APIs, ux
            -add 'a set path for the day' map feature for the shipper, to be used to sort available packages around and along that path and show them as available, if not, sort available with last map.
            -write unit, integration and E2E tests for code coverage - TDD was strongly prescribed
            -make site responsive and build mobile version
            -design deployment plan/architecture pub/sub, containers, ...etc
            -add a pkg tracking view
            -a package 'really becomes' an order only when a shipping confirmation has been established at which point it is saved to the db and all parties duely notified.
            -a newly created package sits in the packages view. Delivered and declined go package history
            -a newly requested order sits in the order cart. delivered and declined go to order history
        */}

      </section>
      <Scrollup/> 
    </div>
  );
}

export default App;
