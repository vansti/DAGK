import { firestore } from "firebase";

export const getDataUser = (id) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        firestore.get({ collection: 'users', where: [['uid', '==', id]] }).then((res) => {
            // console.log(res.docs[0].data());
            const chatingUser = res.docs[0].data();
            dispatch(
                {
                    type: 'ADD_CHATING_USER',
                    user: chatingUser
                }
            );
        });
    }
};
