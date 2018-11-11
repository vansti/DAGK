import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirestore, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import {sendMessage} from './../store/actions/messageActions';
import { updatePriority } from './../store/actions/userActions';

class SendMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            idReceiver: '',
            image: '',
            url: '',
            previewURL: [],
            images: []
        }
    }

    componentDidMount() {
        this.setState({
            idReceiver: this.props.match.params.id
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            idReceiver: nextProps.match.params.id
        })
    }

    onHandleChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    }

    onHandleSubmit = (e) => {
        e.preventDefault();
        const idSender = this.props.auth.uid;
        const idReceiver = this.state.idReceiver;
        const idSum = idSender > idReceiver ? (idSender + idReceiver) : (idReceiver + idSender);
        const message = {
            idSender: idSender,
            idReceiver: idReceiver,
            idSum: idSum,
            message: {
                text: this.state.message,
                images: this.state.images,
                idSender: idSender,
                photoURL: this.props.auth.photoURL,
                time: new Date()
            }
        }
        const priorityUser = {
            idSender: idSender,
            idReceiver: idReceiver,
            timeChat: new Date
        }
        if (this.state.message !== '' || this.state.images.length > 0) {
            this.props.sendMessage(message);
            this.props.updatePriority(priorityUser);
            this.setState({
                message: '',
                image: '',
                images: [],
                previewURL: []
            })
        }
    }

    onHandleLoadImage = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            if (file) {
                this.setState({
                    image: file,
                    reset: true,
                    previewURL: [...this.state.previewURL, reader.result],
                    images: [...this.state.images, file]
                }, () => {
                    this.setState({
                        reset: false
                    })
                });
            }
        }
        reader.readAsDataURL(file);
    }

    onDeletePreview = (index) => {
        let previewImg = this.state.previewURL;
        let images = this.state.images;
        images.splice(index, 1);
        previewImg.splice(index, 1);
        this.setState({
            previewURL: previewImg
        })
    }
    
    handleKeyPress = (event) => {
        if(event.key == 'Enter'){
          this.onHandleSubmit(event);
        }
    }

    render() {
        let value = this.state.message;
        return (
            <div className="type_msg">  
                <div className="input_msg_write">
                    <input type="text" name="message" onChange={this.onHandleChange}  className="write_msg" value={value} placeholder="Type a message" onKeyPress={this.handleKeyPress}/>
                    <button onClick={this.onHandleSubmit} className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                </div>
            </div>
        );
    }
}

// export default SendMessage;
const mapStateToProps = (state) => {
    return {
        chatingUser: state.chatingUser,
        users: state.firestore.data.users,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (message) => dispatch(sendMessage(message)),
        updatePriority: (priorityUser) => dispatch(updatePriority(priorityUser))
    }
}


export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(SendMessage))