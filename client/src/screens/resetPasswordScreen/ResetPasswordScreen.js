import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {DASHBOARD, LOGIN_SCREEN_ROUTE_NAME} from '../../constants/strings';
import {loadUserMetaData} from '../../redux/actions/auth';
import {globalStyles} from '../styles';
import styles from './styles';

function ResetPasswordScreen({navigation, route}) {
  const {
    params: {reset_token},
  } = route;
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.container}>
        <Text>{reset_token}</Text>
      </View>
    </SafeAreaView>
  );
}

ResetPasswordScreen.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(ResetPasswordScreen);
