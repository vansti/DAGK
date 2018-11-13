import { firestore } from "firebase";
var randomstring = require("randomstring");


export const sendMessage = (message) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();

        firestore.get({ collection: 'messages', where: [['idSum', '==', message.idSum]] }).then((res) => {
            let findMessageResult = res.docs;
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
                let messages = findMessageResult[0].data().messages;
                messages.push(message.message);
                const id = findMessageResult[0].id;
                firestore.update({ collection: 'messages', doc: id }, { messages }).then(() => {
                    console.log('add message');
                })
            }
        })
    }
};