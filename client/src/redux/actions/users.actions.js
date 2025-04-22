import { UserActionTypes } from "../types/user.types";
import { getConfig } from "../settings";
import axios from "axios";

// const BASE_URL = "https://pizza-ecommerce-backend-excoccur-gmailcom.vercel.app";
const BASE_URL = "http://localhost:9090";

export const logout = () => async (dispatch) => {
  dispatch({ type: UserActionTypes.LOGIN.RESET });
  localStorage.removeItem("user-login");
};

export const loginUser = (values) => async (dispatch) => {
  try {
    dispatch({
      type: UserActionTypes.LOGIN.REQUEST,
    });
    const { data } = await axios.post(BASE_URL + `/api/users/login`, values);

    const userInfo = {
      _id: data.user.id,
      email: data.user.email,
      name: data.user.name,
      isAdmin: data.user.isAdmin,
      token: data.token,
    };

    dispatch({
      type: UserActionTypes.LOGIN.SUCCESS,
      payload: userInfo,
    });

    localStorage.setItem("user-login", JSON.stringify(userInfo));
  } catch (error) {
    dispatch({
      type: UserActionTypes.LOGIN.ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const registerUser = (values) => async (dispatch) => {
  try {
    dispatch({
      type: UserActionTypes.REGISTER.REQUEST,
    });

    await axios.post(BASE_URL + `/api/users/register`, values);

    dispatch({
      type: UserActionTypes.REGISTER.SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UserActionTypes.REGISTER.ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUsersList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: UserActionTypes.LIST.REQUEST,
    });

    const { data } = await axios.get(
      BASE_URL + `/api/users`,
      getConfig(getState())
    );

    dispatch({
      type: UserActionTypes.LIST.SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UserActionTypes.LIST.ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteUsers = (users) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UserActionTypes.DELETE.REQUEST,
    });

    await axios.post(
      BASE_URL + `/api/users/deleteUsers`,
      users,
      getConfig(getState())
    );

    dispatch({
      type: UserActionTypes.DELETE.SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UserActionTypes.DELETE.ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
