import React, {useEffect} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import GoalAuthor from './components/SingleGoal/GoalAuthor/GoalAuthor';
import {getAmbitiousAuthors} from './redux/actions';

function Authors() {
  const dispatch = useDispatch();
  const authorsIds = useSelector((state: any) => state.ambitious.user_ids);
  const loading = useSelector((state: any) => state.app.loading);
  useEffect(() => {
    if (authorsIds.length === 0) {
      dispatch(getAmbitiousAuthors());
    }
  }, []);
  return (
    <ScrollView style={{backgroundColor: '#fff', padding: 20}}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Text style={{fontSize: 20, color: '#2d2d2f'}}>
          Самые амбициозные авторы
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        authorsIds.length > 0 &&
        authorsIds.map((userId: number) => (
          <View
            key={userId}
            style={{
              borderBottomColor: '#dedede',
              borderBottomWidth: 2,
              paddingBottom: 8,
              marginTop: 8,
            }}>
            <GoalAuthor userId={userId} />
          </View>
        ))
      )}
    </ScrollView>
  );
}

export default Authors;
