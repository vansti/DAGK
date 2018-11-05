import React, { Component, Fragment} from 'react';
import moment from 'moment';

class Message extends Component {

    renderMyMessage = (message) => {
        return (
        <Fragment>
            <div className="outgoing_msg">
                <div className="sent_msg">
                    <p style={{fontFamily : "'Archivo', sans-serif"}}>{message.message}</p>
                    <span className="time_date"> {moment(message.time.toDate()).calendar()} </span> 
                </div>
            </div>  
        </Fragment>
        )
      }
    
    renderReceiveMessage = (message) => {
        return (
          <Fragment>
            <div className="incoming_msg">
                <div className="incoming_msg_img"> 
                    <img src= {message.photoURL} className="rounded-circle" alt="sunil"/> 
                </div>
                <div className="received_msg">
                    <div className="received_withd_msg">
                        <p style={{fontFamily : "'Archivo', sans-serif"}}>{message.message}</p>
                        <span className="time_date">{moment(message.time.toDate()).calendar()}</span>
                    </div>
                </div>
            </div>
          </Fragment>
        )
    }

    render() {
        const {message, status} = this.props;
        return (
            <Fragment>{status ? this.renderMyMessage(message) : this.renderReceiveMessage(message)}</Fragment>
        );
    }
}

export default Message;