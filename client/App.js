import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import {
  DEVELOPER_HOME_SCREEN_ROUTE_NAME,
  LOGIN_SCREEN_ROUTE_NAME,
  REGISTRATION_SCREEN_ROUTE_NAME,
  SPLASH_SCREEN_ROUTE_NAME,
} from "./src/constants/strings";
import store from "./src/redux/store";
import DeveloperHomeScreen from "./src/screens/developerHomeScreen/DeveloperHomeScreen";
import LoginScreen from "./src/screens/loginScreen/LoginScreen";
import RegistrationScreen from "./src/screens/registrationScreen/RegistrationScreen";
import SplashScreen from "./src/screens/splashScreen/SplashScreen";
import apolloClient from "./src/utils/apollo-client";

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
                options={{ headerShown: false }}
                component={SplashScreen}
              />
              <Stack.Screen
                name={LOGIN_SCREEN_ROUTE_NAME}
                options={{ headerShown: false }}
                component={LoginScreen}
              />
              <Stack.Screen
                name={REGISTRATION_SCREEN_ROUTE_NAME}
                options={{ headerShown: false }}
                component={RegistrationScreen}
              />
              <Stack.Screen
                name={DEVELOPER_HOME_SCREEN_ROUTE_NAME}
                options={{ headerShown: false }}
                component={DeveloperHomeScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

export default App;
