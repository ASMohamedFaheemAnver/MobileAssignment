import React from 'react';
import {SafeAreaView, ScrollView, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {globalStyles} from '../styles';
import styles from './styles';

function AddExtraFeeScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Let's add extra fee</Text>
        <Text style={styles.subTitle}>Please fill below input fields</Text>
        <TextInput
          style={[globalStyles.textInput, styles.input]}
          onChangeText={() => {}}
          placeholder="Enter the amount"
          // value={formData.phoneNumber}
        />
        <TextInput
          style={[globalStyles.textInput, styles.textAreaInput]}
          onChangeText={() => {}}
          placeholder="Enter the description"
          multiline={true}
          // value={formData.address}
        />
        <TouchableOpacity
          // disabled={!formData.isFormValid || isLoading}
          // style={formData.isFormValid ? styles.button : styles.disabledButton}
          style={styles.button}
          onPress={() => {}}>
          {/* {!isLoading ? ( */}
          <Text style={styles.text}>Add</Text>
          {/* ) : (
          <Progress.Circle
            style={styles.progress}
            size={25}
            indeterminate={true}
          />
        )} */}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddExtraFeeScreen;
