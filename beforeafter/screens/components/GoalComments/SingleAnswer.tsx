import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {IAnswer} from '../../../interfaces/answer';
import {createAnswerLike, getUser} from '../../redux/actions';
import {getDiffDate} from '../../redux/functions';

type TSingleAnswer = {
  answer: IAnswer;
};

function SingleAnswer({answer}: TSingleAnswer) {
  const users = useSelector((state: any) => state.users.users);
  const thisUsers = users.filter((user: any) => user.id === answer.user_id);
  const dispatch = useDispatch();
  let token = useSelector((state: any) => state.user.user.access_token);

  const [likes, setLikes] = useState(answer.likes);

  useEffect(() => {
    if (thisUsers.length === 0) {
      dispatch(getUser(answer.user_id));
    }
  }, []);

  const updateLike = () => {
    let newLikes = likes + 1;
    setLikes(newLikes);
  };

  const navigation = useNavigation();
  const createAnswertLikeClick = () => {
    if (!token) {
      navigation.navigate('MyProfile');
    } else {
      createAnswerLike(answer.id, updateLike);
    }
  };

  return (
    <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Profile', {userId: answer.user_id})
        }>
        <Image
          source={
            thisUsers[0]?.image_url
              ? {uri: thisUsers[0]?.image_url}
              : require('../../../src/images/image_placeholder.png')
          }
          style={{width: 50, height: 50, borderRadius: 25}}
        />
      </TouchableOpacity>
      <View style={{marginLeft: 10}}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontSize: 16, color: '#2d2d2f'}}>
            {thisUsers[0]?.firstname + ' ' + thisUsers[0]?.lastname}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#6997d3',
              marginTop: 3,
              marginLeft: 10,
            }}>
            {getDiffDate(answer.date)}
          </Text>
        </View>
        <Text style={{marginTop: 5}}>{answer.text}</Text>
        <View style={{display: 'flex'}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TouchableOpacity onPress={createAnswertLikeClick}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../../src/images/like.png')}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 14,
                color: '#6997d3',
                marginTop: 3,
                marginLeft: 3,
              }}>
              {likes}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
export default SingleAnswer;
