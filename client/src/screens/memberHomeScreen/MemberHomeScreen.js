import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {
  getMember,
  getMemberLogs,
  listenCommonMemberLog,
  listenMe,
  unSubscribeListenMe,
  unSubscribeListenCommonMemberLog,
  unSubscribeListenMemberLogTrack,
  listenMemberLogTrack,
} from '../../redux/actions/member';
import {globalStyles} from '../styles';
import styles from './styles';

function MemberHomeScreen({
  isLoading,
  getMemberLogs,
  memberLogs: {logs, logs_count},
  getMember,
  listenMe,
  unSubscribeListenMe,
  unSubscribeListenCommonMemberLog,
  unSubscribeListenMemberLogTrack,
  listenCommonMemberLog,
  listenMemberLogTrack,
}) {
  useEffect(() => {
    getMemberLogs();
    getMember();
    listenMe();
    listenCommonMemberLog();
    listenMemberLogTrack();
  }, [getMemberLogs, getMember]);

  useEffect(() => {
    return () => {
      unSubscribeListenMe();
      unSubscribeListenCommonMemberLog();
      unSubscribeListenMemberLogTrack();
    };
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
                  style={
                    !log.fee.tracks[0].is_paid
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

MemberHomeScreen.propTypes = {
  getMemberLogs: PropTypes.func.isRequired,
  getMember: PropTypes.func.isRequired,
  listenCommonMemberLog: PropTypes.func.isRequired,
  listenMemberLogTrack: PropTypes.func.isRequired,
  unSubscribeListenMe: PropTypes.func.isRequired,
  unSubscribeListenMemberLogTrack: PropTypes.func.isRequired,
  unSubscribeListenCommonMemberLog: PropTypes.func.isRequired,
  listenMe: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.member.isLoading,
  memberLogs: state.member.memberLogs,
  member: state.member.member,
});

export default connect(mapStateToProps, {
  getMemberLogs,
  getMember,
  listenMe,
  unSubscribeListenMe,
  unSubscribeListenMemberLogTrack,
  unSubscribeListenCommonMemberLog,
  listenCommonMemberLog,
  listenMemberLogTrack,
})(MemberHomeScreen);
