import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import {connect} from 'react-redux';
import {
  addExtraFeeToEveryone,
  resetExtraFeeState,
} from '../../redux/actions/society';
import {globalStyles} from '../styles';
import styles from './styles';

function AddRefinmentScreen({
  isLoading,
  addExtraFeeToEveryone,
  isExtraFeeDone,
  navigation,
  resetExtraFeeState,
}) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    isAmountValid: false,
    isDescriptionValid: false,
    isFormValid: false,
  });
  useEffect(() => {
    if (isExtraFeeDone) {
      resetExtraFeeState();
      navigation.pop();
    }
  }, [isExtraFeeDone, resetExtraFeeState]);
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Let's add extra fee</Text>
        <Text style={styles.subTitle}>Please fill below input fields</Text>
        <TextInput
          style={[globalStyles.textInput, styles.input]}
          onChangeText={e => {
            setFormData({
              ...formData,
              amount: e,
              isAmountValid: true,
              isFormValid: formData.isDescriptionValid,
            });
          }}
          placeholder="Enter the amount"
          keyboardType="numeric"
          value={formData.amount}
        />
        <TextInput
          style={[globalStyles.textInput, styles.textAreaInput]}
          onChangeText={e => {
            setFormData({
              ...formData,
              description: e,
              isDescriptionValid: true,
              isFormValid: formData.isAmountValid,
            });
          }}
          placeholder="Enter the description"
          multiline={true}
          value={formData.description}
        />
        <TouchableOpacity
          disabled={!formData.isFormValid || isLoading}
          style={formData.isFormValid ? styles.button : styles.disabledButton}
          onPress={() => {
            addExtraFeeToEveryone(formData.amount, formData.description);
          }}>
          {!isLoading ? (
            <Text style={styles.text}>Add</Text>
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

AddRefinmentScreen.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  addExtraFeeToEveryone: PropTypes.func.isRequired,
  resetExtraFeeState: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.society.isLoading,
  isExtraFeeDone: state.society.isExtraFeeDone,
});

export default connect(mapStateToProps, {
  addExtraFeeToEveryone,
  resetExtraFeeState,
})(AddRefinmentScreen);
