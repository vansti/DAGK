import { firestore } from "firebase";
import _ from 'lodash';


export const updatePriority = (priorityUser) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        let receive = firestore.get({ collection: 'users', where: [['uid', '==', priorityUser.idReceiver]] });
        let send = firestore.get({ collection: 'users', where: [['uid', '==', priorityUser.idSender]] });
        Promise.all([send, receive]).then(([pSend, pReceive]) => {
            const findSendUser = pSend.docs;
            const findReceiveUser = pReceive.docs;
            if (findSendUser.length > 0 && findReceiveUser.length > 0) {
                let prioritySender = findSendUser[0].data().priority;
                if (priorityUser.timeChat) {
                    const itemSender = {
                        idUser: priorityUser.idReceiver,
                        timeChat: priorityUser.timeChat
                    }
                    if (!prioritySender) {
                        prioritySender = [itemSender];
                    } else {
                        const index = _.findIndex(prioritySender, { 'idUser': itemSender.idUser });
                        if (index !== -1) {
                            prioritySender[index].timeChat = itemSender.timeChat;
                        } else {
                            prioritySender.push(itemSender);
                        }
                    }

                    let priorityReceiver = findReceiveUser[0].data().priority;
                    const itemReceiver = {
                        idUser: priorityUser.idSender,
                        timeChat: priorityUser.timeChat
                    }
                    if (!priorityReceiver) {
                        priorityReceiver = [itemReceiver];
                    } else {
                        const index = _.findIndex(priorityReceiver, { 'idUser': itemReceiver.idUser });
                        if (index !== -1) {
                            priorityReceiver[index].timeChat = itemReceiver.timeChat;
                        } else {
                            priorityReceiver.push(itemReceiver);
                        }
                    }

                    const idS = findSendUser[0].id;
                    const idR = findReceiveUser[0].id;

                    let updateSender = firestore.update({ collection: 'users', doc: idS }, { priority: prioritySender });
                    let updateReceiver = firestore.update({ collection: 'users', doc: idR }, { priority: priorityReceiver });
                    Promise.all([updateSender, updateReceiver]).then(() => {
                        console.log('update user');
                    })
                }

                if (priorityUser.updateStar) {
                    const itemStar = {
                        idUser: priorityUser.idReceiver,
                        star: priorityUser.star
                    }
                    if (!prioritySender) {
                        prioritySender = [itemStar];
                    } else {
                        const index = _.findIndex(prioritySender, { 'idUser': itemStar.idUser });
                        if (index !== -1) {
                            prioritySender[index].star = itemStar.star;
                        } else {
                            prioritySender.push(itemStar);
                        }
                    }
                    const id = findSendUser[0].id;
                    firestore.update({ collection: 'users', doc: id }, { priority: prioritySender }).then(() => {
                        console.log('update star user');
                    })
                }
            }
        })
    }
};