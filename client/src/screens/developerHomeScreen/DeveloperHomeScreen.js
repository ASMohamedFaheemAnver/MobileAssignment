import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import defaultAvatar from '../../../assets/default-avatar.jpg';
import {
  approveSociety,
  disApproveSociety,
  getAllSocieties,
  listenSociety,
} from '../../redux/actions/developer';
import {globalStyles} from '../styles';
import styles from './styles';

function DeveloperHomeScreen({
  getAllSocieties,
  approveSociety,
  isLoading,
  societies,
  disApproveSociety,
  listenSociety,
}) {
  useEffect(() => {
    getAllSocieties();
    listenSociety();
  }, [getAllSocieties]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.societyListTitle}>Registered Society List</Text>
        {isLoading ? (
          <View style={globalStyles.center}>
            <Progress.Circle size={50} indeterminate={true} />
          </View>
        ) : societies.length == 0 ? (
          <Text style={globalStyles.red}>Currently no society to show!</Text>
        ) : (
          societies.map(society => {
            return (
              <View style={styles.cardContainer} key={society._id}>
                <Image
                  style={styles.profileImage}
                  source={
                    society.imageUrl ? {uri: society.imageUrl} : defaultAvatar
                  }
                />
                <View style={styles.section}>
                  <Text style={styles.societyNameTitle}>Name</Text>
                  <Text style={styles.societyName}>{society?.name}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.societyNameTitle}>Email</Text>
                  <Text style={styles.societyName}>{society?.email}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.societyNameTitle}>Phone Number</Text>
                  <Text style={styles.societyName}>{society?.phoneNumber}</Text>
                </View>
                <View style={styles.actions}>
                  {!society?.approved && (
                    <TouchableOpacity
                      onPress={() => {
                        approveSociety(society._id);
                      }}>
                      <Text style={globalStyles.green}>Approve</Text>
                    </TouchableOpacity>
                  )}
                  {society?.approved && (
                    <TouchableOpacity
                      onPress={() => {
                        disApproveSociety(society._id);
                      }}>
                      <Text style={globalStyles.red}>Disaprove</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

DeveloperHomeScreen.propTypes = {
  getAllSocieties: PropTypes.func.isRequired,
  approveSociety: PropTypes.func.isRequired,
  listenSociety: PropTypes.func.isRequired,
  disApproveSociety: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.developer.isLoading,
  societies: state.developer.societies,
});

export default connect(mapStateToProps, {
  getAllSocieties,
  approveSociety,
  disApproveSociety,
  listenSociety,
})(DeveloperHomeScreen);
