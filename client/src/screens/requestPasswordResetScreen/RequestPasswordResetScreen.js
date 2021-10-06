import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {MEMBER_CATEGORY, SOCIETY_CATEGORY} from '../../constants/strings';
import {
  requestPasswordReset,
  resetPasswordRequestState,
} from '../../redux/actions/auth';
import ErrorDialog from '../errorDialog/errorDialog';
import {globalStyles} from '../styles';
import styles from './styles';

function RequestPasswordResetScreen({
  requestPasswordReset,
  isLoading,
  navigation,
  isPasswordResetRequested,
  resetPasswordRequestState,
}) {
  const [formData, setFormData] = useState({
    email: '',
    userCategory: MEMBER_CATEGORY,
    isEmailValid: false,
    isFormValid: false,
  });

  useEffect(() => {}, []);

  const onEmailChange = e => {
    setFormData({
      ...formData,
      email: e,
      isEmailValid: true,
      isFormValid: true,
    });
  };

  useEffect(() => {
    if (isPasswordResetRequested) {
      resetPasswordRequestState();
      navigation.pop();
    }
  }, [isPasswordResetRequested]);

  const changeUserCategory = userCategory => {
    setFormData({
      ...formData,
      userCategory,
    });
  };

  const onRequestPasswordResetClick = async () => {
    requestPasswordReset({
      ...formData,
    });
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcome}>Reset Your Password!</Text>
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
            }}>
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
            }}>
            <FontAwesomeIcon size={40} name="group" />
          </TouchableOpacity>
        </View>
        <TextInput
          style={[globalStyles.textInput, styles.input]}
          onChangeText={onEmailChange}
          placeholder="Enter your email"
          value={formData.email}
        />
        <TouchableOpacity
          disabled={!formData.isFormValid || isLoading}
          style={formData.isFormValid ? styles.button : styles.disabledButton}
          onPress={onRequestPasswordResetClick}>
          {!isLoading ? (
            <Text style={styles.singInText}>Request Reset</Text>
          ) : (
            <Progress.Circle
              style={styles.progress}
              size={25}
              indeterminate={true}
            />
          )}
        </TouchableOpacity>
        <ErrorDialog />
      </ScrollView>
    </SafeAreaView>
  );
}

RequestPasswordResetScreen.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPasswordResetRequested: PropTypes.bool.isRequired,
  resetPasswordRequestState: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  isPasswordResetRequested: state.auth.isPasswordResetRequested,
});

export default connect(mapStateToProps, {
  requestPasswordReset,
  resetPasswordRequestState,
})(RequestPasswordResetScreen);
