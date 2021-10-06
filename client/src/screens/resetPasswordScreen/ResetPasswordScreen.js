import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {
  onPasswordReset,
  resetPasswordResetRequestState,
} from '../../redux/actions/auth';
import ErrorDialog from '../errorDialog/errorDialog';
import {globalStyles} from '../styles';
import styles from './styles';

function ResetPasswordScreen({
  onPasswordReset,
  isLoading,
  navigation,
  route,
  isPasswordResetCompleted,
  resetPasswordResetRequestState,
}) {
  const [formData, setFormData] = useState({
    password: '',
    isPasswordValid: false,
    isFormValid: false,
  });

  const onPasswordChange = e => {
    setFormData({
      ...formData,
      password: e,
      isPasswordValid: true,
      isFormValid: true,
    });
  };

  useEffect(() => {
    if (isPasswordResetCompleted) {
      resetPasswordResetRequestState();
      navigation.pop();
    }
  }, [isPasswordResetCompleted]);

  const onPasswordResetClick = async () => {
    console.log({
      password: formData.password,
      token: route.params.reset_token,
      category: route.params.user_category,
    });
    onPasswordReset(
      formData.password,
      route.params.reset_token,
      route.params.user_category,
    );
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcome}>Enter Your New Password!</Text>
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
          onPress={onPasswordResetClick}>
          {!isLoading ? (
            <Text style={styles.singInText}>Reset</Text>
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

ResetPasswordScreen.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPasswordResetCompleted: PropTypes.bool.isRequired,
  resetPasswordResetRequestState: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  isPasswordResetCompleted: state.auth.isPasswordResetCompleted,
});

export default connect(mapStateToProps, {
  onPasswordReset,
  resetPasswordResetRequestState,
})(ResetPasswordScreen);
