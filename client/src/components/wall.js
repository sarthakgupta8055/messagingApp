import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Filter from './filter'

const CurrentMessage = props => (
    <div className={"row m-2"}>
        <p className={"col-sm-3 d-inline text-info"}>{props.message.SenderName} :</p>
        <div className={"col-sm-9 bg-light"}>
            <p className={"d-inline text-primary"}>{props.message.message}</p>
            <p className={"d-inline float-right text-secondary"}><small>{props.message.PostDate}</small></p>
        </div>
    </div>
)
class Wall extends React.Component{
    constructor(props){
        super()
        this.state = {
            messages : [],
            count : 0
        }
    }
    //Filter By Name
    SampleCheck(name){
        name = name.trim();
        console.log(name);
        if(name!=""){
            axios.post("http://localhost:4000/messages/FilterByName",{ FilterName : name})
            .then(response =>{
                this.setState({
                    messages : response.data
                })
                console.log(this.state.messages);
            });
        }
        else{
            this.FetchData();
        }

    }
    FetchData(){
        // console.log("check")
        axios.get("http://localhost:4000/messages/allMessages")
            .then(response => {
                this.setState({ messages: response.data.message,
                    count : response.data.count
                });                
            })
            .catch(function (error){
                console.log(error);
            })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.messages!==null){
            if(nextProps.messages.count!== this.state.count){
                console.log("Setting state");
                this.setState({
                    messages : nextProps.messages.message,
                    count : nextProps.messages.count
                })
            }
        }
    }
    componentDidMount(){
        this.setState({
            count : 0
        })
        this.FetchData();
    }
    displayMessages(){
        return this.state.messages.map(function(current, i){
            return <CurrentMessage message={current} key={i} />;
        })
    }
    render(){
        return(
            <React.Fragment>
                <div className={"text-center"}>Wall</div>
                <div className={"row"}>
                    <p className={"col-sm-4"}>Total Messages {this.state.count}</p>
                    <p className={"col-sm-4"}/>
                    <p className={"col-sm-4"}>
                        <Filter className={"float-right"} FilterFunction={(name)=>this.SampleCheck(name)}/>
                    </p>
                </div>
                <div>{ this.displayMessages() }</div>
            </React.Fragment>
        )
    }
}
export default Wall;