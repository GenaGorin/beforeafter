import React from 'react';
import {Text} from 'react-native';

const CreateGoal = () => {
  return <Text>Create Goal page</Text>;
};

CreateGoal.navigationOptions = {
  tabBarIcon: ({focused}: any) => <Text>CreateGoal</Text>,
};

export default CreateGoal;
