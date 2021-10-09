import {gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ReactNativeFile} from 'apollo-upload-client';
import {
  DEVELOPER_CATEGORY,
  MEMBER_CATEGORY,
  SOCIETY_CATEGORY,
} from '../../constants/strings';
import apolloClient from '../../utils/apollo-client';
import {
  API_CALL_TRIGGERED,
  BASIC_SOCIETY_INFO_LOADED,
  LOGIN_FAIL,
  PASSWORD_RESET_COMPLETED,
  PASSWORD_RESET_REQUESTED,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  RESET_PASSWORD_RESET_REQUESTED_STATE,
  RESET_PASSWORD__STATE,
  RESET_REGISTER_STATE,
  SET_ALERT,
  SOCIETY_SELECTED,
  USER_LOGGED_OUT,
  USER_META_LOADED,
  USER_META_NOT_FOUND,
} from './types';

let logOutTrigger;

export const login =
  ({email, password, userCategory}) =>
  async dispatch => {
    dispatch({
      type: API_CALL_TRIGGERED,
    });
    let query;
    if (userCategory === DEVELOPER_CATEGORY) {
      query = gql`
        query loginDeveloper($email: String!, $password: String!) {
          loginDeveloper(email: $email, password: $password) {
            _id
            token
            expiresIn
          }
        }
      `;
    } else if (userCategory === SOCIETY_CATEGORY) {
      query = gql`
        query loginSociety($email: String!, $password: String!) {
          loginSociety(email: $email, password: $password) {
            _id
            token
            expiresIn
          }
        }
      `;
    } else {
      query = gql`
        query loginMember($email: String!, $password: String!) {
          loginMember(email: $email, password: $password) {
            _id
            token
            expiresIn
          }
        }
      `;
    }

    try {
      const res = await apolloClient.query({
        query: query,
        variables: {email, password},
      });
      let data;
      if (userCategory === DEVELOPER_CATEGORY) {
        data = res.data?.loginDeveloper;
      } else if (userCategory === SOCIETY_CATEGORY) {
        data = res.data?.loginSociety;
      } else {
        data = res.data?.loginMember;
      }
      // console.log(res.data?.loginDeveloper);
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem(
        'expiresIn',
        new Date(new Date().getTime() + data.expiresIn * 1000).toISOString(),
      );
      await AsyncStorage.setItem('userCategory', userCategory);
      dispatch(loadUserMetaData());
    } catch (e) {
      dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
      dispatch({type: LOGIN_FAIL});
    }
  };

export const resetRegisterState = () => async dispatch => {
  dispatch(RESET_REGISTER_STATE);
};
export const register =
  ({
    email,
    password,
    userCategory,
    address,
    image,
    phoneNumber,
    name,
    selectedSociety,
  }) =>
  async dispatch => {
    dispatch({
      type: API_CALL_TRIGGERED,
    });
    let mutation;
    if (userCategory === MEMBER_CATEGORY) {
      mutation = gql`
        mutation createMember(
          $email: String!
          $password: String!
          $name: String!
          $image: Upload
          $address: String!
          $societyId: String!
          $phoneNumber: String!
        ) {
          createMember(
            memberInput: {
              email: $email
              password: $password
              name: $name
              image: $image
              address: $address
              societyId: $societyId
              phoneNumber: $phoneNumber
            }
          ) {
            _id
          }
        }
      `;
    } else {
      mutation = gql`
        mutation createSociety(
          $email: String!
          $password: String!
          $address: String!
          $image: Upload
          $phoneNumber: String!
          $name: String!
        ) {
          createSociety(
            societyInput: {
              email: $email
              password: $password
              address: $address
              image: $image
              name: $name
              phoneNumber: $phoneNumber
            }
          ) {
            _id
          }
        }
      `;
    }
    try {
      const imageFile = image?.uri ? new ReactNativeFile({...image}) : null;
      const res = await apolloClient.mutate({
        mutation: mutation,
        variables: {
          email,
          password,
          address,
          image: imageFile,
          phoneNumber,
          name,
          societyId: selectedSociety?._id,
        },
      });
      console.log({res});
      dispatch({type: REGISTER_SUCCESS});
    } catch (e) {
      // console.log(e);
      dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
      dispatch({type: REGISTER_FAIL});
    }
  };

