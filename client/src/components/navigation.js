import React from 'react';
import NewMessage from './typeMessage'
import wall from './wall'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Nav extends React.Component{
    render(){
        return(
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  {/* <Link to="/" className="navbar-brand">New Message</Link> */}
                  <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                        <Link to="/" className="nav-link navbar-brand">New Message</Link>
                        </li>
                        <li className="navbar-item">
                        <Link to="/wall" className="nav-link navbar-brand">Wall</Link>
                        </li>
                    </ul>
                  </div>
              </nav>
              <Route path="/" exact component={NewMessage} />
              <Route path="/wall" component={wall} />
            </Router>
        )
    }
}
export default Nav;