import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getGoals} from '../../redux/actions';
import SingeGoal from '../SingleGoal/SingleGoal';

function FreshGoalList() {
  const goals: any = useSelector((state: any) => state.goals.goals);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGoals(0));
  }, []);

  const setNextFetchPortion = () => {
    dispatch(getGoals(goals.length));
  };

  return goals.length > 0 ? (
    <FlatList
      data={goals}
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

export default FreshGoalList;
