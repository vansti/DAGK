import React, { Component } from 'react';
import ListMessages from './ListMessages';
import { connect } from 'react-redux';

class ChatContent extends Component {
    
    render() {
        if(this.props.chatingUser == null){
            return '';
        }
        return (
            <div className="content">
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