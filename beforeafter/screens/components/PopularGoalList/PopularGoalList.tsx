import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getPopularGoals} from '../../redux/actions';
import SingeGoal from '../SingleGoal/SingleGoal';

function PopularGoalList() {
  const popularGoals: any = useSelector(
    (state: any) => state.popularGoals.goals,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularGoals(0));
  }, []);

  const setNextFetchPortion = () => {
    dispatch(getPopularGoals(popularGoals.length));
  };

  return popularGoals.length > 0 ? (
    <FlatList
      data={popularGoals}
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

export default PopularGoalList;
