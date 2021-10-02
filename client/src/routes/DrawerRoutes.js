import {createDrawerNavigator} from '@react-navigation/drawer';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  DEVELOPER_DASHBOARD,
  LOGIN_SCREEN_ROUTE_NAME,
  SOCIETY_CATEGORY,
  SOCIETY_DASHBOARD,
} from '../constants/strings';
import DeveloperHomeScreen from '../screens/developerHomeScreen/DeveloperHomeScreen';
import SocietyHomeScreen from '../screens/societyHomeScreen/SocietyHomeScreen';
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
      <Drawer.Screen name={SOCIETY_DASHBOARD} component={SocietyHomeScreen} />
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
