import React, {useState} from "react";
import PackageListItem from "../components/PackageListItem";
import Package from "../components/Package";
import PackagePage from "./PackagePage";

export default function ShipperHome(props) {

  const [vpkg, setVpkg] = useState({pkg: {}, v: 'all', vtracker: []})

  const pkgvswitch = (view) => {
    setVpkg(prev => ({...prev, v: view}))
  }

 const [lcurrentv, setLcurrentv] = useState({v:'mine'}) // for local pks in view
  

  const pkglItemClickHandler = (itemInfo, view) => {
    setVpkg(prev => ({...prev, v: view, pkg: itemInfo}))
  };
 
  const [vitem, setVitem] = useState({v:'zoomout', vtacker:[], key: ''})

  const zoom = (key) => {
    if (vitem.v === 'zoomout') setVitem(prev => ({...prev, v: 'zoomin', key: key}))
    if (vitem.v === 'zoomin') setVitem(prev => ({...prev, v: 'zoomout', key: ''}))
  }

  // props.pkgsview
  // pkg view = [mine, availableForShipping, active, delivered, declined]
  
  const pkgsInView = (currentvPkgs, status) => {
    const packages = currentvPkgs === 'packages' ? props.pkgs : props.ordercart;
    const dbPkgs = (status) => {
      const myPkgs = [];
      const otherPkgs = []
      for (let pkg of packages[status]) {
        if (pkg.customer_id === props.user[0].id) {
          myPkgs.push(pkg);
        } else {
          otherPkgs.push(pkg)
        }
      }
      return [myPkgs, otherPkgs];
    }
    if (status === 'active') return dbPkgs('active');
    if (status === 'delivered') return packages.delivered;
    if (status === 'declined') return packages.declined;
  }

  const localPkgsInView = (pkgs) => {
    if (props.currentv.v === 'active' && lcurrentv.v === 'mine') return pkgs[0];
    if (props.currentv.v === 'active' && lcurrentv.v === 'availableForShipping') return pkgs[1];
    if (props.currentv.v === 'delivered') return pkgs;
    if (props.currentv.v === 'declined') return pkgs;
  } 

  const Vpkgs = localPkgsInView(pkgsInView(props.currentv.pkgs, props.currentv.v)); /*props.pkgsview;*/ //******* */
  console.log(Vpkgs.length) //-------------------------------------------------------------------
  const packages = [];
  let key = Vpkgs.length;
  Vpkgs.forEach(pkg => {
    key += 1;
    if (pkg.status === 'ready') packages.push(
    <div key={key} className="justify-content-center">
        <hr/> 
        { [key][0] !== vitem.key && <PackageListItem zoom={zoom} key={key} vpkg={vpkg} vitem={vitem} itemKey={[key][0]} {...pkg} listpkg={pkg} pkglItemClickHandler={pkglItemClickHandler} {...props}/>}
        { [key][0] === vitem.key && <PackagePage zoom={zoom} key={key} vpkg={vpkg} vitem={vitem} itemKey={[key][0]} listpkg={pkg} {...pkg} {...vitem}  pkgvswitch={pkgvswitch} {...props}/>}
        <hr/>
    </div>
    );
  });
 
  return (
    <div>
    {vpkg.v === 'pkg' && <Package vpkg={vpkg} listpkg={vpkg.pkg} {...vpkg.pkg}  pkgvswitch={pkgvswitch} {...props}/>}
        
    {vpkg.v === 'all' && 
    <div className="m-5">
      <div className="row justify-content-center">
        <div className="buttonz col-sm-12 col-md-6">
          
          <button type="button" style={lcurrentv.v === 'mine'? {boxShadow:'20px 20px 50px 15px aqua'} : {}} onClick={() => {props.setCurrentv(prev => ({...prev, v:'active'})); setLcurrentv(prev => ({...prev, v:'mine'}))}} className="btn btn-secondary btn-lg">Packages [MINE]</button>
          <i id='diffsquare' className="bi bi-square"></i>
          <button type="button" style={lcurrentv.v === 'availableForShipping'? {boxShadow:'20px 20px 50px 15px aqua'} : {}} onClick={() => {props.setCurrentv(prev => ({...prev, v:'active'})); setLcurrentv(prev => ({...prev, v:'availableForShipping'}))}} className="btn btn-secondary btn-lg">Packages [SHIP-READY]</button>
          <i id='diffsquare' className="bi bi-square"></i>
          <button type="button" onClick={() => props.hv_handler("postPackage")} className="btn btn-secondary btn-lg">+ Package [POST NEW]</button>
          
        </div>
      </div>
      { packages }
      </div>
    }
    </div>
  );
}