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

function SplashScreen({
  loadUserMetaData,
  isAuthenticated,
  isLoading,
  navigation,
}) {
  useEffect(() => {
    loadUserMetaData();
  }, [loadUserMetaData]);

  useEffect(() => {
    // console.log({ isAuthenticated, isLoading });
    if (!isLoading && isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{name: DASHBOARD}],
      });
    } else if (!isLoading && !isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{name: LOGIN_SCREEN_ROUTE_NAME}],
      });
    }
  }, [navigation, isAuthenticated, isLoading]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.container}>
        <View style={styles.logo}></View>
        <Text style={styles.brandName}>Society Management System</Text>
        <Progress.Circle
          style={styles.progress}
          size={25}
          color="#546E7A"
          indeterminate={true}
        />
      </View>
    </SafeAreaView>
  );
}

SplashScreen.propTypes = {
  loadUserMetaData: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, {loadUserMetaData})(SplashScreen);
