import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import {connect} from 'react-redux';
import {
  addOtherSocietyExpense,
  resetOtherExpenseState,
} from '../../redux/actions/society';
import {globalStyles} from '../styles';
import styles from './styles';

function AddOtherExpenseScreen({
  isLoading,
  addOtherSocietyExpense,
  isOtherExpenseDone,
  navigation,
  resetOtherExpenseState,
}) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    isAmountValid: false,
    isDescriptionValid: false,
    isFormValid: false,
  });
  useEffect(() => {
    if (isOtherExpenseDone) {
      resetOtherExpenseState();
      navigation.pop();
    }
  }, [isOtherExpenseDone, resetOtherExpenseState]);
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Let's add other expense</Text>
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
            addOtherSocietyExpense(formData.amount, formData.description);
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

AddOtherExpenseScreen.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  addOtherSocietyExpense: PropTypes.func.isRequired,
  resetOtherExpenseState: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.society.isLoading,
  isOtherExpenseDone: state.society.isOtherExpenseDone,
});

export default connect(mapStateToProps, {
  addOtherSocietyExpense,
  resetOtherExpenseState,
})(AddOtherExpenseScreen);
