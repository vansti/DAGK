import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { signOut } from '../../store/actions/authActions';
import { connect } from 'react-redux';

class SignOut extends Component {
    onSignOut = () => {
        console.log('sign out');
        this.props.signOut(() => {
            this.props.history.push('/');
        })
    }

    render() {
        return (
            <button className="btn btn-danger ml-auto" onClick={this.onSignOut} >Sign out <i   className="fa fa-sign-out"></i></button>
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
        signOut: (callback) => dispatch(signOut(callback)),
    }
}

// export default SignOut;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignOut));
