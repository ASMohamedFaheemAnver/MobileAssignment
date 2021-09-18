import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { LOGIN_SCREEN_ROUTE_NAME } from "./src/constants/strings";
import store from "./src/redux/store";
import LoginScreen from "./src/screens/loginScreen/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={LOGIN_SCREEN_ROUTE_NAME}
              options={{ headerShown: false }}
              component={LoginScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
