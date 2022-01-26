import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IGoal} from '../../../../interfaces/goal';
import {getUserGoals} from '../../../redux/actions';

type TProfileGoals = {
  userId: number;
  count: number;
  href: string;
};

function ProfileGoals({userId, count, href}: TProfileGoals) {
  const goals: any = useSelector((state: any) => state.goals.goals);
  let thisGoals = goals.filter((goal: IGoal) => goal.user_id === userId);
  const dispatch = useDispatch();
  console.log('thisGoals.length', thisGoals.length);

  useEffect(() => {
    if (thisGoals.length < 10) {
      dispatch(getUserGoals(userId, 0));
    }
  }, []);

  const setNextFetchPortion = () => {
    dispatch(getUserGoals(userId, thisGoals.length));
  };

  return thisGoals.length > 0 ? (
    <FlatList
      data={thisGoals}
      renderItem={({item, index}) => <Goal goal={item} href={href} />}
      keyExtractor={(item, index) => item.id.toString()}
      onEndReached={setNextFetchPortion}
      onEndReachedThreshold={0.1}
      //refreshing={this.state.refreshing}
    />
  ) : (
    <ActivityIndicator size="large" />
  );
}

export default ProfileGoals;

const Goal = ({goal, href}: any) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(href, {goalId: goal.id})}>
      <View>
        <View>
          <Text>{goal.title}</Text>
          <Text>{goal?.description}</Text>
        </View>
        <Image source={require('../../../../src/images/goForward.png')} />
      </View>
    </TouchableOpacity>
  );
};
