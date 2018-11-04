import authReducer from './authReducer';
import {combineReducers } from 'redux';
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';
import currentChat from './currentChat';
import chatingUserReducer from './chatingUserReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  currentChat: currentChat,
  chatingUser: chatingUserReducer
});

export default rootReducer
