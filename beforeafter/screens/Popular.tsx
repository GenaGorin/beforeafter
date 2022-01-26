import React from 'react';
import GoalSwitcher from './components/GoalSwitcher/GoalSwitcher';
import PopularGoalList from './components/PopularGoalList/PopularGoalList';

const Popular = () => {
  return (
    <>
      <GoalSwitcher active="Popular" />
      <PopularGoalList />
    </>
  );
};

export default Popular;
