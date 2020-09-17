import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

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
    FetchData(){
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
                <p>Total Messages {this.state.count}</p>
                <div>{ this.displayMessages() }</div>
                {/* <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Sender</th>
                            <th>Message</th>
                            <th>Date Posted</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.displayMessages() }
                    </tbody>
                </table> */}
            </React.Fragment>
        )
    }
}
export default Wall;