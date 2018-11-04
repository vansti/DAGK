import React, { Component } from 'react';
import moment from 'moment';

class Message extends Component {
    render() {
        const {message, status} = this.props;
        return (
            <li className={status}>
                <img src={message.photoURL} alt="" />
                <p title={moment(message.time.toDate()).calendar()}>{message.message}</p>
            </li>
        );
    }
}

export default Message;