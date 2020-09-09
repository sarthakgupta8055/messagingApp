import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

class typeMessage extends React.Component{
    constructor(props){
        super(props)
        
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.state = {
            message : "",
            SenderName: "",
            PostDate : ""
        }
    }
    handleOnChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    componentDidMount(){
        var d = new Date();
        this.setState({
            PostDate : d.toLocaleDateString()
        })
    }
    handleOnSubmit(event){          
        this.setState({
            SenderName : this.state.SenderName.trim(),
            message: this.state.message.trim(),
        })
        if(this.state.SenderName!=="" && this.state.message!==""){
            console.log("Check");
            const messageData = {
                message : this.state.message,
                SenderName : this.state.SenderName,
                PostDate : this.state.PostDate
            };
            console.log(messageData);
            axios.post("http://localhost:4000/messages/", messageData)
                .then(res => console.log(res.data));

            event.preventDefault();
        }
        else{
            return;
        }
        this.setState({
            message : "",
            SenderName: "",
            PostDate : ""
        })
    }
    render(){
        return(
            <React.Fragment>
                <form className={"a"}>
                    <input type="text" name={"SenderName"} placeholder={"Enter your name"} 
                        value={this.state.SenderName}
                        onChange={this.handleOnChange} required></input>
                    <input type="text" name={"message"} placeholder={"Enter your message"} 
                        value={this.state.message}
                        onChange={this.handleOnChange} required></input>
                    <button type="submit" onClick={this.handleOnSubmit} 
                        className={"ml-2 p-1 btn btn-primary"}>Send
                    </button>
                </form>
            </React.Fragment>
        )
    }
}
export default typeMessage;