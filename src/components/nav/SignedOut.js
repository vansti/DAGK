import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions'

class SignedOut extends Component {

  handleAuth = (e) => {
    e.preventDefault()
    this.props.signIn()
  }
  render(){
    return (
      <div>
        <ul className="right">
          <li><a href="." onClick={this.handleAuth}>Login with Google</a> </li>
        </ul>
      </div>
    )
  }
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: () => dispatch(signIn())
  }
}

export default connect(null, mapDispatchToProps)(SignedOut)