export const requestPasswordReset =
  ({email, userCategory}) =>
  async dispatch => {
    dispatch({
      type: API_CALL_TRIGGERED,
    });
    let mutation;
    if (userCategory === MEMBER_CATEGORY) {
      mutation = gql`
        mutation requestMemberPasswordReset($email: String!) {
          requestMemberPasswordReset(email: $email) {
            message
          }
        }
      `;
    } else {
      mutation = gql`
        mutation requestSocietyPasswordReset($email: String!) {
          requestSocietyPasswordReset(email: $email) {
            message
          }
        }
      `;
    }
    try {
      const res = await apolloClient.mutate({
        mutation: mutation,
        variables: {
          email,
        },
      });
      dispatch({
        type: PASSWORD_RESET_REQUESTED,
      });
    } catch (e) {
      dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
    }
  };

export const onPasswordReset =
  (password, token, userCategory) => async dispatch => {
    // dispatch({
    //   type: API_CALL_TRIGGERED,
    // });

    console.log({password, token, userCategory});

    let mutation;
    if (userCategory === MEMBER_CATEGORY) {
      mutation = gql`
        mutation memberPasswordReset($password: String!, $token: String!) {
          memberPasswordReset(password: $password, token: $token) {
            message
          }
        }
      `;
    } else {
      mutation = gql`
        mutation societyPasswordReset($password: String!, $token: String!) {
          societyPasswordReset(password: $password, token: $token) {
            message
          }
        }
      `;
    }
    try {
      const res = await apolloClient.mutate({
        mutation: mutation,
        variables: {
          password,
          token,
        },
      });
      console.log({res});
      dispatch({
        type: PASSWORD_RESET_COMPLETED,
      });
    } catch (e) {
      dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
    }
  };

export const setSelectedSociety = society => dispatch => {
  dispatch({type: SOCIETY_SELECTED, payload: society});
};

export const getBasicSocietyDetailes = _ => async dispatch => {
  dispatch({
    type: API_CALL_TRIGGERED,
  });
  const query = gql`
    query getBasicSocietyDetailes {
      getBasicSocietyDetailes {
        _id
        name
      }
    }
  `;
  try {
    const res = await apolloClient.query({
      query: query,
    });
    // console.log({res});

    dispatch({
      type: BASIC_SOCIETY_INFO_LOADED,
      payload: res.data?.getBasicSocietyDetailes,
    });
  } catch (e) {
    // console.log(e);
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};

export const loadUserMetaData = () => async dispatch => {
  try {
    // await AsyncStorage.clear();
    const token = await AsyncStorage.getItem('token');
    const expiresIn = new Date(await AsyncStorage.getItem('expiresIn'));
    const userCategory = await AsyncStorage.getItem('userCategory');

    // console.log(expiresIn);
    // console.log({userCategory});
    // console.log(new Date());
    // console.log(expiresIn - new Date());
    if (token && expiresIn && userCategory) {
      const logOutIn = expiresIn - new Date();
      logOutTrigger = setTimeout(
        () => {
          dispatch(logOut());
        },
        logOutIn < 0 ? 0 : logOutIn,
      );
      return dispatch({
        type: USER_META_LOADED,
        payload: {token, expiresIn, userCategory},
      });
    }
    dispatch({
      type: USER_META_NOT_FOUND,
    });
  } catch (e) {
    console.log(e);
  }
};

export const logOut = () => async dispatch => {
  clearTimeout(logOutTrigger);
  dispatch({type: USER_LOGGED_OUT});
  await AsyncStorage.clear();
};

export const resetPasswordRequestState = () => async dispatch => {
  dispatch({type: RESET_PASSWORD_RESET_REQUESTED_STATE});
};

export const resetPasswordResetRequestState = () => async dispatch => {
  dispatch({type: RESET_PASSWORD__STATE});
};
