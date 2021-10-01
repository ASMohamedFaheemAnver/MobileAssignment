import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import defaultAvatar from '../../../assets/default-avatar.jpg';
import {
  approveSociety,
  disApproveSociety,
  getAllSocieties,
} from '../../redux/actions/developer';
import {globalStyles} from '../styles';
import styles from './styles';

function DeveloperHomeScreen({
  getAllSocieties,
  approveSociety,
  isLoading,
  societies,
  disApproveSociety,
}) {
  useEffect(() => {
    getAllSocieties();
  }, [getAllSocieties]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={styles.societyListTitle}>Registered Society List</Text>
      {!(societies && societies.length > 0) || isLoading ? (
        <View style={globalStyles.center}>
          <Progress.Circle size={50} indeterminate={true} />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={societies}
          renderItem={({item: society}) => {
            return (
              <View style={styles.cardContainer}>
                <Image style={styles.profileImage} source={defaultAvatar} />
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
          }}
        />
      )}
    </SafeAreaView>
  );
}

DeveloperHomeScreen.propTypes = {
  getAllSocieties: PropTypes.func.isRequired,
  approveSociety: PropTypes.func.isRequired,
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
})(DeveloperHomeScreen);
