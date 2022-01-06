import React from 'react';
import {Text} from 'react-native';

const Main = () => {
  return <Text>Main page</Text>;
};

Main.navigationOptions = {
  tabBarIcon: ({focused}: any) => <Text>Main</Text>,
};

export default Main;
