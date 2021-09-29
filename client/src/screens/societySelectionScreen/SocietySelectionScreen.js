import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {register} from '../../redux/actions/auth';
import {globalStyles} from '../styles';
import styles from './styles';

function SocietySelectionScreen({}) {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.userCategoryTitle}>Choose Where You Belong!</Text>
        <View style={styles.cardContainer}>
          <Text style={styles.societyName}>
            Victorious Islamic Friendship Association
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

SocietySelectionScreen.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {register})(SocietySelectionScreen);
