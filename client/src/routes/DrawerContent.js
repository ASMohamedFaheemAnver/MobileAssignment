import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import PropTypes from 'prop-types';
import React from 'react';
import {Text, View} from 'react-native';
import {Avatar, Caption, Drawer, Title} from 'react-native-paper';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import defaultAvatar from '../../assets/default-avatar.jpg';
import {
  DEVELOPER_CATEGORY,
  DEVELOPER_DASHBOARD,
  LOG_OUT_LABEL,
  MEMBERS,
  MEMBER_CATEGORY,
  MEMBER_DASHBOARD,
  SOCIETY_CATEGORY,
  SOCIETY_DASHBOARD,
  SOCIETY_MEMBERS,
} from '../constants/strings';
import {logOut} from '../redux/actions/auth';
import {globalStyles} from '../screens/styles';
import styles from './styles';

function DrawerContent(props) {
  const {state} = props;
  const {routes, index} = state;
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {props.userCategory == SOCIETY_CATEGORY ? (
            <View style={styles.userInfoSection}>
              <View style={styles.infoContainer}>
                <Avatar.Image
                  source={
                    props.society?.imageUrl
                      ? {
                          uri: props.society.imageUrl,
                        }
                      : defaultAvatar
                  }
                  size={50}
                />
                <View style={styles.contectInfoContainer}>
                  <Title style={styles.title}>{props.society?.name}</Title>
                  <Caption style={styles.caption} numberOfLines={1}>
                    {props.society?.email}
                  </Caption>
                </View>
              </View>
              <View style={styles.assetInfo}>
                <Text>Current income :</Text>
                <Text
                  style={
                    globalStyles.green
                  }>{`${props.society?.current_income} LKR`}</Text>
              </View>
              {/* <View style={styles.assetInfo}>
                <Text>Expected income :</Text>
                <Text
                  style={
                    globalStyles.green
                  }>{`${props.society?.expected_income} LKR`}</Text>
              </View> */}
            </View>
          ) : props.userCategory == MEMBER_CATEGORY ? (
            <View style={styles.userInfoSection}>
              <View style={styles.infoContainer}>
                <Avatar.Image
                  source={
                    props.member?.imageUrl
                      ? {
                          uri: props.member.imageUrl,
                        }
                      : defaultAvatar
                  }
                  size={50}
                />
                <View style={styles.contectInfoContainer}>
                  <Title style={styles.title}>{props.member?.name}</Title>
                  <Caption style={styles.caption} numberOfLines={1}>
                    {props.member?.email}
                  </Caption>
                </View>
              </View>
              <View style={styles.assetInfo}>
                <Text>Arrears :</Text>
                <Text
                  style={
                    globalStyles.green
                  }>{`${props.member?.arrears} LKR`}</Text>
              </View>
            </View>
          ) : null}
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
            {props.userCategory == MEMBER_CATEGORY && (
              <>
                <DrawerItem
                  icon={({color, size}) => (
                    <Icon name="home-outline" color={color} size={size} />
                  )}
                  focused={routes[index].name === MEMBER_DASHBOARD}
                  label={MEMBER_DASHBOARD}
                  onPress={() => {
                    props.navigation.navigate(MEMBER_DASHBOARD);
                  }}
                />
                <DrawerItem
                  icon={({color, size}) => (
                    <FontistoIcon name="persons" color={color} size={size} />
                  )}
                  focused={routes[index].name === MEMBERS}
                  label={MEMBERS}
                  onPress={() => {
                    props.navigation.navigate(MEMBERS);
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
  society: state.society.society,
  member: state.member.member,
});

export default connect(mapStateToProps, {logOut})(DrawerContent);
