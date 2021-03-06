import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  societyListTitle: {
    color: '#8C9EA7',
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 25,
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 25,
  },
  societyNameTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  action: {
    padding: 10,
  },
  societyName: {
    fontSize: 16,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});
