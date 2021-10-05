import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import defaultAvatar from '../../../assets/default-avatar.jpg';
import {getAllMembers} from '../../redux/actions/member';
import {globalStyles} from '../styles';
import styles from './styles';

function MemberListScreen({getAllMembers, societyMembers, navigation}) {
  useEffect(() => {
    getAllMembers();
  }, [getAllMembers]);
  return (
    <SafeAreaView style={globalStyles.container}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <Text style={styles.userCategoryTitle}>Society Members!</Text>

      {societyMembers.length == 0 ? (
        <Text style={globalStyles.red}>
          Currently no members registered apart from you!
        </Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={societyMembers}
          renderItem={({item: member}) => {
            return (
              <View style={styles.cardContainer}>
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
                  <Text style={styles.title}>Phone Number</Text>
                  <Text style={styles.societyName}>{member?.phoneNumber}</Text>
                </View>
              </View>
            );
          }}
        />
      )}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

MemberListScreen.propTypes = {
  getAllMembers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  societyMembers: state.member.societyMembers,
});

export default connect(mapStateToProps, {
  getAllMembers,
})(MemberListScreen);
