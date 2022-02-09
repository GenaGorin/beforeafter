import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IGoal} from '../../../interfaces/goal';
import {MyProfileStyles, tabbar} from '../../../src/styles/styles';
import {getSubsInfo, getUserGoals} from '../../redux/actions';
import GoBack from '../goBack/GoBack';

import UserAva from './UserAva/UserAva';

type TUserProfile = {
  userId: number;
};

const Header = ({userId}: TUserProfile) => {
  const users = useSelector((state: any) => state.users.users);
  const thisUser = users.filter((user: any) => user.id === userId);

  const [iFollow, setIFollow] = useState(0);
  const [followMe, setFoolowMe] = useState(0);
  const [goals, setGoals] = useState(0);

  const navigation = useNavigation();

  const countSubs = (data: any) => {
    setIFollow(data['i_follow']);
    setFoolowMe(data['follow_me']);
    setGoals(data['goals']);
  };

  useEffect(() => {
    getSubsInfo(userId, countSubs);
  }, [userId]);
  return (
    <ScrollView style={{backgroundColor: '#fff', padding: 20}}>
      <GoBack />
      <View>
        <View>
          <UserAva userId={userId} />
        </View>
      </View>
      {thisUser[0].firstname ? (
        <View>
          <Text style={MyProfileStyles.userName}>
            {thisUser[0].firstname + ' ' + thisUser[0].lastname}
          </Text>

          <View style={MyProfileStyles.tabsWrapper}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('FollowersScreen', {userId: thisUser[0].id})
              }
              style={MyProfileStyles.singleTab}>
              <Text style={MyProfileStyles.singleTabText}>
                Подписчики({followMe})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('IFollowScreen', {
                  userId: thisUser[0].id,
                  withUnsubscribe: false,
                })
              }
              style={MyProfileStyles.singleTab}>
              <Text style={MyProfileStyles.singleTabText}>
                Подписки({iFollow})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AboutProfile', {userData: thisUser[0]})
              }
              style={MyProfileStyles.singleTab}>
              <Text style={MyProfileStyles.singleTabText}>О профиле</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View></View>
      )}
      <UserProfile userId={userId} goalsCount={goals} />
    </ScrollView>
  );
};

export default Header;

function UserProfile({userId, goalsCount}: any) {
  const goals: any = useSelector((state: any) => state.goals.goals);
  let thisGoals = goals.filter((goal: IGoal) => goal.user_id === userId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (thisGoals.length < 10) {
      dispatch(getUserGoals(userId, 0));
    }
  }, []);

  const setNextFetchPortion = () => {
    dispatch(getUserGoals(userId, thisGoals.length));
  };
  return (
    <View style={{marginTop: 30}}>
      {thisGoals.length > 0 ? (
        thisGoals.map((goal: IGoal) => <Goal key={goal.id} goal={goal} />)
      ) : (
        <>
          <Text>Нету целей</Text>
        </>
      )}
      {goalsCount > thisGoals.length ? (
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 50,
            justifyContent: 'center',
          }}
          onPress={() => setNextFetchPortion()}>
          <Text style={{color: '#6997d3', fontWeight: '600'}}>Еще цели</Text>
          <Image
            style={{width: 16, height: 16, marginLeft: 5, marginTop: 3}}
            source={require('../../../src/images/trangleDown.png')}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
}

//export default UserProfile;

const Goal = ({goal}: any) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Goal', {goalId: goal.id})}
      style={{marginBottom: 30}}>
      <View style={MyProfileStyles.singleGoalWrapp}>
        <View style={{width: '90%'}}>
          <Text style={MyProfileStyles.singleGoalTitle}>
            {goal.title?.substr(0, 25)}
            {goal.title.length > 25 && '...'}
          </Text>
          <Text style={MyProfileStyles.singleGoalDesc}>
            {goal?.description?.substr(0, 80)}
            {goal?.description?.length > 80 && '...'}
          </Text>
        </View>
        <Image
          style={MyProfileStyles.singleGoalImage}
          source={require('../../../src/images/goForward.png')}
        />
      </View>
    </TouchableOpacity>
  );
};
