import React, { Component } from 'react';
import ListMessages from './ListMessages';
import { connect } from 'react-redux';
import ContactProfile from './ContactProfile';

class ChatContent extends Component {
    
    render() {
        if(this.props.chatingUser == null){
            return '';
        }
        return (
            <div className="content">
                <ContactProfile/>
                <ListMessages />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chatingUser: state.chatingUser
    }
}

export default connect(mapStateToProps, null)(ChatContent);