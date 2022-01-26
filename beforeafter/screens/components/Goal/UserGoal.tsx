import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkSubscribe,
  getUser,
  subscribe,
  unSubscribe,
} from '../../redux/actions';
import SubscribeBtn from '../SubscribeBtn/SubscribeBtn';

type TUserGoal = {
  userId: number;
};

function UserGoal({userId}: TUserGoal) {
  const users = useSelector((state: any) => state.users.users);
  const thisUsers = users.filter((user: any) => user.id === userId);

  const me = useSelector((state: any) => state.user.user);
  const [subs, setSubs] = useState(false);

  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const subscribeClick = (e: any) => {
    e.preventDefault();
    if (!me?.id) {
      navigation.navigate('MyProfile');
      return false;
    }
    dispatch(subscribe(userId, setSubs));
  };
  const unSubscribeClick = (e: any) => {
    e.preventDefault();
    dispatch(unSubscribe(userId, setSubs));
  };

  useEffect(() => {
    if (thisUsers.length === 0) {
      dispatch(getUser(userId));
    }
    if (me?.id) {
      dispatch(checkSubscribe(userId, setSubs, setLoaded));
    }
  }, []);

  return (
    <TouchableOpacity
      style={{display: 'flex', flexDirection: 'row'}}
      onPress={() => navigation.navigate('Profile', {userId: userId})}>
      <Image
        style={{width: 65, height: 65, borderRadius: 50}}
        source={
          thisUsers[0]?.image_url
            ? {uri: thisUsers[0].image_url}
            : require('../../../src/images/image_placeholder.png')
        }></Image>
      <Text style={{marginTop: 20, marginLeft: 10}}>
        {thisUsers[0]?.firstname + ' ' + thisUsers[0]?.lastname}
      </Text>
      {me?.id === userId ? (
        <View></View>
      ) : loaded ? (
        <View style={{marginTop: 17, marginLeft: 10}}>
          {subs ? (
            <SubscribeBtn text="Отписаться" callback={unSubscribeClick} />
          ) : (
            <SubscribeBtn text="Подписаться" callback={subscribeClick} />
          )}
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
}

export default UserGoal;
