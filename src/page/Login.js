import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { signIn } from '../store/actions/authActions';
import '../styles/login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
    }

    onSignIn = () => {
        this.props.signIn((id) => {
            this.props.history.push(`/${id}`);
        });
    }
    componentDidMount() {
        //console.log(this.props.auth);
        const id = this.props.auth.uid;
        if (localStorage.getItem('login') === 'logged') {
            this.props.history.push(`/${id}`);
        }
    }
    render() {
        const id = this.props.auth.uid;
        if (localStorage.getItem('login') === 'logged') {
            return <Redirect to={`/${id}`} />;
        }
        return (
            <div className="container">
                <button className="btn btn-google btn-login" type="button" onClick={this.onSignIn}>
                    <span className="fa fa-google-plus" /> Sign in with Google
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        chatingUser: state.chatingUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (callback) => dispatch(signIn(callback))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));