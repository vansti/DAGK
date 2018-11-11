import React, { Component } from 'react';
import Message from './Message';
import { withRouter } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import { sendMessage } from './../store/actions/messageActions';
import SendMessage from './SendMessage';

class ListMessages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idReceiver: ''
        }
    }

    componentDidMount() {
        this.setState({
            idReceiver: this.props.match.params.id
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            idReceiver: nextProps.match.params.id
        })
    }

    
    render() {
        const idSender = this.props.auth.uid;
        const idReceiver = this.state.idReceiver;
        const idSum = idSender > idReceiver ? (idSender + idReceiver) : (idReceiver + idSender);
        const firestoreMessages = _.find(_.values(this.props.messages), { 'idSum': idSum });
        let messages = null;
        let listMessage = '';
        if (firestoreMessages) {
            messages = firestoreMessages.messages;
            listMessage = messages.map((message, index) => {
                const isReceiveMessage = message.idSender === idSender ? 'true' : '';
                return (
                    <Message key={index} message={message} status={isReceiveMessage} />
                )
            })
        }
        return (
            <div className="mesgs">  
                <div className="msg_history">     
                    {listMessage} 
                </div>
                <SendMessage />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.firestore.data.messages,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (message) => dispatch(sendMessage(message))
    }
}


export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'messages' }
    ])
)(ListMessages))
