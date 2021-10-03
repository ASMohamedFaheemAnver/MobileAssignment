import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginBottom: 25,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  contectInfoContainer: {flexDirection: 'column', marginLeft: 15},
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  assetInfo: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});
