import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IGoal} from '../../../interfaces/goal';
import {getFinishedGoals} from '../../redux/actions';
import SingeGoal from '../SingleGoal/SingleGoal';

function DonedGoalList() {
  const goals: any = useSelector((state: any) => state.goals.goals);
  const finishedGoals = goals.filter((goal: IGoal) => goal.done === 1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFinishedGoals(0));
  }, []);

  const setNextFetchPortion = () => {
    dispatch(getFinishedGoals(finishedGoals.length));
  };

  return finishedGoals.length > 0 ? (
    <FlatList
      data={finishedGoals}
      renderItem={({item, index}) => <SingeGoal goal={item} />}
      keyExtractor={(item, index) => item.id.toString()}
      onEndReached={setNextFetchPortion}
      onEndReachedThreshold={0.1}
      //refreshing={this.state.refreshing}
    />
  ) : (
    <ActivityIndicator size="large" />
  );
}

export default DonedGoalList;
