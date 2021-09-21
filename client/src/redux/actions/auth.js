import { gql } from "@apollo/client";
import apolloClient from "../../utils/apollo-client";

export const login =
  ({ email, password, userCategory }) =>
  async (dispatch) => {
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
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
