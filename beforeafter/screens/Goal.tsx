import React from 'react';
import GoalComponent from './components/Goal/Goal';

function Goal({route}: any) {
  const goalId = Number(route.params.goalId);
  const commentsCount = route.params.commentCount;
  return <GoalComponent goalId={goalId} commentsCount={commentsCount} />;
}
export default Goal;
