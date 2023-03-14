import React from "react";
import "./package.css";

export default function PackageListItem(props) {

  return (
    
    <div className="row my-5" onClick={() => {}}>
     
      <div className="col-8 mx-auto">
        <div className="card package-list-item">
          <div className="card-body">
            <div className="row justify-content-between align-items-center">
              <div className="col-md-3">
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
              <div className="col-sm-12 col-md-7">
                <p><strong>Source:</strong>&nbsp;&nbsp; {props.source}</p>
                <p><strong>Destination:</strong>&nbsp;&nbsp; {props.destination}</p>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  <i className="bi bi-chevron-right" ></i>
                  
                  <div className="pkgListItemButtons">
                    
                    <button type="button" onClick={() => props.zoom(props.itemKey)} className="btn btn-secondary btn-lg">ZOOM +/-</button>
                    <i id='diffsquare' className="bi bi-square"></i>
                    <button type="button" onClick={() => props.pkglItemClickHandler ? props.pkglItemClickHandler(props, 'pkg') : ''} className="btn btn-secondary btn-lg">DETAILS</button>
                    
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

      

      </div>

     
    </div>

    
  );
}