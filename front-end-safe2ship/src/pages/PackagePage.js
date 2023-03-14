import React, {useState, useEffect} from "react";
import Profile from "../components/Profile";
import Package from "../components/Package";
import axios from "axios";
import "./package-page.css"



export default function PackagePage(props) {

  const [view, setView] = useState({v: 'pkg', profile:{}, vtracker:[]})

  const vSwitch = (view) => {
    setView(prev => ({...prev, v: view }))
  }

  const [vpkg, setVpkg] = useState({pkg: {}, v: 'all', vtracker: []})

  const pkgvswitch = (view) => {
    setVpkg(prev => ({...prev, v: view}))
  }

  const profileviewHandler = (input) => {
    axios.post('/api/users/other', {id: input})
          .then((userInfo) => { 
            setView(prev => ({...prev, profile: userInfo.data}))
          })
          .catch(err => console.log(err)) //-------------------------------
  } 

  useEffect(() => {

    props.v === 'zoomin' ? profileviewHandler(props.customer_id) : console.log('zoomout');
    console.log('this profile ===>', view.profile) //--------------------------------------

  }, [])
  
  return (
    <div className="container my-5 py-4">
      <h2>Package #{props.id}</h2>
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid">
          <h3 className="header-info"> Owner's Profile </h3>
           { (props.v === 'zoomin' || props.hview.v === 'packagePage') && <Profile {...props} {...view.profile} vSwitch={vSwitch} /> }
            <hr />
            <hr />

          <h3 className="header-info">Package Information</h3>

           { (props.v === 'zoomin' || props.hview.v === 'packagePage') && <Package {...props}/> }
        </div>
      </div>
    </div>
  );
}