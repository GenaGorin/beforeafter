import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {getComments} from '../../redux/actions';
import GoBack from '../goBack/GoBack';
import SingleComment from './SingleComment';

type TGoalComments = {
  goalId: number;
};

function GoalCommentsComponent({goalId}: TGoalComments) {
  const comments = useSelector((state: any) => state.comments.comments);
  const thisComments = comments.filter(
    (comment: any) => comment.goal_id === goalId,
  );
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (thisComments.length === 0) {
      dispatch(getComments(goalId, 0, setCount));
    } else {
      dispatch(getComments(goalId, 0, setCount, true));
    }
  }, []);

  console.log('thisComments.length', thisComments.length);

  const setNextFetchPortion = () => {
    console.log('called fetch next portion');

    dispatch(getComments(goalId, thisComments.length));
  };

  return (
    <View style={{backgroundColor: '#fff', padding: 20}}>
      {thisComments.length > 0 ? (
        <FlatList
          data={thisComments}
          renderItem={({item, index}) => <SingleComment comment={item} />}
          keyExtractor={(item, index) => item.id.toString()}
          onEndReached={setNextFetchPortion}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={GoBack}
          //refreshing={this.state.refreshing}
        />
      ) : (
        <>
          <Text>Нет комментариев</Text>
        </>
      )}
    </View>
  );
}

export default GoalCommentsComponent;
