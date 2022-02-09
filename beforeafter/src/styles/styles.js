import {StyleSheet} from 'react-native';

export const navbar = StyleSheet.create({
  activeIcons: {
    color: '#4d80aa',
    borderBottomColor: '#4d80aa',
    borderBottomWidth: 1,
    paddingBottom: 5,
    fontSize: 12,
  },
  inactiveIcons: {
    color: '#2d2d2f',
    fontSize: 12,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    paddingTop: 15,
    borderTopColor: '#dedede',
    borderTopWidth: 2,
  },
});

export const goalAuthor = StyleSheet.create({
  ava: {
    width: 50,
    height: 50,
    borderRadius: 35,
  },
  official: {
    width: 20,
    height: 20,
    marginLeft: 35,
    marginTop: -15,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  name: {
    marginTop: 15,
    marginLeft: 7,
    color: '#2d2d2f',
  },
});

export const singeGoal = StyleSheet.create({
  mainWrap: {
    backgroundColor: '#fff',
    marginTop: 15,
    padding: 20,
    marginBottom: 15,
  },
  doned: {
    width: 20,
    height: 20,
  },
  authorWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dataWtapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  blueText: {
    color: '#4d80aa',
    fontSize: 12,
    marginLeft: 4,
  },
  blackText: {
    color: '#2d2d2f',
    fontSize: 12,
  },
  title: {
    color: '#2d2d2f',
    fontSize: 20,
    marginLeft: -5,
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#909090',
  },
  likeWrap: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  likeWrapMR: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 10,
  },
  likeImg: {
    width: 25,
    height: 25,
  },
  likeText: {
    color: '#2d2d2f',
    fontSize: 16,
    marginLeft: 4,
    marginTop: 2,
    fontWeight: '600',
  },
  stage: {
    width: 120,
    height: 120,
    marginTop: 20,
    marginBottom: 20,
    marginRight: -50,
  },
  stageWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export const tabbar = StyleSheet.create({
  activeIcons: {
    color: '#4d80aa',
    borderBottomColor: '#4d80aa',
    borderBottomWidth: 1,
    paddingBottom: 5,
    fontSize: 12,
  },
  inactiveIcons: {
    color: '#2d2d2f',
    fontSize: 12,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
  },
});

export const controls = StyleSheet.create({
  input: {
    borderColor: '#dedede',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  buttonBlue: {
    backgroundColor: '#4d80aa',
    width: 170,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGray: {
    backgroundColor: '#e5ebf1',
    width: 170,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const MyProfileStyles = StyleSheet.create({
  imageViewWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 40,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  btnText: {
    color: '#4d80aa',
    marginRight: 10,
    marginLeft: 10,
  },
  userName: {
    fontSize: 20,
    color: '#2d2d2f',
    marginTop: 15,
  },
  emailText: {
    color: '#909090',
    fontSize: 14,
  },
  tabsWrapper: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  singleTab: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  singleTabText: {
    color: '#4d80aa',
    fontSize: 14,
  },
  singleTabImage: {
    marginLeft: 10,
    marginTop: 7,
  },
  singleGoalWrapp: {
    display: 'flex',
    flexDirection: 'row',
  },
  singleGoalTitle: {
    fontSize: 20,
    color: '#2d2d2f',
    maxWidth: '90%',
  },
  singleGoalDesc: {
    fontSize: 12,
    color: '#909090',
    marginLeft: 2,
    maxWidth: '90%',
  },
  singleGoalImage: {
    marginTop: 16,
    marginLeft: 14,
  },
  contactsWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  blueText: {
    color: '#4d80aa',
    marginLeft: 10,
  },
});
