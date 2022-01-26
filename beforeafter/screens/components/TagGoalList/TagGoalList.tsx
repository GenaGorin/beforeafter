import {useDispatch, useSelector} from 'react-redux';
import {getTagGoals} from '../../redux/actions';
import React, {useEffect, useState} from 'react';
import Alert from '../Alert/Alert';
import {ActivityIndicator, FlatList, View} from 'react-native';
import GoBack from '../goBack/GoBack';
import SingeGoal from '../SingleGoal/SingleGoal';

type TTagGoalList = {
  tagId: number;
};

function TagGoalList({tagId}: TTagGoalList) {
  const tagGoals: any = useSelector((state: any) => state.tagGoals.goals);
  const tagGoalsCount: any = useSelector(
    (state: any) => state.tagGoals.goalscount,
  );
  const alert = useSelector((state: any) => state.app.alert);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTagGoals(tagId, 0));
  }, []);

  const setNextFetchPortion = () => {
    dispatch(getTagGoals(tagId, tagGoals.length));
  };

  return (
    <View style={{marginBottom: 100}}>
      <View style={{backgroundColor: '#fff', padding: 10}}>
        <GoBack />
      </View>
      {tagGoals.length > 0 ? (
        <FlatList
          data={tagGoals}
          renderItem={({item, index}) => <SingeGoal goal={item} />}
          keyExtractor={(item, index) => item.id.toString()}
          onEndReached={setNextFetchPortion}
          onEndReachedThreshold={0.1}
          //refreshing={this.state.refreshing}
        />
      ) : (
        <ActivityIndicator size="large" />
      )}
      {alert && <Alert text={'Нету постов с таким тегом'} />}
    </View>
  );
}

export default TagGoalList;
