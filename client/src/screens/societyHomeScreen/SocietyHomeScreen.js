import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {getSocietyLogs} from '../../redux/actions/society';
import {globalStyles} from '../styles';
import styles from './styles';

function SocietyHomeScreen({
  isLoading,
  getSocietyLogs,
  societyLogs: {logs, logs_count},
}) {
  useEffect(() => {
    getSocietyLogs();
  }, [getSocietyLogs]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={styles.societyListTitle}>Recent Activities</Text>
      {isLoading ? (
        <View style={globalStyles.center}>
          <Progress.Circle size={50} indeterminate={true} />
        </View>
      ) : logs.length == 0 ? (
        <Text style={globalStyles.red}>Currently no acctivity to show!</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={logs}
          renderItem={({item: societyLog}) => {
            return (
              <TouchableOpacity style={styles.activity}>
                <Text style={styles.flexOne}>2020/Sep</Text>
                <Text style={styles.flexTwo}>
                  Description is a combination of word which describe the thing
                </Text>
                <Text style={styles.flexOne}>200 LKR</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

SocietyHomeScreen.propTypes = {
  getSocietyLogs: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.society.isLoading,
  societyLogs: state.society.societyLogs,
});

export default connect(mapStateToProps, {
  getSocietyLogs,
})(SocietyHomeScreen);
