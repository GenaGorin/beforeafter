import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IGoal} from '../../../interfaces/goal';
import {IStage} from '../../../interfaces/stage';
import {
  changeGoalStatus,
  deleteGoal,
  deleteStage,
  getGoal,
  getStages,
} from '../../redux/actions';
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
  const navigation = useNavigation();

  useEffect(() => {
    if (thisGoal.length === 0) {
      dispatch(getGoal(goalId));
    }
    if (thisStages.length === 0) {
      dispatch(getStages(goalId));
    }
  }, []);

  const removeGoalAlert = () => {
    Alert.alert('Удалить цель ?', 'Вы уверены что хотите удалить эту цель?', [
      {
        text: 'Нет',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Да', onPress: () => removeGoal()},
    ]);
  };

  const removeGoal = () => {
    dispatch(deleteGoal(thisGoal[0]?.id));
    navigation.goBack();
  };

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
      <View style={{display: 'flex', flexDirection: 'row'}}>
        {thisStages.length > 0 ? (
          <View style={{marginTop: 16, marginRight: 20}}>
            {thisGoal[0]?.done ? (
              <TouchableOpacity
                style={{display: 'flex', flexDirection: 'row'}}
                onPress={() => changeGoalStatusClick(0)}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: '#2d2d2f',
                  }}>
                  <Image
                    style={{
                      width: 35,
                      height: 35,
                      marginTop: -7,
                      marginLeft: -7,
                    }}
                    source={require('../../../src/images/galka.png')}
                  />
                </View>
                <Text style={{marginLeft: 7, marginTop: 3}}>
                  Отменить завершение
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{display: 'flex', flexDirection: 'row'}}
                onPress={() => changeGoalStatusClick(1)}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: '#2d2d2f',
                  }}></View>
                <Text style={{marginLeft: 7, marginTop: 3}}>
                  Завершить цель
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <></>
        )}
        <TouchableOpacity onPress={removeGoalAlert}>
          <Text style={{color: '#4d80aa', fontWeight: '600', marginTop: 20}}>
            Удалить цель
          </Text>
        </TouchableOpacity>
      </View>
      {showCreate ? (
        <Create goalId={goalId} />
      ) : (
        <View
          style={{
            marginTop: 20,
            marginBottom: 50,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
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
  const dispatch = useDispatch();
  const removeStageClick = () => {
    Alert.alert('Удалить этап ?', 'Вы уверены что хотите удалить этот этап?', [
      {
        text: 'Нет',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Да', onPress: () => removeStageFunc()},
    ]);
  };
  const removeStageFunc = () => {
    dispatch(deleteStage(stage.goal_id, stage.id));
  };
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
      <View style={{marginLeft: 16, width: '50%'}}>
        <Text>{stage.description?.substr(0, 150)}</Text>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={removeStageClick}>
          <Image
            style={{width: 20, height: 30}}
            source={require('../../../src/images/remove.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
