import React from 'react';
import {View} from 'react-native';
import GoalComments from './GoalComments';
import GoalHeader from './GoalHeader';

type TGoal = {
  goalId: number;
  commentsCount: number;
};

function Goal({goalId, commentsCount}: TGoal) {
  return (
    <View style={{backgroundColor: '#fff', padding: 20}}>
      <GoalHeader goalId={goalId} commentsCount={commentsCount} />
    </View>
  );
}

export default Goal;
