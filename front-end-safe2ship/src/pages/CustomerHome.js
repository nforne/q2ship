import {React, useState} from "react";
import PackageListItem from "../components/PackageListItem";
import Package from "../components/Package";
import PackagePage from "./PackagePage";
import "./customerHome.css";

export default function CustomerHome(props) {

  const [vpkg, setVpkg] = useState({pkg: {}, v: 'all', vtracker: []})
  
  const pkgvswitch = (view) => {
    setVpkg(prev => ({...prev, v: view}))
  }
  
  // const [currentv, setCurrentv] = useState({v:'active', pkgs: 'packages'}) // raised state

  const pkglItemClickHandler = (itemInfo, view) => {
    setVpkg(prev => ({...prev, v: view, pkg: itemInfo}))
  };

  const [vitem, setVitem] = useState({v:'zoomout', vtacker:[], key: ''})

  const zoom = (key) => {
    if (vitem.v === 'zoomout') setVitem(prev => ({...prev, v: 'zoomin', key: key}))
    if (vitem.v === 'zoomin') setVitem(prev => ({...prev, v: 'zoomout', key: ''}))
  }

  // pkg view = [active, delivered, declined]
  // pkgs = orders/packages

  const pkgsInView = (currentvPkgs, status) => {
    const packages = currentvPkgs === 'packages' ? props.pkgs : props.ordercart;
    if (status === 'active') return packages.active;
    if (status === 'delivered') return packages.delivered;
    if (status === 'declined') return packages.declined;
  }

  let key = props.pkgsview.length + 1;
  const packages = pkgsInView(props.currentv.pkgs, props.currentv.v).map(pkg => {
    key += 1;
  return (
    <div key={key} className="justify-content-center">
        <hr/> 
        { [key][0] !== vitem.key && <PackageListItem zoom={zoom} key={key} vpkg={vpkg} vitem={vitem} itemKey={[key][0]} {...pkg} listpkg={pkg} pkglItemClickHandler={pkglItemClickHandler} {...props}/>}
        { [key][0] === vitem.key && <PackagePage zoom={zoom} key={key} vpkg={vpkg} vitem={vitem} itemKey={[key][0]} listpkg={pkg} {...pkg} {...vitem}  pkgvswitch={pkgvswitch} {...props}/>}
        <hr/>
    </div>
  )
    
  });


  return (
      <div className="m-5">
        {vpkg.v === 'pkg' && <Package listpkg={vpkg.pkg} pkg={vpkg.pkg} {...vpkg.pkg}  pkgvswitch={pkgvswitch} {...props}/>}
        
        {vpkg.v === 'all' && 
          <div>
        <div className="row justify-content-end">
          <div className="col-sm-12 col-md-6">
          <button type="button" style={{boxShadow:'20px 20px 50px 15px aqua'}} onClick={() => {}} className="btn btn-secondary btn-lg">Packages [MINE]</button>
          </div>
          <div className="col-sm-12 col-md-6">
              <button type="button" onClick={() => props.hv_handler("postPackage")} className="btn btn-secondary btn-lg">+ Package [POST NEW]</button>
          </div>
        </div>
        {packages}
        </div>
        }

      </div>
  );
}