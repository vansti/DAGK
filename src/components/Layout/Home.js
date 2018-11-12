import React, { Component, Fragment} from 'react';
import MenuListUsers from '../LeftFrame/MenuListUsers';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChatContent from '../RightFrame/ChatContent';
import {getDataUser} from '../../store/actions/chatDataActions';
import SignOut from './SignOut';
import {listenDisConnect} from '../../store/actions/authActions';

class Home extends Component {

    componentDidMount() {
        this.props.listenDisConnect(this.props.auth.uid);
        if (localStorage.getItem('login') === 'unlogged') {
            this.props.history.push('/');
        }
        const {id} = this.props.match.params;
        this.props.getDataUser(id);
    }
    
    componentWillReceiveProps(nextProps) {
        const { id } = nextProps.match.params;
        this.props.getDataUser(id);
    }

    render() {
        const { auth } = this.props;
        const { displayName, photoURL, phoneNumber, email } = auth;
        return (
            <Fragment>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                        <i className="fa fa-user-circle-o" aria-hidden="true"></i> View Profile 
                    </button>
                    <SignOut/>
                </nav>
                <div className="modal" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                        <div className="modal-header">
                            <img className="rounded-circle"  src={photoURL} alt="Logo" style={{width:'40px',marginRight:'10px'}}/>
                            <h4 style={{fontFamily : "'Spectral', serif"}} className="modal-title">{displayName}'s Profile</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <p><span style={{fontFamily : "'Playfair Display', serif"}}>Name:</span> {displayName}</p>
                            <p><span style={{fontFamily : "'Playfair Display', serif"}}>Email:</span> {email}</p>
                            <p><span style={{fontFamily : "'Playfair Display', serif"}}>Phone number:</span> {phoneNumber}</p>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                        </div>
                    </div>
                </div>
                <div className="container">
                    <h2 className="text-center" style={{fontFamily : "'Rakkas', cursive"}}>Chat App</h2>
                    <div className="messaging">
                        <div className="inbox_msg">
                            <MenuListUsers/>
                            <ChatContent />
                        </div>
                    </div>                 
                </div>
                <p class="text-center top_spac"> Made by <span style={{fontFamily : "'Playfair Display', serif"}}> Phạm Lê Thiện Tâm</span></p>
            </Fragment>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDataUser: (id) => dispatch(getDataUser(id)),
        listenDisConnect: (uid) => dispatch(listenDisConnect(uid))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));