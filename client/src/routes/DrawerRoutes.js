import {createDrawerNavigator} from '@react-navigation/drawer';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  DEVELOPER_DASHBOARD,
  LOGIN_SCREEN_ROUTE_NAME,
  MEMBERS,
  MEMBER_CATEGORY,
  MEMBER_DASHBOARD,
  SOCIETY_CATEGORY,
  SOCIETY_DASHBOARD,
  SOCIETY_MEMBERS,
} from '../constants/strings';
import DeveloperHomeScreen from '../screens/developerHomeScreen/DeveloperHomeScreen';
import MemberHomeScreen from '../screens/memberHomeScreen/MemberHomeScreen';
import MemberListScreen from '../screens/memberListScreen/MemberListScreen';
import SocietyHomeScreen from '../screens/societyHomeScreen/SocietyHomeScreen';
import SocietyMemberListScreen from '../screens/societyMemberListScreen/SocietyMemberListScreen';
import DrawerContent from './DrawerContent';
const Drawer = createDrawerNavigator();

function DrawerRoutes({isAuthenticated, isLoading, userCategory, navigation}) {
  useEffect(() => {
    // console.log({isAuthenticated, isLoading});
    if (!isLoading && !isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{name: LOGIN_SCREEN_ROUTE_NAME}],
      });
    }
  }, [navigation, isAuthenticated, isLoading]);

  const getInitialRoute = userCategory => {
    switch (userCategory) {
      case SOCIETY_CATEGORY:
        return SOCIETY_DASHBOARD;
      case MEMBER_CATEGORY:
        return MEMBER_DASHBOARD;
      default:
        return DEVELOPER_DASHBOARD;
    }
  };

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props}></DrawerContent>}
      initialRouteName={getInitialRoute(userCategory)}>
      <Drawer.Screen
        name={DEVELOPER_DASHBOARD}
        component={DeveloperHomeScreen}
      />
      <Drawer.Screen
        name={SOCIETY_MEMBERS}
        component={SocietyMemberListScreen}
      />
      <Drawer.Screen name={MEMBERS} component={MemberListScreen} />
      <Drawer.Screen name={SOCIETY_DASHBOARD} component={SocietyHomeScreen} />
      <Drawer.Screen name={MEMBER_DASHBOARD} component={MemberHomeScreen} />
    </Drawer.Navigator>
  );
}

DrawerRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    userCategory: state.auth.userCategory,
  };
};

export default connect(mapStateToProps, {})(DrawerRoutes);
