import { firestore } from "firebase";
import { ggAuth } from "../../config/fbConfig";


export const signIn = (callback) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        firebase.auth().signInWithPopup(ggAuth).then((res) => {
            dispatch({ type: 'LOGIN_SUCCESS' });
            localStorage.setItem('login', 'logged');
            const user = res.user;
            const item = {
                username: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                online: true,
                lastSignInTime: null,
                uid: user.W.O
            }
            firestore.get({ collection: 'users', where: [['email', '==', user.email]] }).then((data) => {
                if (data.docs.length == 0) {
                    firestore.collection('users').add({
                        ...item
                    }).then(() => {
                        callback(user.W.O);
                        dispatch({ type: "SIGNIN_SUCCESS", item });
                    })
                } else {
                    const id = data.docs[0].id;
                    firestore.update({ collection: 'users', doc: id }, { ...item }).then(() => {
                        dispatch({ type: "SIGNIN_SUCCESS", item });
                    })
                }
            }).catch((err) => {
                dispatch({ type: 'LOGIN_FAIL' });
            })
        })
    }
};

export const signOut = (callback) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = getState().firebase.auth;
        console.log(getState().firebase.auth);
        firestore.get({ collection: 'users', where: [['email', '==', user.email]] }).then((res) => {
            if (res.docs.length > 0) {
                const id = res.docs[0].id;
                const itemUpdate = {
                    lastSignInTime: new Date(),
                    online: false
                }
                dispatch({type: 'CLEAR_CHATING_USER'});
                localStorage.setItem('login', 'unlogged');
                callback();
                firestore.update({ collection: 'users', doc: id }, itemUpdate).then(() => {
                    firebase.auth().signOut().then(() => {
                        dispatch({ type: 'SIGNOUT_SUCCESS' });
                    })
                })
            }
        })
    }
};

export const test = () => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        console.log(firestore.update);
        firestore.collection('users').get().then((querySnapshot) => {
            querySnapshot.docs.forEach((item) => {              
            })
        })
    }
};