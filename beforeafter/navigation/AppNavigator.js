import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import CreateGoal from '../screens/CreateGoal';
import Main from '../screens/Main';

const AppNavigator = createBottomTabNavigator(
  {
    Main: Main,
    CreateGoal: {
      screen: CreateGoal,
      navigationOptions: {
        title: 'CreateGoal',
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
    },
  },
);

export default createAppContainer(AppNavigator);
