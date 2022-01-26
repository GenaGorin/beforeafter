import React from 'react';
import {Text} from 'react-native';
import {navbar} from '../src/styles/styles';
import FreshGoalList from './components/FreshGoalList/FreshGoalList';
import GoalSwitcher from './components/GoalSwitcher/GoalSwitcher';

const Main = () => {
  return (
    <>
      <GoalSwitcher active="Main" />
      <FreshGoalList />
    </>
  );
};

export default Main;
