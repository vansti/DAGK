import React, { Component } from 'react';
import SignOut from './SignOut';
import { withRouter } from 'react-router-dom';
import { withFirestore, firestoreConnect } from 'react-redux-firebase';
import {connect} from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import moment from 'moment';

class ContactProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }
    
    componentDidMount() {
        this.setState({
            id: this.props.match.params.id
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.match.params.id
        })
    }
    
    
    render() {
        const users = _.values(this.props.users);
        const user = _.find(users, {'uid': this.state.id});
        let username = '';
        let photoURL = '';
        let online = '';
        let lastSignInTime = '';
        let status = 'online';
        let css = "name-chat-box-online";
        if(user) {
            username = user.username;
            photoURL = user.photoURL;
            online = user.online;
            lastSignInTime = user.lastSignInTime;
            if(!online) {
                status = moment(lastSignInTime.toDate()).calendar();
                css = "name-chat-box-busy";
            }
        }
        return (
            <div className="contact-profile">
                <img id="img-chat" src={photoURL} alt="" />
                <p id="name-chat">{username}</p>
                {/* <span id="name-chat-box-online"></span> */}
                <span id={css}></span> 
                <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{status}</p>
                <SignOut/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chatingUser: state.chatingUser,
        users: state.firestore.data.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}


export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(ContactProfile))