import React from "react";
import ReactDOM from "react-dom";

function Welcome(props) {  
    return <h1>Hello, {props.name} i have changed!</h1>;}
     
const element = <Welcome name="Fred" />; 
ReactDOM.render(element, document.getElementById("index")); 