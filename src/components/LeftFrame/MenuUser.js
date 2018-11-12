import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { chatWithUser } from '../../store/actions/currentChat';


class MenuUser extends Component {
    onChat = (id) => {
        this.props.chatWithUser(id);
        this.props.history.push(`/user/${id}`);
    }
    render() {
        const { user } = this.props;
        const { username, online, lastSignInTime, photoURL } = user;
        let status = `online`;
        if (!online) {
            status = `${moment(lastSignInTime.toDate()).fromNow()}`;
        }

        let isActive = "chat_list";
        if(this.props.match.params.id == user.uid)
        {
            isActive = "chat_list active_chat"
        }

        return (
            <div className={isActive} onClick={() => this.onChat(user.uid)}>
                <div className="chat_people">
                    <div className="chat_img"> 
                        <img className="rounded-circle" src={photoURL} alt="sunil"/> 
                    </div>
                <div className="chat_ib">
                    <h5 style={{fontFamily : "'Spectral', serif"}}>{username}</h5>
                    <p>
                        <i style={{fontSize : "10px"}} className={online ? "fa fa-circle online": "fa fa-circle offline"}></i> {status}
                    </p>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        chatWithUser: (id) => dispatch(chatWithUser(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuUser));