import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import PropTypes from 'prop-types';
import React from 'react';
import {View} from 'react-native';
import {Avatar, Caption, Drawer, Title} from 'react-native-paper';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {
  DEVELOPER_CATEGORY,
  DEVELOPER_DASHBOARD,
  LOG_OUT_LABEL,
  SOCIETY_CATEGORY,
  SOCIETY_DASHBOARD,
  SOCIETY_MEMBERS,
} from '../constants/strings';
import {logOut} from '../redux/actions/auth';
import styles from './styles';

function DrawerContent(props) {
  const {state} = props;
  const {routes, index} = state;
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.infoContainer}>
              <Avatar.Image
                source={{
                  uri: 'https://storage.googleapis.com/society-management-syste-6584a.appspot.com/society/2021-01-30t13:06:18.112z.jpg',
                }}
                size={50}
              />
              <View style={styles.contectInfoContainer}>
                <Title style={styles.title}>FreeDoM</Title>
                <Caption style={styles.caption} numberOfLines={1}>
                  freedom@gmail.com
                </Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            {props.userCategory == DEVELOPER_CATEGORY && (
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="home-outline" color={color} size={size} />
                )}
                focused={routes[index].name === DEVELOPER_DASHBOARD}
                label={DEVELOPER_DASHBOARD}
                onPress={() => {
                  props.navigation.navigate(DEVELOPER_DASHBOARD);
                }}
              />
            )}
            {props.userCategory == SOCIETY_CATEGORY && (
              <>
                <DrawerItem
                  icon={({color, size}) => (
                    <Icon name="home-outline" color={color} size={size} />
                  )}
                  focused={routes[index].name === SOCIETY_DASHBOARD}
                  label={SOCIETY_DASHBOARD}
                  onPress={() => {
                    props.navigation.navigate(SOCIETY_DASHBOARD);
                  }}
                />
                <DrawerItem
                  icon={({color, size}) => (
                    <FontistoIcon name="persons" color={color} size={size} />
                  )}
                  focused={routes[index].name === SOCIETY_MEMBERS}
                  label={SOCIETY_MEMBERS}
                  onPress={() => {
                    props.navigation.navigate(SOCIETY_MEMBERS);
                  }}
                />
              </>
            )}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label={LOG_OUT_LABEL}
          onPress={() => {
            props.logOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

DrawerContent.propTypes = {
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userCategory: state.auth.userCategory,
});

export default connect(mapStateToProps, {logOut})(DrawerContent);
