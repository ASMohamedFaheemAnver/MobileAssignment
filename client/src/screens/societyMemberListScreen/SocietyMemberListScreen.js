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
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import defaultAvatar from '../../../assets/default-avatar.jpg';
import {
  approveMember,
  disApproveMember,
  getAllMembers,
} from '../../redux/actions/society';
import {globalStyles} from '../styles';
import styles from './styles';

function SocietyMemberListScreen({
  getAllMembers,
  approveMember,
  disApproveMember,
  societyMembers,
  navigation,
}) {
  useEffect(() => {
    getAllMembers();
  }, [getAllMembers]);
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.userCategoryTitle}>Society Members!</Text>
        {societyMembers.map(member => {
          return (
            <View style={styles.cardContainer} key={member._id}>
              <Image style={styles.profileImage} source={defaultAvatar} />
              <View style={styles.section}>
                <Text style={styles.title}>Name</Text>
                <Text style={styles.societyName}>{member?.name}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.title}>Email</Text>
                <Text style={styles.societyName}>{member?.email}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.title}>Arears</Text>
                <Text
                  style={styles.societyName}>{`${member?.arrears} LKR`}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.title}>Phone Number</Text>
                <Text style={styles.societyName}>{member?.phoneNumber}</Text>
              </View>
              <View style={styles.actions}>
                {!member?.approved && (
                  <TouchableOpacity
                    onPress={() => {
                      approveMember(member._id);
                    }}>
                    <Text style={globalStyles.green}>Approve</Text>
                  </TouchableOpacity>
                )}
                {member?.approved && (
                  <TouchableOpacity
                    onPress={() => {
                      disApproveMember(member._id);
                    }}>
                    <Text style={globalStyles.red}>Disaprove</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

SocietyMemberListScreen.propTypes = {
  getAllMembers: PropTypes.func.isRequired,
  approveMember: PropTypes.func.isRequired,
  disApproveMember: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  societyMembers: state.society.societyMembers,
});

export default connect(mapStateToProps, {
  getAllMembers,
  approveMember,
  disApproveMember,
})(SocietyMemberListScreen);
