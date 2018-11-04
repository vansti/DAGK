import React, { Component } from 'react';
import { withFirestore, firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import MenuUser from './MenuUser';


class MenuListUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reRender: false
        }
    }
    
    render() {
        const users  = _.values(this.props.users);
        let usersList = null;
        if (users.length > 0) {
            usersList = users.map((user, index) => {
                return (
                    <MenuUser key={index} user={user} />
                );
            });
        }
        return (
            <div className="inbox_chat">
                {usersList}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.data.users,
        auth: state.firebase.auth,
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
)(MenuListUsers))