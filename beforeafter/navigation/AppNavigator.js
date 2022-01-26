import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Contacts from '../screens/Contacts';

import CreateGoal from '../screens/CreateGoal';
import Main from '../screens/Main';
import MyProfile from '../screens/MyProfile';

const AppNavigator = createBottomTabNavigator(
  {
    Main: Main,
    CreateGoal: {
      screen: CreateGoal,
      navigationOptions: {
        title: 'CreateGoal',
      },
    },
    MyProfile: MyProfile,
    Contacts: Contacts,
  },
  {
    tabBarOptions: {
      showLabel: false,
    },
  },
);

export default createAppContainer(AppNavigator);
