import PropTypes from "prop-types";
import React, { useState } from "react";
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
import { connect } from "react-redux";
import {
  DEVELOPER_CATEGORY,
  MEMBER_CATEGORY,
  SOCIETY_CATEGORY,
} from "../../constants/strings";
import { login } from "../../redux/actions/auth";
import { globalStyles } from "../styles";
import styles from "./styles";

function LoginScreen({ login }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userCategory: MEMBER_CATEGORY,
    isEmailValid: false,
    isPasswordValid: false,
    isFormValid: false,
  });

  const onEmailChange = (e) => {
    setFormData({
      ...formData,
      email: e,
      isEmailValid: true,
      isFormValid: formData.isPasswordValid,
    });
  };

  const onPasswordChange = (e) => {
    setFormData({
      ...formData,
      password: e,
      isPasswordValid: true,
      isFormValid: formData.isEmailValid,
    });
  };

  const changeUserCategory = (userCategory) => {
    setFormData({
      ...formData,
      userCategory,
    });
  };

  const onLoginClick = () => {
    login({ ...formData });
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcome}>Welcome Back!</Text>
        <Text style={styles.userCategoryTitle}>Who your are?</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={
              formData.userCategory == MEMBER_CATEGORY
                ? styles.selectedIconContainer
                : styles.unSelectedIconContainer
            }
            onPress={() => {
              changeUserCategory(MEMBER_CATEGORY);
            }}
          >
            <FontAwesomeIcon size={40} name="user" />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              formData.userCategory == SOCIETY_CATEGORY
                ? styles.selectedIconContainer
                : styles.unSelectedIconContainer
            }
            onPress={() => {
              changeUserCategory(SOCIETY_CATEGORY);
            }}
          >
            <FontAwesomeIcon size={40} name="group" />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              formData.userCategory == DEVELOPER_CATEGORY
                ? styles.selectedIconContainer
                : styles.unSelectedIconContainer
            }
            onPress={() => {
              changeUserCategory(DEVELOPER_CATEGORY);
            }}
          >
            <Ionicon size={40} name="settings" />
          </TouchableOpacity>
        </View>
        <TextInput
          style={[globalStyles.textInput, styles.input]}
          onChangeText={onEmailChange}
          placeholder="Enter your email"
          value={formData.email}
        />
        <TextInput
          style={[globalStyles.textInput, styles.input]}
          onChangeText={onPasswordChange}
          placeholder="Enter your password"
          secureTextEntry
          value={formData.password}
        />
        <TouchableOpacity
          disabled={!formData.isFormValid}
          style={formData.isFormValid ? styles.button : styles.disabledButton}
          onPress={onLoginClick}
        >
          <Text style={styles.singInText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.createAccount}>New here? Create account :)</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

LoginScreen.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(LoginScreen);
