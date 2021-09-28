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
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_META_LOADED,
  USER_META_NOT_FOUND,
} from './types';

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
      // console.log(e);
      dispatch({type: LOGIN_FAIL});
    }
  };

export const register =
  ({email, password, userCategory, address, image, phoneNumber}) =>
  async dispatch => {
    // dispatch({
    //   type: API_CALL_TRIGGERED,
    // });
    let mutation;
    if (userCategory === MEMBER_CATEGORY) {
      mutation = gql`
        mutation createMember($email: String!, $password: String!) {
          createMember(email: $email, password: $password) {
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
          $image: Upload!
          $phoneNumber: String!
        ) {
          createSociety(
            societyInput: {
              email: $email
              password: $password
              address: $address
              image: $image
              name: ""
              phoneNumber: $phoneNumber
            }
          ) {
            _id
          }
        }
      `;
    }
    try {
      const imageFile = new ReactNativeFile({...image});
      console.log(imageFile);
      const res = await apolloClient.mutate({
        mutation: mutation,
        variables: {
          email,
          password,
          address,
          image: imageFile,
          phoneNumber,
        },
      });

      console.log(res);

      dispatch({type: REGISTER_SUCCESS});
    } catch (e) {
      // console.log(e);
      dispatch({type: REGISTER_FAIL});
    }
  };

export const loadUserMetaData = () => async dispatch => {
  try {
    await AsyncStorage.clear();
    const token = await AsyncStorage.getItem('token');
    const expiresIn = new Date(await AsyncStorage.getItem('expiresIn'));
    const userCategory = await AsyncStorage.getItem('userCategory');

    // console.log(expiresIn);
    // console.log(new Date());
    // console.log(expiresIn - new Date());

    if (token && expiresIn && userCategory) {
      dispatch({
        type: USER_META_LOADED,
        payload: {token, expiresIn, userCategory},
      });
    }
    dispatch({
      type: USER_META_NOT_FOUND,
    });
  } catch (e) {}
};
