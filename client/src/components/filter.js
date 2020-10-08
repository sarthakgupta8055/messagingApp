import React from 'react';
// import axios from 'axios';
// import Wall from './wall'
class Filter extends React.Component{
    constructor(props){
        super();
        this.state = {
            FilterName : ""
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);

    }
    handleOnChange(event){
        this.setState({
            FilterName : event.target.value
        })
    }
    handleOnSubmit(){
        this.setState({
            FilterName : this.state.FilterName.trim()
        })
        if(this.state.FilterName !==""){
            this.props.FilterFunction(this.state.FilterName);
        }
        else{
            alert("Enter name");
        }
    }
    render(){
        return(
            <React.Fragment>
                <div>
                    <input type="text" placeholder="Filter by Name"
                        onChange={this.handleOnChange} required
                    />
                    <button type="submit" name="filter" className={"ml-2 p-1 btn btn-primary"}
                        onClick={this.handleOnSubmit}
                    >Filter</button>
                </div>
            </React.Fragment>
        )
    }
}
export default Filter;