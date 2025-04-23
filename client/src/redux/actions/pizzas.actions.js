import { PizzaActionTypes } from "../types/pizzas.types";
import axios from "axios";
import { getConfig } from "../settings";

//const BASE_URL = "https://pizza-ecommerce-backend-excoccur-gmailcom.vercel.app";
const BASE_URL = "http://51.20.92.252:9090";

export const getPizzasList =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: PizzaActionTypes.PIZZAS_LIST.REQUEST,
      });

      const { data } = await axios.get(
        BASE_URL + `/api/pizzas/getPizzas/${keyword}`
      );

      dispatch({
        type: PizzaActionTypes.PIZZAS_LIST.SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PizzaActionTypes.PIZZAS_LIST.ERROR,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const addPizza = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PizzaActionTypes.ADD.REQUEST,
    });

    // Note: don't set Content-Type header when sending FormData
    const config = {
      headers: {
        Authorization: `Bearer ${getState().users.login.user_login.token}`,
      },
    };

    const res = await axios.post(BASE_URL + `/api/pizzas/`, formData, config);
    console.log("res", res);

    dispatch({
      type: PizzaActionTypes.ADD.SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PizzaActionTypes.ADD.ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deletePizzas = (values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PizzaActionTypes.DELETE.REQUEST,
    });

    await axios.post(
      BASE_URL + `/api/pizzas/deletePizzas`,
      values,
      getConfig(getState())
    );

    dispatch({
      type: PizzaActionTypes.DELETE.SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PizzaActionTypes.DELETE.ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getPizzaDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PizzaActionTypes.DETAILS.REQUEST,
    });

    const { data } = await axios.get(
      BASE_URL + `/api/pizzas/${id}`,
      getConfig(getState())
    );

    dispatch({
      type: PizzaActionTypes.DETAILS.SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PizzaActionTypes.DETAILS.ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editPizza = (id, formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PizzaActionTypes.EDIT.REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().users.login.user_login.token}`,
      },
    };

    await axios.put(BASE_URL + `/api/pizzas/edit/${id}`, formData, config);

    dispatch({
      type: PizzaActionTypes.EDIT.SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PizzaActionTypes.EDIT.ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
