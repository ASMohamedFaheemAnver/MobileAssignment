import {ApolloProvider} from '@apollo/client';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import 'react-native-gesture-handler';
import {ModalPortal} from 'react-native-modals';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {
  DASHBOARD,
  DEVELOPER_DASHBOARD,
  LOGIN_SCREEN_ROUTE_NAME,
  REGISTRATION_SCREEN_ROUTE_NAME,
  SELECT_SOCIETY_SCREEN_ROUTE_NAME,
  SPLASH_SCREEN_ROUTE_NAME,
} from './src/constants/strings';
import store from './src/redux/store';
import DeveloperHomeScreen from './src/screens/developerHomeScreen/DeveloperHomeScreen';
import LoginScreen from './src/screens/loginScreen/LoginScreen';
import RegistrationScreen from './src/screens/registrationScreen/RegistrationScreen';
import SocietySelectionScreen from './src/screens/societySelectionScreen/SocietySelectionScreen';
import SplashScreen from './src/screens/splashScreen/SplashScreen';
import apolloClient from './src/utils/apollo-client';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName={DEVELOPER_DASHBOARD}>
      <Drawer.Screen
        name={DEVELOPER_DASHBOARD}
        component={DeveloperHomeScreen}
      />
    </Drawer.Navigator>
  );
}

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
            </Stack.Navigator>
          </NavigationContainer>
          <ModalPortal />
        </Provider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

export default App;
