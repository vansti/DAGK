import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirestore, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import {sendMessage} from './../store/actions/messageActions';

class SendMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
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

    onHandleChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    }

    onHandleSubmit = (e) =>{
        e.preventDefault();
        const idSender = this.props.auth.uid;
        const idReceiver = this.state.idReceiver;
        const idSum = idSender > idReceiver ? (idSender + idReceiver) : (idReceiver + idSender);
        const message = {
            idSender: idSender,
            idReceiver: idReceiver,
            idSum: idSum,
            message: {
                message: this.state.message,
                idSender: idSender,
                photoURL: this.props.auth.photoURL,
                time: new Date()
            }
        }
        this.props.sendMessage(message);
        this.setState({
            message: ''
        })
    }
    
    render() {
        let value = this.state.message;
        return (
            <div className="message-input">
                <div className="wrap">
                    <form onSubmit={this.onHandleSubmit} className="text-chat">
                        <input onChange={this.onHandleChange} name="message" value={value} type="text" placeholder="Write your message..." />
                        <i className="fa fa-image load-image" aria-hidden="true"></i>
                        <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </form>
                </div>
            </div>
        );
    }
}

// export default SendMessage;
const mapStateToProps = (state) => {
    return {
        chatingUser: state.chatingUser,
        users: state.firestore.data.users,
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
        { collection: 'users' }
    ])
)(SendMessage))