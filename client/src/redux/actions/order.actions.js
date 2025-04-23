import { OrderActionTypes } from "../types/order.types";
import axios from "axios";
import { getConfig } from "../settings";

// const BASE_URL = "https://pizza-ecommerce-backend-excoccur-gmailcom.vercel.app";
const BASE_URL = "http://51.20.92.252:9090";

export const addUserOrder = (values) => async (dispatch) => {
  try {
    dispatch({
      type: OrderActionTypes.ADD_ORDER.REQUEST,
    });
    console.log("values", values);
    await axios.post(BASE_URL + `/api/orders`, values);

    dispatch({
      type: OrderActionTypes.ADD_ORDER.SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ADD_ORDER.ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserOrders = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: OrderActionTypes.USER_ORDERS_LIST.REQUEST,
    });

    const { data } = await axios.post(BASE_URL + `/api/orders/user/${userId}`);

    dispatch({
      type: OrderActionTypes.USER_ORDERS_LIST.SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OrderActionTypes.USER_ORDERS_LIST.ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getOrdersList = () => async (dispatch) => {
  try {
    dispatch({
      type: OrderActionTypes.LIST.REQUEST,
    });

    const { data } = await axios.get(BASE_URL + `/api/orders`);

    dispatch({
      type: OrderActionTypes.LIST.SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OrderActionTypes.LIST.ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OrderActionTypes.EDIT.REQUEST,
    });

    await axios.put(BASE_URL + `/api/orders/${id}`, {}, getConfig(getState()));

    dispatch({
      type: OrderActionTypes.EDIT.SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: OrderActionTypes.EDIT.ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
