import {createDrawerNavigator} from '@react-navigation/drawer';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {DEVELOPER_DASHBOARD} from '../constants/strings';
import DeveloperHomeScreen from '../screens/developerHomeScreen/DeveloperHomeScreen';
import {DrawerContent} from './DrawerContent';
const Drawer = createDrawerNavigator();

function DrawerRoutes({isAuthenticated, isLoading, userCategory}) {
  const getInitialRoute = userCategory => {
    switch (userCategory) {
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
    </Drawer.Navigator>
  );
}

DrawerRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  userCategory: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  userCategory: state.auth.userCategory,
});

export default connect(mapStateToProps, {})(DrawerRoutes);
