import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {
  ADD_DONATION_ROUTE_NAME,
  ADD_EXTRA_FEE_ROUTE_NAME,
  ADD_MONTHLY_FEE_ROUTE_NAME,
  ADD_OTHER_EXPENSE_ROUTE_NAME,
  ADD_REFINMENT_ROUTE_NAME,
  EDIT_TRACK_ROUTE_NAME,
} from '../../constants/strings';
import {getSociety, getSocietyLogs} from '../../redux/actions/society';
import {globalStyles} from '../styles';
import styles from './styles';

function SocietyHomeScreen({
  isLoading,
  getSocietyLogs,
  societyLogs: {logs, logs_count},
  navigation,
  getSociety,
  society,
}) {
  useEffect(() => {
    getSocietyLogs();
    getSociety();
  }, [getSocietyLogs, getSociety]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.actionContainer}>
          <Text style={styles.actionTitle}>Society Actions</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate(ADD_REFINMENT_ROUTE_NAME);
              }}>
              <Text style={globalStyles.blue}>Add refinment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate(ADD_DONATION_ROUTE_NAME);
              }}>
              <Text style={globalStyles.blue}>Add donation</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate(ADD_OTHER_EXPENSE_ROUTE_NAME);
              }}>
              <Text style={globalStyles.blue}>Add other expense</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <Text style={styles.actionTitle}>Member Actions</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate(ADD_MONTHLY_FEE_ROUTE_NAME);
              }}>
              <Text style={globalStyles.blue}>Add monthly fee</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate(ADD_EXTRA_FEE_ROUTE_NAME);
              }}>
              <Text style={globalStyles.blue}>Add extra fee</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.activityCotainer}>
          <Text style={styles.societyListTitle}>Recent Activities</Text>
          {isLoading ? (
            <View style={globalStyles.center}>
              <Progress.Circle size={50} indeterminate={true} />
            </View>
          ) : logs.length == 0 ? (
            <Text style={globalStyles.red}>
              Currently no acctivity to show!
            </Text>
          ) : (
            logs.map(log => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (log.fee.tracks.length) {
                      navigation.navigate(EDIT_TRACK_ROUTE_NAME, {
                        log: log,
                      });
                    }
                  }}
                  style={
                    log.fee.tracks.length
                      ? styles.activity
                      : styles.activityDisabled
                  }
                  key={log._id}>
                  <Text style={styles.flexOne}>
                    {new Date(log.fee.date).toLocaleDateString()}
                  </Text>
                  <Text style={styles.flexTwo}>{log.fee.description}</Text>
                  <Text style={[styles.flexOne, styles.alignRight]}>
                    {`${log.fee.amount} LKR`}
                  </Text>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

SocietyHomeScreen.propTypes = {
  getSocietyLogs: PropTypes.func.isRequired,
  getSociety: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.society.isLoading,
  societyLogs: state.society.societyLogs,
  society: state.society.society,
});

export default connect(mapStateToProps, {
  getSocietyLogs,
  getSociety,
})(SocietyHomeScreen);
