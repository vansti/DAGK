import React, { Component, Fragment} from 'react';
import MenuListUsers from '../components/MenuListUsers';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../styles/home.css'
import SearchUser from '../components/SearchUser';
import ChatContent from '../components/ChatContent';
import {getDataUser} from '../store/actions/chatDataActions';
import SignOut from '../components/SignOut';

class Home extends Component {

    componentDidMount() {
        if (localStorage.getItem('login') === 'unlogged') {
            this.props.history.push('/');
        }
        const {id} = this.props.match.params;
        this.props.getDataUser(id);
    }
    
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps.match.params.id);
        const { id } = nextProps.match.params;
        this.props.getDataUser(id);
    }

    render() {
        // console.log(this.props.match.params.id);
        const { auth } = this.props;
        const { displayName, photoURL } = auth;
        return (
            // <nav className="navbar navbar-inverse">
            //     <div className='container-fluid'>
            //         <div className="navbar-header">
            //             <img className="img-circle" src={photoURL} alt="Logo" style={{width:'40px', marginTop:'5px'}}/> 
            //         </div>
            //         <p className="navbar-text">{displayName}</p>
            //     </div>
            // </nav>
            // <div id="frame">
            //     <div id="sidepanel">
            //         <div id="profile">
            //             <div className="wrap">
            //                 <img id="profile-img" src={photoURL} className="online" alt="" />
            //                 <p id="profile-name">{displayName}</p>
            //             </div>
            //         </div>
            //         <SearchUser />
            //         <div id="contacts">
            //             <MenuListUsers />
            //         </div>
            //     </div>
            //     <ChatContent />
            // </div>
            <Fragment>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <a className="navbar-brand" href="#">Chat app</a>
                    <ul className="navbar-nav ml-auto ">
                        <li className="nav-item">
                            <a className="nav-link disabled"  href="#">{displayName}</a>
                        </li>
                        <li className="nav-item">
                            <img className="rounded-circle" src={photoURL} alt="Logo" style={{width:'40px',marginRight:'10px'}}/>     
                        </li>                      
                    </ul>
                    <SignOut/>
                </nav>
                <div className="container">
                    <h3 className=" text-center">Messaging</h3>
                    <div className="messaging">
                        <div className="inbox_msg">
                            <div className="inbox_people">
                                <div className="headind_srch">
                                    <div className="recent_heading">
                                        <h4>Recent</h4>
                                    </div>
                                    <div className="srch_bar">
                                        <div className="stylish-input-group">
                                            <input type="text" className="search-bar"  placeholder="Search"/>
                                            <span className="input-group-addon">
                                            <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                            </span> 
                                        </div>
                                    </div>
                                </div>
                                <MenuListUsers/>
                            </div>
                        </div>
                    </div>
                </div>
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
        getDataUser: (id) => dispatch(getDataUser(id))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));