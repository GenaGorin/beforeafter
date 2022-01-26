import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getSubGoals} from '../../redux/actions';
import SingeGoal from '../SingleGoal/SingleGoal';

function SubsGoalList() {
  const subGoals: any = useSelector((state: any) => state.subGoals.goals);

  const dispatch = useDispatch();
  const [haveGoals, setHaveGoals] = useState(true);

  useEffect(() => {
    dispatch(getSubGoals(0, setHaveGoals));
  }, []);

  const setNextFetchPortion = () => {
    dispatch(getSubGoals(subGoals.length, setHaveGoals));
  };

  return haveGoals ? (
    <FlatList
      data={subGoals}
      renderItem={({item, index}) => <SingeGoal goal={item} />}
      keyExtractor={(item, index) => item.id.toString()}
      onEndReached={setNextFetchPortion}
      onEndReachedThreshold={0.1}
      //refreshing={this.state.refreshing}
    />
  ) : (
    <Text>Подпишитесь на кого либо, что бы наблюдать за их целями</Text>
  );
}

export default SubsGoalList;
