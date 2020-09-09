import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Navigation from './components/navigation'
import './App.css';

class App extends React.Component{
  render(){
    return(
        <React.Fragment>
          <div className={"container"}>
            <Navigation />
          </div>
        </React.Fragment>
    )
  }
}

export default App;
