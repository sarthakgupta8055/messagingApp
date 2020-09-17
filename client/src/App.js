import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Message from './components/typeMessage'
import './App.css';

class App extends React.Component{
  render(){
    return(
        <React.Fragment>
          <div className={"container"}>
            <Message />
          </div>
        </React.Fragment>
    )
  }
}

export default App;
