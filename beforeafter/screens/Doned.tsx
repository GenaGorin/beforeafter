import React from 'react';
import DonedGoalList from './components/DonedGoalList/DonedGoalList';
import GoalSwitcher from './components/GoalSwitcher/GoalSwitcher';

const Doned = () => {
  return (
    <>
      <GoalSwitcher active="Doned" />
      <DonedGoalList />
    </>
  );
};

export default Doned;
