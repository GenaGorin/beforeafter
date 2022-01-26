import React from 'react';
import GoalSwitcher from './components/GoalSwitcher/GoalSwitcher';
import SubsGoalList from './components/SubsGoalList/SubsGolaList';

const Subs = () => {
  return (
    <>
      <GoalSwitcher active="Subs" />
      <SubsGoalList />
    </>
  );
};

export default Subs;
