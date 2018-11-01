export const signIn = () => {
    return (dispatch, getState, {
        getFirebase
    }) => {
        const firebase = getFirebase();
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider)
            .then(() => {
                dispatch({
                    type: 'LOGIN_SUCCESS'
                });
            }).catch((err) => {
                dispatch({
                    type: 'LOGIN_ERROR',
                    err
                });
            });

    }
}

export const signOut = () => {
    return (dispatch, getState, {
        getFirebase
    }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({
                type: 'SIGNOUT_SUCCESS'
            })
        });
    }
}