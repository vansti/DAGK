let initialState = '';

const currentChat = (state = initialState, action) => {
    switch (action.type) {
        case 'CHAT_WITH_USER':
            return action.id;
            
        default: return state;
    }
}

export default currentChat;