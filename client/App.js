import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {ModalPortal} from 'react-native-modals';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {
  ADD_DONATION_ROUTE_NAME,
  ADD_EXTRA_FEE_ROUTE_NAME,
  ADD_MONTHLY_FEE_ROUTE_NAME,
  ADD_OTHER_EXPENSE_ROUTE_NAME,
  ADD_REFINMENT_ROUTE_NAME,
  DASHBOARD,
  DEEP_LINK_PREFIX,
  DEFAULT_CODE,
  EDIT_ROUTE_CODE,
  EDIT_TRACK_ROUTE_NAME,
  EMPTY_TEXT,
  LOGIN_SCREEN_ROUTE_NAME,
  REGISTRATION_SCREEN_ROUTE_NAME,
  REQUEST_RESET_PASSWORD,
  RESET_PASSWORD_ROUTE_NAME,
  SELECT_SOCIETY_SCREEN_ROUTE_NAME,
  SPLASH_SCREEN_ROUTE_NAME,
} from './src/constants/strings';
import store from './src/redux/store';
import DrawerRoutes from './src/routes/DrawerRoutes';
import AddDonationScreen from './src/screens/addDonationScreen/AddDonationScreen';
import AddExtraFeeScreen from './src/screens/addExtraFeeScreen/AddExtraFeeScreen';
import AddMonthlyFeeScreen from './src/screens/addMonthlyFeeScreen/AddMonthlyFeeScreen';
import AddOtherExpenseScreen from './src/screens/addOtherExpenseScreen/AddOtherExpenseScreen';
import AddRefinmentScreen from './src/screens/addRefinmentScreen/AddRefinmentScreen';
import LoginScreen from './src/screens/loginScreen/LoginScreen';
import MemberTrackListScreen from './src/screens/memberTrackListScreen/MemberTrackListScreen';
import RegistrationScreen from './src/screens/registrationScreen/RegistrationScreen';
import SocietySelectionScreen from './src/screens/societySelectionScreen/SocietySelectionScreen';
import SplashScreen from './src/screens/splashScreen/SplashScreen';
import ResetPasswordScreen from './src/screens/resetPasswordScreen/ResetPasswordScreen';
import apolloClient from './src/utils/apollo-client';
import RequestPasswordResetScreen from './src/screens/requestPasswordResetScreen/RequestPasswordResetScreen';
import {IconButton} from 'react-native-paper';

const Stack = createNativeStackNavigator();

const linkingConfig = {
  screens: {
    RESET_PASSWORD_ROUTE_NAME: {
      path: `${RESET_PASSWORD_ROUTE_NAME}`,
    },
  },
};

const deepLinking = {
  prefixes: [DEEP_LINK_PREFIX],
  linkingConfig,
};

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer linking={deepLinking}>
            <Stack.Navigator initialRouteName={SPLASH_SCREEN_ROUTE_NAME}>
              <Stack.Screen
                name={SPLASH_SCREEN_ROUTE_NAME}
                options={{headerShown: false}}
                component={SplashScreen}
              />
              <Stack.Screen
                name={RESET_PASSWORD_ROUTE_NAME}
                options={{headerShown: false}}
                component={ResetPasswordScreen}
              />
              <Stack.Screen
                name={REQUEST_RESET_PASSWORD}
                options={{title: EMPTY_TEXT}}
                component={RequestPasswordResetScreen}
              />
              <Stack.Screen
                name={LOGIN_SCREEN_ROUTE_NAME}
                options={{headerShown: false}}
                component={LoginScreen}
              />
              <Stack.Screen
                name={REGISTRATION_SCREEN_ROUTE_NAME}
                options={{title: EMPTY_TEXT}}
                component={RegistrationScreen}
              />
              <Stack.Screen
                name={DASHBOARD}
                options={{headerShown: false}}
                component={DrawerRoutes}
              />
              <Stack.Screen
                name={SELECT_SOCIETY_SCREEN_ROUTE_NAME}
                options={{title: EMPTY_TEXT}}
                component={SocietySelectionScreen}
              />
              <Stack.Screen
                name={ADD_REFINMENT_ROUTE_NAME}
                options={{title: EMPTY_TEXT}}
                component={AddRefinmentScreen}
              />
              <Stack.Screen
                name={ADD_DONATION_ROUTE_NAME}
                options={{title: EMPTY_TEXT}}
                component={AddDonationScreen}
              />
              <Stack.Screen
                name={EDIT_TRACK_ROUTE_NAME}
                initialParams={{editRouteCode: DEFAULT_CODE}}
                options={({navigation}) => ({
                  title: EMPTY_TEXT,
                  headerRight: () => {
                    return (
                      <IconButton
                        color="green"
                        onPress={() => {
                          navigation.setParams({
                            editRouteCode: EDIT_ROUTE_CODE,
                          });
                        }}
                        icon="file-edit"
                      />
                    );
                  },
                })}
                component={MemberTrackListScreen}
              />
              <Stack.Screen
                name={ADD_OTHER_EXPENSE_ROUTE_NAME}
                options={{title: EMPTY_TEXT}}
                component={AddOtherExpenseScreen}
              />
              <Stack.Screen
                name={ADD_MONTHLY_FEE_ROUTE_NAME}
                options={{title: EMPTY_TEXT}}
                component={AddMonthlyFeeScreen}
              />
              <Stack.Screen
                name={ADD_EXTRA_FEE_ROUTE_NAME}
                options={{title: EMPTY_TEXT}}
                component={AddExtraFeeScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <ModalPortal />
        </Provider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

export default App;
