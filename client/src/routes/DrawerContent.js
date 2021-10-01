import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React from 'react';
import {View} from 'react-native';
import {Avatar, Caption, Drawer, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DEVELOPER_DASHBOARD, SIGN_OUT_LABEL} from '../constants/strings';
import styles from './styles';

export function DrawerContent(props) {
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
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label={SIGN_OUT_LABEL}
          onPress={() => {}}
        />
      </Drawer.Section>
    </View>
  );
}
