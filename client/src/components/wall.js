import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const CurrentMessage = props => (
    <tr>
        <td>{props.message.SenderName}</td>        
        <td>{props.message.message}</td>
        <td>{props.message.PostDate}</td>
    </tr>
)
class Wall extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            messages : []
        }
    }
    componentDidMount(){
        axios.get("http://localhost:4000/messages/allMessages")
            .then(response => {
                this.setState({ messages: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
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
                <table className="table table-striped" style={{ marginTop: 20 }} >
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
                </table>
            </React.Fragment>
        )
    }
}
export default Wall;