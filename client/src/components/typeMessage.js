import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Wall from './wall';

class typeMessage extends React.Component{
    constructor(props){
        super();
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.state = {
            message : "",
            SenderName: "",
            PostDate : "",
            allMessages : null
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
    FetchData(){
        console.log("Fetching data")
        axios.get("http://localhost:4000/messages/allMessages")
            .then(response => {
                this.setState({ messages: response.data.message,
                    count : response.data.count
                }, 
                () =>{console.log("Fetched Data ", response.data);
                    this.setState({
                        allMessages : response.data
                    })
                });                
            })
            .catch(function (error){
                console.log(error);
            })
    }
    handleOnSubmit(event){
        event.preventDefault();
          
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
                .then(this.FetchData());
        }
        else{
            return;
        }
        this.setState({
            message : "",
            SenderName: "",
        })
    }
    render(){
        return(
            <React.Fragment>
                <Wall messages={this.state.allMessages}/>
                <form className={"a"}>
                    <input type="text" name={"SenderName"}
                        className={"ml-2"}
                        placeholder={"Enter your name"} 
                        value={this.state.SenderName}
                        onChange={this.handleOnChange} required></input>
                    <input type="text" name={"message"}
                        className={"ml-2"}
                        placeholder={"Enter your message"} 
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