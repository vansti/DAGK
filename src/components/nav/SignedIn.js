import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

class SignedIn extends Component  {

  handleAuth = (e) => {
    e.preventDefault()
    this.props.signOut()
  }
  render(){
    const { auth } = this.props;
    return (
      <div>
        <ul className="right">
          <li><a href="." onClick={this.handleAuth}>Log Out</a></li>
          <li><NavLink to='/' className="btn btn-floating lighten-1"><img className="responsive-img" src={auth.photoURL} alt="" style={{width:'40px'}}></img></NavLink></li>
        </ul>
      </div>
    )
  }
  
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedIn)