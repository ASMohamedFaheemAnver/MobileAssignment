import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicon from "react-native-vector-icons/Ionicons";
import { globalStyles } from "../styles";
import styles from "./styles";

export default function LoginScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={globalStyles.container}>
        <Text style={styles.welcome}>Welcome Back!</Text>
        <Text style={styles.userCategoryTitle}>Who your are?</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.selectedIconContainer}>
            <FontAwesomeIcon size={40} name="user" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectedIconContainer}>
            <FontAwesomeIcon size={40} name="group" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectedIconContainer}>
            <Ionicon size={40} name="settings" />
          </TouchableOpacity>
        </View>
        <TextInput
          style={[globalStyles.textInput, styles.input]}
          // onChangeText={onChangeText}
          placeholder="Enter your email"
          // value={"text"}
        />
        <TextInput
          style={[globalStyles.textInput, styles.input]}
          // onChangeText={onChangeText}
          placeholder="Enter your password"
          secureTextEntry
          // value={"text"}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.singInText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.createAccount}>New here? Create account :)</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}
