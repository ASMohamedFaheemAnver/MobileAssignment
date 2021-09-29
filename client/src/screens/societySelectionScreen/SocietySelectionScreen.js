import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {getBasicSocietyDetailes} from '../../redux/actions/auth';
import {globalStyles} from '../styles';
import styles from './styles';

function SocietySelectionScreen({getBasicSocietyDetailes, basicSociety}) {
  useEffect(() => {
    getBasicSocietyDetailes();
  }, [getBasicSocietyDetailes]);
  return (
    <SafeAreaView style={globalStyles.container}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <Text style={styles.userCategoryTitle}>Choose Where You Belong!</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={basicSociety}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.cardContainer}>
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
};

const mapStateToProps = state => ({
  basicSociety: state.auth.basicSociety,
});

export default connect(mapStateToProps, {getBasicSocietyDetailes})(
  SocietySelectionScreen,
);
