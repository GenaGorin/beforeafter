import React from 'react';
import {Text, View} from 'react-native';
import TagGoalList from './components/TagGoalList/TagGoalList';

function GoalByTag({route}: any) {
  let tagId: any = Number(route.params.tagId);
  return (
    <View>
      <TagGoalList tagId={tagId} />
    </View>
  );
}

export default GoalByTag;
