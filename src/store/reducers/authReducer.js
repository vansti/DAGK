const initState = {
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case "SIGNIN_SUCCESS":
      console.log('sign in success', action.user);
      return {
        ...action.user
      };
    case 'SIGNOUT_SUCCESS':
      return {};
    default:
      return state;
  }
};

export default authReducer;