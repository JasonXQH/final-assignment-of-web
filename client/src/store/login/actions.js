import { USER_LOGIN, GET_USER_INFO } from './action-type';
import Util from '../../js/Util';
import Api from '../../js/Api';

const actionUserLoginCreator = (type, data) => {
  const { name } = data;
  return {
    type,
    data: {
      isLogin: true, // 是否登录
      name,
    },
  };
};

export const userLogin = (params) => {
  return (dispatch) => {
    return Api.post('/users/login', params).then((res) => {
      if (res.data) {
        Util.setToken(res.data.token);
        dispatch(actionUserLoginCreator(USER_LOGIN, { name: res.data.name }));
      }
    });
  };
};

export const getUserInfo = () => {
  const token = Util.getToken();
  return (dispatch) => {
    if (token) {
      return Api.get('/users/info', {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        if (res.data.data.name) {
          dispatch(actionUserLoginCreator(GET_USER_INFO, { name: res.data.data.name }));
        }
      });
    } else {
      dispatch({
        type: GET_USER_INFO,
        data: {
          isLogin: false,
          name: null,
        },
      });
    }
  };
};
