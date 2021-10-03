import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
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
  LOGIN_SCREEN_ROUTE_NAME,
  REGISTRATION_SCREEN_ROUTE_NAME,
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
import RegistrationScreen from './src/screens/registrationScreen/RegistrationScreen';
import SocietySelectionScreen from './src/screens/societySelectionScreen/SocietySelectionScreen';
import SplashScreen from './src/screens/splashScreen/SplashScreen';
import apolloClient from './src/utils/apollo-client';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={SPLASH_SCREEN_ROUTE_NAME}>
              <Stack.Screen
                name={SPLASH_SCREEN_ROUTE_NAME}
                options={{headerShown: false}}
                component={SplashScreen}
              />
              <Stack.Screen
                name={LOGIN_SCREEN_ROUTE_NAME}
                options={{headerShown: false}}
                component={LoginScreen}
              />
              <Stack.Screen
                name={REGISTRATION_SCREEN_ROUTE_NAME}
                options={{headerShown: false}}
                component={RegistrationScreen}
              />
              <Stack.Screen
                name={DASHBOARD}
                options={{headerShown: false}}
                component={DrawerRoutes}
              />
              <Stack.Screen
                name={SELECT_SOCIETY_SCREEN_ROUTE_NAME}
                options={{headerShown: false}}
                component={SocietySelectionScreen}
              />
              <Stack.Screen
                name={ADD_REFINMENT_ROUTE_NAME}
                options={{headerShown: false}}
                component={AddRefinmentScreen}
              />
              <Stack.Screen
                name={ADD_DONATION_ROUTE_NAME}
                options={{headerShown: false}}
                component={AddDonationScreen}
              />
              <Stack.Screen
                name={ADD_OTHER_EXPENSE_ROUTE_NAME}
                options={{headerShown: false}}
                component={AddOtherExpenseScreen}
              />
              <Stack.Screen
                name={ADD_MONTHLY_FEE_ROUTE_NAME}
                options={{headerShown: false}}
                component={AddMonthlyFeeScreen}
              />
              <Stack.Screen
                name={ADD_EXTRA_FEE_ROUTE_NAME}
                options={{headerShown: false}}
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
