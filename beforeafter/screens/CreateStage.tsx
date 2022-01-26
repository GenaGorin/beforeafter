import React from 'react';
import {Text} from 'react-native';
import CreateStageComponent from './components/CreateStageComponent/CreateStageComponent';

function CreateStage({route}: any) {
  const goalId = Number(route.params.goalId);
  return <CreateStageComponent goalId={goalId} />;
}

export default CreateStage;
