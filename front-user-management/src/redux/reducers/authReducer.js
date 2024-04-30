import { USER_IS_LOGIN } from "../../utils/constants";
import {
  LOGIN_FAILURE,
  LOGIN_LOGOUT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../types/authTypes";

const initialState = {
  isLoggin: localStorage.getItem(USER_IS_LOGIN) ? true : false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggin: false,
      };
    case LOGIN_SUCCESS:
      console.log(action.payload.data)
      localStorage.setItem(USER_IS_LOGIN, action.payload.token);
      window.location.reload();
      return {
        ...state,
        isLoggin: true,
      };
    case LOGIN_FAILURE:
      localStorage.removeItem(USER_IS_LOGIN);
      return {
        ...state,
        isLoggin: false,
        error: action.payload.error,
      };
    case LOGIN_LOGOUT:
      localStorage.removeItem(USER_IS_LOGIN);
      window.location.reload();
      return {
        ...state,
        isLoggin: false,
      };

    default:
      return state;
  }
};
