import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IGoal} from '../../../interfaces/goal';
import {IStage} from '../../../interfaces/stage';
import {changeGoalStatus, getGoal, getStages} from '../../redux/actions';
import GoBack from '../goBack/GoBack';
import BlueBtn from '../SubscribeBtn/BlueBtn';
import Create from './Create';

type TCreateStageComponent = {
  goalId: number;
};

function CreateStageComponent({goalId}: TCreateStageComponent) {
  const [showCreate, setShowCreate] = useState(false);
  let goals = useSelector((state: any) => state.goals.goals);

  let thisGoal = goals.filter((goal: IGoal) => goal.id === goalId);
  const dispatch = useDispatch();

  let stages = useSelector((state: any) => state.stages.stages);
  let thisStages = stages.filter((stages: IStage) => stages.goal_id === goalId);

  const loading = useSelector((state: any) => state.app.loading);

  useEffect(() => {
    if (thisGoal.length === 0) {
      dispatch(getGoal(goalId));
    }
    if (thisStages.length === 0) {
      dispatch(getStages(goalId));
    }
  }, []);

  const changeGoalStatusClick = (status: number) => {
    dispatch(changeGoalStatus(goalId, status));
  };
  return loading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView style={{backgroundColor: '#fff', padding: 20}}>
      <GoBack />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginBottom: 20,
        }}>
        <Text style={{fontSize: 20, color: '#2d2d2f'}}>
          Добавьте этапы для цели:
        </Text>
        <Text style={{fontSize: 20, color: '#4d80aa'}}>
          "{thisGoal[0]?.title}"
        </Text>
      </View>
      {thisStages.length > 0 ? (
        <View>
          {thisStages.map((stage: IStage, i: number) => (
            <Stage key={i} stage={stage} iter={i} />
          ))}
        </View>
      ) : (
        <View></View>
      )}
      {showCreate ? (
        <Create goalId={goalId} />
      ) : (
        <View style={{marginTop: 20, marginBottom: 50}}>
          <BlueBtn callback={() => setShowCreate(true)} text="Добавить этап" />
        </View>
      )}
    </ScrollView>
  );
}

export default CreateStageComponent;

type TStage = {
  stage: IStage;
  iter: number;
};

const Stage = ({stage, iter}: TStage) => {
  return (
    <View
      style={{
        borderBottomColor: '#909090',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 10,
      }}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
        }}>
        <Text>{iter + 1}</Text>
      </View>
      <View>
        <Image
          source={
            stage.image_url
              ? {uri: stage.image_url}
              : require('../../../src/images/photoplaceholder.jpg')
          }
          style={{width: 90, height: 90}}
        />
        <Text style={{fontSize: 12, color: '#4d80aa'}}>{stage.date}</Text>
      </View>
      <View style={{marginLeft: 16}}>
        <Text>{stage.description}</Text>
      </View>
    </View>
  );
};
