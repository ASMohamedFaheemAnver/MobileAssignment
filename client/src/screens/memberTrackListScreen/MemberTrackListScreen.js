import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import defaultAvatar from '../../../assets/default-avatar.jpg';
import {
  ADD_EXTRA_FEE_ROUTE_NAME,
  ADD_MONTHLY_FEE_ROUTE_NAME,
  DEFAULT_CODE,
  EDIT_ROUTE_CODE,
  EXTRA_FEE,
  MONTH_FEE,
} from '../../constants/strings';
import {
  makeFeePaidForOneMember,
  makeFeeUnPaidForOneMember,
} from '../../redux/actions/society';
import ErrorDialog from '../errorDialog/errorDialog';
import {globalStyles} from '../styles';
import styles from './styles';

function MemberTrackListScreen({
  navigation,
  makeFeePaidForOneMember,
  societyLogs,
  makeFeeUnPaidForOneMember,
  route: {
    params: {log, editRouteCode},
  },
}) {
  const [mutatableLog, mutateLog] = useState(log);
  useEffect(() => {
    mutateLog(
      societyLogs.logs.find(l => {
        return l._id == mutatableLog._id;
      }),
    );
  }, [societyLogs]);

  useEffect(() => {
    if (editRouteCode != null && editRouteCode == EDIT_ROUTE_CODE) {
      // console.log({kind: log?.kind});
      switch (log?.kind) {
        case EXTRA_FEE:
          navigation.push(ADD_EXTRA_FEE_ROUTE_NAME, {log});
        case MONTH_FEE:
          navigation.push(ADD_MONTHLY_FEE_ROUTE_NAME, {log});
      }
      navigation.setParams({
        editRouteCode: DEFAULT_CODE,
      });
    }
  }, [editRouteCode]);

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <Text style={styles.userCategoryTitle}>Let's edit tracks!</Text>

      {mutatableLog?.fee?.tracks?.length == 0 ? (
        <Text style={globalStyles.red}>No tracks found!</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={mutatableLog?.fee?.tracks}
          renderItem={({item: track}) => {
            return (
              <View style={styles.cardContainer}>
                <Image style={styles.profileImage} source={defaultAvatar} />
                <Text style={styles.societyName}>{track.member?.name}</Text>
                {track?.is_paid ? (
                  <TouchableOpacity
                    onPress={() => {
                      makeFeeUnPaidForOneMember(track._id, mutatableLog._id);
                    }}>
                    <Text style={globalStyles.red}>Make Unpaid</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      makeFeePaidForOneMember(track._id, mutatableLog._id);
                    }}>
                    <Text style={globalStyles.green}>Make Paid</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
        />
      )}
      {/* </ScrollView> */}
      <ErrorDialog />
    </SafeAreaView>
  );
}

MemberTrackListScreen.propTypes = {
  makeFeePaidForOneMember: PropTypes.func.isRequired,
  makeFeeUnPaidForOneMember: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  societyLogs: state.society.societyLogs,
});

export default connect(mapStateToProps, {
  makeFeePaidForOneMember,
  makeFeeUnPaidForOneMember,
})(MemberTrackListScreen);
