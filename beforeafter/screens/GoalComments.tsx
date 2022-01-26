import React from 'react';
import {View} from 'react-native';
import GoalCommentsComponent from './components/GoalComments/GoalCommentsComponent';

type TGoalComments = {
  goalId: number;
};

function GoalComments({route}: any) {
  const goalId = Number(route.params.goalId);
  return <GoalCommentsComponent goalId={goalId} />;
}

export default GoalComments;
