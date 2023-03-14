import React from "react";
import Logo1 from "../nav/logo.jpg";
import './home.css';

export default function Pending(props) {
   
    return (
        <div className="pending">
            <center>
            <img style={{width: '25%', height: '25%', borderRadius: '50%',borderColor: '#47B5FF',}} src={Logo1} alt="logo"/>
            <br />
            <div style={{width: '25%', height: '25%', }}>
                <hr />
                <h1 className="text--semi-bold">{"Loading . . . . "}</h1>
                <div className="spinner-border text-info" role="status"></div>
                <hr />
            </div>
            </center>
        </div>
    );
 }
