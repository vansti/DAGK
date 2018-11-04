import { firestore } from "firebase";


export const sendMessage = (message) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        let query2 = firestore.get({ collection: 'messages', where: [['idSum', '==', message.idSum]] }).then((res) => {
            if (res.docs.length == 0) {
                firestore.collection('messages').add({
                    idSender: message.idSender,
                    idReceiver: message.idReceiver,
                    idSum: message.idSum,
                    messages: [
                        message.message
                    ]
                });
            } else {
                // console.log(res.docs[0].data().message);
                let messages = res.docs[0].data().messages;
                messages.push(message.message);
                const id = res.docs[0].id;
                firestore.update({ collection: 'messages', doc: id }, { messages }).then(() => {
                    console.log('add message');
                })
            }
        })
    }
};