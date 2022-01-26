import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View, Image, ViewBase} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {goalAuthor} from '../../../../src/styles/styles';
import {getUser, unSubscribe} from '../../../redux/actions';
import SubscribeBtn from '../../SubscribeBtn/SubscribeBtn';

type TGoalAuthor = {
  userId: number;
  withUnsubscribe?: boolean;
};

function GoalAuthor({userId, withUnsubscribe}: TGoalAuthor) {
  const users = useSelector((state: any) => state.users.users);
  const thisUsers = users.filter((user: any) => user.id === userId);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (thisUsers.length === 0) {
      dispatch(getUser(userId));
    }
  }, []);

  const [subbed, setSubbed] = useState(true);

  const unSubscribeClick = (e: any) => {
    e.preventDefault();
    dispatch(unSubscribe(userId, setSubbed));
  };

  return (
    <View>
      <View style={goalAuthor.wrapper}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', {userId: userId})}>
            <Image
              style={goalAuthor.ava}
              source={
                thisUsers[0]?.image_url
                  ? {uri: thisUsers[0]?.image_url}
                  : require('../../../../src/images/image_placeholder.png')
              }
            />
          </TouchableOpacity>
          {thisUsers[0]?.official ? (
            <Image
              style={goalAuthor.official}
              source={require('../../../../src/images/official.png')}
            />
          ) : (
            <View></View>
          )}
        </View>
        <Text style={goalAuthor.name}>
          {thisUsers[0]?.firstname} {thisUsers[0]?.lastname}
        </Text>

        {withUnsubscribe && subbed && (
          <View style={{height: 35, marginTop: 12, marginLeft: 10}}>
            <SubscribeBtn callback={unSubscribeClick} text="Отписаться" />
          </View>
        )}
      </View>
    </View>
  );
}

export default GoalAuthor;
