import { USER_LOGIN, GET_USER_INFO } from './action-type';
const initState = {
  data: {
    isLogin: false, // 是否登录
    username: null,
  },
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        data: action.data,
      };
    case GET_USER_INFO:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
