import React, {useState} from "react";
import PackageListItem from "../components/PackageListItem";
import Package from "../components/Package";
import PackagePage from "./PackagePage";

export default function ShipperHome(props) {

  console.log('this # of pkgs', props.udata.packages.length) //------------------------------

  const [vpkg, setVpkg] = useState({pkg: {}, v: 'all', vtracker: []})

  const pkgvswitch = (view) => {
    setVpkg(prev => ({...prev, v: view}))
  }

  const pkglItemClickHandler = (itemInfo, view) => {
    setVpkg(prev => ({...prev, v: view, pkg: itemInfo}))
  };
 
  const [vitem, setVitem] = useState({v:'zoomout', vtacker:[]})

  const zoom = () => {
    if (vitem.v === 'zoomout') setVitem(prev => ({...prev, v: 'zoomin'}))
    if (vitem.v === 'zoomin') setVitem(prev => ({...prev, v: 'zoomout'}))
  }

  const packages = [];
  let key = props.udata.packages.length;
  props.udata.packages.forEach(pkg => {
    key += 1;
    if (pkg.status === 'ready') packages.push(
    <div key={key} className="justify-content-center">
        <hr/> 
        {vitem.v === 'zoomout' && <PackageListItem key={key} {...pkg} pkglItemClickHandler={pkglItemClickHandler} {...props}/>}
        {vitem.v === 'zoomin' && <PackagePage zoom={zoom} {...pkg} {...vitem} {...vpkg.pkg}  pkgvswitch={pkgvswitch} {...props}/>}
        <button type="button" onClick={() => zoom()} className="btn btn-lg btn-primary">ZOOM +/-</button>
        <hr/>
    </div>
    );
  });

  // const packageList =  []; 
  // for (let index = 0; index < 5; index++) {
  //   packageList.push(<PackageListItem udata={props.udata}/>);
  // }
  
  return (
    <div>
    {vpkg.v === 'pkg' && <Package  {...vpkg.pkg}  pkgvswitch={pkgvswitch} {...props}/>}
        
    {vpkg.v === 'all' && 
    <div className="m-5">
    <div className="row justify-content-center">
    <div className="col-sm-12 col-md-6">
              <button type="button" onClick={() => props.hv_handler("postPackage")} className="btn btn-lg btn-primary">+ Post New Package</button>
          </div>
      <div className="col-12">
        <h2>Packages available for pickup</h2>
      </div>
    </div>
      { packages }
      </div>
    }
    </div>
  );
}