import React, { Component, Fragment}  from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { signIn } from '../store/actions/authActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
    }

    onSignIn = (e) => {
        e.preventDefault();
        this.props.signIn((id) => {
            this.props.history.push(`/user/${id}`);
        });
    }
    componentDidMount() {
        const id = this.props.auth.uid;
        if (localStorage.getItem('login') === 'logged') {
            this.props.history.push(`/user/${id}`);
        }
    }
    render() {
        const id = this.props.auth.uid;
        if (localStorage.getItem('login') === 'logged') {
            return <Redirect to={`/user/${id}`} />;
        }
        return (
            <Fragment>
                <div className="welcome">Welcome to Chat App</div>
                <ul>
                    <li>
                        <a onClick={this.onSignIn} href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                    </li>
                </ul>
            </Fragment>
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