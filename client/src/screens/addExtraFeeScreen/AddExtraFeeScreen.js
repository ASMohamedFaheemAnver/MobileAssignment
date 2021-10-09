import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import {connect} from 'react-redux';
import {
  addExtraFeeToEveryone,
  resetExtraFeeState,
  editFeeForEveryone,
} from '../../redux/actions/society';
import {globalStyles} from '../styles';
import styles from './styles';

function AddRefinmentScreen({
  isLoading,
  addExtraFeeToEveryone,
  isExtraFeeDone,
  navigation,
  route: {params},
  resetExtraFeeState,
  editFeeForEveryone,
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

  // console.log({params});

  useEffect(() => {
    if (params?.log) {
      setFormData({
        amount: params?.log?.fee?.amount.toString(),
        description: params?.log?.fee?.description,
        isAmountValid: true,
        isDescriptionValid: true,
        isFormValid: true,
      });
    }
  }, [params]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          {params?.log ? "Let's update extra fee" : "Let's add extra fee"}
        </Text>
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
            if (params?.log) {
              editFeeForEveryone(
                params.log._id,
                formData.amount,
                formData.description,
              );
            } else {
              addExtraFeeToEveryone(formData.amount, formData.description);
            }
          }}>
          {!isLoading ? (
            <Text style={styles.text}>{params?.log ? 'Update' : 'Add'}</Text>
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
  editFeeForEveryone: PropTypes.func.isRequired,
  resetExtraFeeState: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.society.isLoading,
  isExtraFeeDone: state.society.isExtraFeeDone,
});

export default connect(mapStateToProps, {
  addExtraFeeToEveryone,
  resetExtraFeeState,
  editFeeForEveryone,
})(AddRefinmentScreen);
