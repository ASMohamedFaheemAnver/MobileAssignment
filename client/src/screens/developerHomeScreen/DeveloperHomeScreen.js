import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import defaultAvatar from '../../../assets/default-avatar.jpg';
import {globalStyles} from '../styles';
import styles from './styles';

function DeveloperHomeScreen({}) {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={styles.societyListTitle}>Registered Society List</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[1]}
        renderItem={({society}) => {
          return (
            <View style={styles.cardContainer}>
              <Image style={styles.profileImage} source={defaultAvatar} />
              <View style={styles.section}>
                <Text style={styles.societyNameTitle}>Name</Text>
                <Text style={styles.societyName}>{'Hello World'}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.societyNameTitle}>Email</Text>
                <Text style={styles.societyName}>{'Hello World'}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.societyNameTitle}>Phone Number</Text>
                <Text style={styles.societyName}>{'Hello World'}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity>
                  <Text style={globalStyles.green}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={globalStyles.red}>Disaprove</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={globalStyles.red}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

DeveloperHomeScreen.propTypes = {};

export default connect(null, {})(DeveloperHomeScreen);
