import * as ImagePicker from "expo-image-picker";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import defaultAvatar from "../../../assets/default-avatar.jpg";
import {
  DEVELOPER_HOME_SCREEN_ROUTE_NAME,
  MEMBER_CATEGORY,
  SOCIETY_CATEGORY,
} from "../../constants/strings";
import { register } from "../../redux/actions/auth";
import { globalStyles } from "../styles";
import styles from "./styles";

function RegistrationScreen({
  register,
  isAuthenticated,
  isLoading,
  navigation,
}) {
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: DEVELOPER_HOME_SCREEN_ROUTE_NAME }],
      });
    }
  }, [navigation, isAuthenticated, isLoading]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    userCategory: MEMBER_CATEGORY,
    isEmailValid: false,
    isPhoneNumberValid: false,
    isAddressValid: false,
    isPasswordValid: false,
    isFormValid: false,
    image: null,
  });

  const onEmailChange = (e) => {
    setFormData({
      ...formData,
      email: e,
      isEmailValid: true,
      isFormValid:
        formData.isPasswordValid &&
        formData.isPhoneNumberValid &&
        formData.isAddressValid,
    });
  };

  const onPhoneNumberChange = (e) => {
    setFormData({
      ...formData,
      phoneNumber: e,
      isPhoneNumberValid: true,
      isFormValid:
        formData.isPasswordValid &&
        formData.isEmailValid &&
        formData.isAddressValid,
    });
  };

  const onAddressChange = (e) => {
    setFormData({
      ...formData,
      address: e,
      isAddressValid: true,
      isFormValid:
        formData.isPasswordValid &&
        formData.isEmailValid &&
        formData.isPhoneNumberValid,
    });
  };

  const onPasswordChange = (e) => {
    setFormData({
      ...formData,
      password: e,
      isPasswordValid: true,
      isFormValid:
        formData.isPhoneNumberValid &&
        formData.isEmailValid &&
        formData.isAddressValid,
    });
  };

  const changeUserCategory = (userCategory) => {
    setFormData({
      ...formData,
      userCategory,
    });
  };

  const onRegisterClick = () => {
    register({ ...formData });
  };

  const onImagePick = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
      }
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // base64: true,
    });
    setFormData({ ...formData, image: res });
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcome}>Register Your Account!</Text>
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
        </View>
        <Text style={styles.profileTitle}>Profile Picture</Text>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={
              formData?.image?.uri
                ? { uri: formData?.image?.uri }
                : defaultAvatar
            }
          />
          <TouchableOpacity style={styles.uploadButton} onPress={onImagePick}>
            <Text style={styles.uploadText}>Select Image</Text>
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
          onChangeText={onPhoneNumberChange}
          placeholder="Enter your phone number"
          value={formData.phoneNumber}
        />
        <TextInput
          style={[globalStyles.textInput, styles.textAreaInput]}
          onChangeText={onAddressChange}
          placeholder="Enter your address"
          multiline={true}
          value={formData.address}
        />
        <TextInput
          style={[globalStyles.textInput, styles.input]}
          onChangeText={onPasswordChange}
          placeholder="Enter your password"
          secureTextEntry
          value={formData.password}
        />
        <TouchableOpacity
          disabled={!formData.isFormValid || isLoading}
          style={formData.isFormValid ? styles.button : styles.disabledButton}
          onPress={onRegisterClick}
        >
          {!isLoading ? (
            <Text style={styles.singInText}>Register</Text>
          ) : (
            <Progress.Circle
              style={styles.progress}
              size={25}
              indeterminate={true}
            />
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

RegistrationScreen.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { register })(RegistrationScreen);
