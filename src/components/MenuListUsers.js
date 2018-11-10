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
            reRender: false,
            keyword: ''
        }
    }

    onHandleChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        let { keyword } = this.state;
        const uid = this.props.auth.uid;
        let list = _.values(this.props.users);
        const index = _.findIndex(list, { 'uid': uid });
        let priority = [];
        if (index !== -1) {
            priority = list[index].priority;
            if (priority) {
                for (let i = 0; i < list.length; i++) {
                    for (let j = 0; j < priority.length; j++) {
                        if (list[i].uid == priority[j].idUser) {
                            list[i].star = priority[j].star;
                            list[i].timeChat = priority[j].timeChat;
                        }
                    }
                }
            }
        }
        let online = [];
        let offline = [];
        for (let i = 0; i < list.length; i++) {
            list[i].scoreStar = list[i].star ? 100 * (new Date()) : 1;
            list[i].scoreTime = list[i].timeChat ? list[i].timeChat.seconds : 0.9;
            if(list[i].online){
                online.push(list[i])
            } else {
                offline.push(list[i])
            }
        }
        online.sort((a, b) => {
            return ((b.scoreStar * b.scoreTime) - (a.scoreTime * a.scoreStar));
        });
        offline.sort((a, b) => {
            return ((b.scoreStar * b.scoreTime) - (a.scoreTime * a.scoreStar));
        });
        list = online.concat(offline);
        list = _.values(list).filter((user) => {
            return user.username.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        })
        let usersList = null;
        if (list.length > 0) {
            usersList = list.map((user, index) => {
                return (
                    <MenuUser
                        key={index}
                        user={user}
                    />
                );
            });
        }
        return (
            <div className="inbox_people">
                <div className="headind_srch">
                    <div className="recent_heading">
                        <h4>Recent</h4>
                    </div>
                    <div className="srch_bar">
                        <div className="stylish-input-group">
                            <input type="text" onChange={this.onHandleChange} name="keyword" type="text" value={keyword} className="search-bar" placeholder="Search"/>
                            <span className="input-group-addon">
                            <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                            </span> 
                        </div>
                    </div>
                </div>
                <div className="inbox_chat">
                    {usersList}
                </div>
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