import { gql } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apolloClient from "../../utils/apollo-client";
import {
  API_CALL_TRIGGERED,
  LOGIN_FAIL,
  USER_META_LOADED,
  USER_META_NOT_FOUND,
} from "./types";

export const login =
  ({ email, password, userCategory }) =>
  async (dispatch) => {
    dispatch({
      type: API_CALL_TRIGGERED,
    });
    try {
      const res = await apolloClient.query({
        query: gql`
          query loginDeveloper($email: String!, $password: String!) {
            loginDeveloper(email: $email, password: $password) {
              _id
              token
              expiresIn
            }
          }
        `,
        variables: { email, password },
      });
      // console.log(res.data?.loginDeveloper);
      await AsyncStorage.setItem("token", res.data?.loginDeveloper?.token);
      await AsyncStorage.setItem(
        "expiresIn",
        new Date(
          new Date().getTime() + res.data?.loginDeveloper?.expiresIn * 1000
        ).toISOString()
      );
      await AsyncStorage.setItem("userCategory", userCategory);
      dispatch(loadUserMetaData());
    } catch (e) {
      console.log(e);
      dispatch({ type: LOGIN_FAIL });
    }
  };

export const loadUserMetaData = () => async (dispatch) => {
  try {
    // await AsyncStorage.clear();
    const token = await AsyncStorage.getItem("token");
    const expiresIn = new Date(await AsyncStorage.getItem("expiresIn"));
    const userCategory = await AsyncStorage.getItem("userCategory");

    // console.log(expiresIn);
    // console.log(new Date());
    // console.log(expiresIn - new Date());

    if (token && expiresIn && userCategory) {
      dispatch({
        type: USER_META_LOADED,
        payload: { token, expiresIn, userCategory },
      });
    }
    dispatch({
      type: USER_META_NOT_FOUND,
    });
  } catch (e) {}
};
