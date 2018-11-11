import React, { Component, Fragment} from 'react';
import moment from 'moment';

class Message extends Component {

    renderMyMessage = (message,links) => {
        return (
        <Fragment>
            <div className="outgoing_msg">
                <div className="sent_msg">
                    {links}
                    <p style={{fontFamily : "'Archivo', sans-serif"}}>{message.text}</p>
                    <span className="time_date"> {moment(message.time.toDate()).calendar()} </span> 
                </div>
            </div>  
        </Fragment>
        )
      }
    
    renderReceiveMessage = (message,links) => {
        return (
          <Fragment>
            <div className="incoming_msg">
                <div className="incoming_msg_img"> 
                    <img src= {message.photoURL} className="rounded-circle" alt="sunil"/> 
                </div>
                <div className="received_msg">
                    <div className="received_withd_msg">
                        {links}
                        <p style={{fontFamily : "'Archivo', sans-serif"}}>{message.text}</p>
                        <span className="time_date">{moment(message.time.toDate()).calendar()}</span>
                    </div>
                </div>
            </div>
          </Fragment>
        )
    }

    render() {
        const {message, status} = this.props;
        const imgLinks = message.text.match(/(https?|ftp:)([^\s]+)/g);
        let links = null;
        if(imgLinks){
            links = imgLinks.map((link, index) => {
                return <img  key={index} className="img-thumbnail" src={link} alt="" />
            })
        }
        return (
            <Fragment>{status ? this.renderMyMessage(message,links) : this.renderReceiveMessage(message,links)}</Fragment>
        );
    }
}

export default Message;