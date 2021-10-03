import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {
  getBasicSocietyDetailes,
  setSelectedSociety,
} from '../../redux/actions/auth';
import {globalStyles} from '../styles';
import styles from './styles';

function SocietySelectionScreen({
  getBasicSocietyDetailes,
  basicSocieties,
  setSelectedSociety,
  navigation,
}) {
  useEffect(() => {
    getBasicSocietyDetailes();
  }, [getBasicSocietyDetailes]);
  return (
    <SafeAreaView style={globalStyles.container}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <Text style={styles.userCategoryTitle}>Choose Where You Belong!</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={basicSocieties}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedSociety(item);
                navigation.pop();
              }}
              style={styles.cardContainer}>
              <Text style={styles.societyName}>{item?.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

SocietySelectionScreen.propTypes = {
  getBasicSocietyDetailes: PropTypes.func.isRequired,
  setSelectedSociety: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  basicSocieties: state.auth.basicSocieties,
});

export default connect(mapStateToProps, {
  getBasicSocietyDetailes,
  setSelectedSociety,
})(SocietySelectionScreen);
