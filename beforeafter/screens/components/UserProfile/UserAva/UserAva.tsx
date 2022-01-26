import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MyProfileStyles} from '../../../../src/styles/styles';
import {
  checkSubscribe,
  getUser,
  subscribe,
  unSubscribe,
} from '../../../redux/actions';
import GoBack from '../../goBack/GoBack';
import SubscribeBtn from '../../SubscribeBtn/SubscribeBtn';

type TUserAva = {
  userId: number;
};

function UserAva({userId}: TUserAva) {
  const users = useSelector((state: any) => state.users.users);
  const thisUsers = users.filter((user: any) => user.id === userId);

  const me = useSelector((state: any) => state.user.user);
  const [subs, setSubs] = useState(false);

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
      dispatch(checkSubscribe(userId, setSubs));
    }
  }, []);

  return (
    <>
      <View style={MyProfileStyles.imageViewWrapper}>
        <View>
          <Image
            style={MyProfileStyles.profileImage}
            source={
              thisUsers[0].image_url
                ? {uri: thisUsers[0].image_url}
                : require('../../../../src/images/image_placeholder.png')
            }
          />
        </View>
        <View style={MyProfileStyles.btnWrapper}>
          {me?.id === userId ? (
            <View></View>
          ) : (
            <>
              {subs ? (
                <SubscribeBtn text="Отписаться" callback={unSubscribeClick} />
              ) : (
                <SubscribeBtn text="Подписаться" callback={subscribeClick} />
              )}
            </>
          )}
        </View>
      </View>
    </>
  );
}

export default UserAva;

/*
<TouchableOpacity
      onPress={() => navigation.navigate('Profile', {userId: userId})}>
      <View>
        <Text style={{marginTop: '10px'}}>
          {thisUsers[0]?.firstname + ' ' + thisUsers[0]?.lastname}
        </Text>
      </View>
    </TouchableOpacity>
<View>
            <Image
              source={
                thisUsers[0]?.image_url
                  ? {uri: thisUsers[0]?.image_url}
                  : require('../../../../src/images/image_placeholder.png')
              }
            />
          </View>
<View style={{marginTop: '10px'}}>
          {me?.id === userId ? (
            <View></View>
          ) : (
            <>
              {subs ? (
                <SubscribeBtn text="Отписаться" callback={unSubscribeClick} />
              ) : (
                <SubscribeBtn text="Подписаться" callback={subscribeClick} />
              )}
            </>
          )}
        </View>
*/
