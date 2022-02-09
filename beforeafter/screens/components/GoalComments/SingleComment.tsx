import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {IComment} from '../../../interfaces/comment';
import {
  createAnswer,
  createCommentLike,
  getAnswersCount,
  getUser,
} from '../../redux/actions';
import {getDiffDate} from '../../redux/functions';
import AnswersComponent from './AnswerComponent';

type TSingleComment = {
  comment: IComment;
};

const SingleComment = ({comment}: TSingleComment) => {
  const users = useSelector((state: any) => state.users.users);
  const thisUsers = users.filter((user: any) => user.id === comment.user_id);
  let token = useSelector((state: any) => state.user.user.access_token);
  const [answerMode, setAnswerMode] = useState(false);
  const [answersCount, setAnswersCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (thisUsers.length === 0) {
      dispatch(getUser(comment.user_id));
    }
    getAnswersCount(comment.id, setAnswersCount);
  }, []);
  const navigation = useNavigation();

  const createCommentLikeClick = () => {
    if (!token) {
      navigation.navigate('MyProfile');
    } else {
      dispatch(createCommentLike(comment.id));
    }
  };
  const [answer, setAnswer] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);

  const setAnswerModeClick = () => {
    if (!token) {
      navigation.navigate('MyProfile');
    } else {
      setAnswerMode(true);
    }
  };

  const sendAnswerClick = () => {
    if (!token) {
      navigation.navigate('MyProfile');
      return false;
    }
    if (!comment) {
      return false;
    }
    let momdate = moment(new Date());
    let data = {
      date: momdate.format('YYYY-MM-DD'),
      text: answer,
      comment_id: comment.id,
      likes: 0,
    };
    createAnswer(data);
    let newAnswerQty = Number(answersCount) + 1;
    setAnswersCount(newAnswerQty);
    setAnswer('');
  };

  return (
    <View
      style={{
        marginTop: 10,
        borderBottomColor: '#dedede',
        paddingBottom: 5,
        borderBottomWidth: 1,
      }}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {userId: comment.user_id})
          }>
          <Image
            style={{width: 50, height: 50, borderRadius: 25}}
            source={
              thisUsers[0]?.image_url
                ? {uri: thisUsers[0]?.image_url}
                : require('../../../src/images/image_placeholder.png')
            }
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
              {getDiffDate(comment.date)}
            </Text>
          </View>
          <View style={{marginTop: 5}}>
            <Text>{comment.text}</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={createCommentLikeClick}
              style={{display: 'flex', flexDirection: 'row'}}>
              <Image
                style={{width: 23, height: 23}}
                source={require('../../../src/images/like.png')}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: '#2d2d2f',
                  marginTop: 3,
                  marginLeft: 3,
                }}>
                {comment.likes}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={setAnswerModeClick}>
              <Text
                style={{
                  color: '#6997d3',
                  marginLeft: 10,
                  marginTop: 1,
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                ответить
              </Text>
            </TouchableOpacity>
          </View>
          {answerMode ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderColor: '#dedede',
                borderWidth: 1,
                height: 40,
                marginTop: 9,
                marginBottom: 10,
                padding: 0,
                width: 220,
              }}>
              <TextInput
                style={{
                  width: 170,
                  padding: 0,
                  paddingLeft: 9,
                }}
                autoFocus
                value={answer}
                onChangeText={setAnswer}
              />
              {answer.length > 0 ? (
                <TouchableOpacity
                  onPress={sendAnswerClick}
                  style={{width: 50, zIndex: 100}}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: 6,
                      marginLeft: 9,
                    }}
                    source={require('../../../src/images/send.png')}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          ) : (
            <></>
          )}
          {answersCount > 0 ? (
            <>
              {showAnswers ? (
                <TouchableOpacity
                  style={{
                    marginTop: 16,
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  onPress={() => setShowAnswers(false)}>
                  <Text style={{color: '#6997d3', fontWeight: '600'}}>
                    Скрыть {answersCount} ответов
                  </Text>
                  <Image
                    style={{width: 16, height: 16, marginLeft: 5, marginTop: 3}}
                    source={require('../../../src/images/trangleUp.png')}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    marginTop: 16,
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  onPress={() => setShowAnswers(true)}>
                  <Text style={{color: '#6997d3', fontWeight: '600'}}>
                    Показать {answersCount} ответов
                  </Text>
                  <Image
                    style={{width: 16, height: 16, marginLeft: 5, marginTop: 3}}
                    source={require('../../../src/images/trangleDown.png')}
                  />
                </TouchableOpacity>
              )}

              {showAnswers ? (
                <AnswersComponent commentId={comment.id} count={answersCount} />
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
};

export default SingleComment;

/*
{showAnswers ? (
                <TouchableOpacity
                  style={{
                    marginTop: '16px',
                  }}
                  onPress={() => setShowAnswers(false)}>
                  <Text style={{color: '#6997d3', fontWeight: '600'}}>
                    Скрыть {answersCount} ответов
                  </Text>
                  <Image
                    style={{width: 20, height: 12, marginLeft: 5}}
                    source={require('../../../src/images/trangleUp.png')}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    marginTop: '16px',
                  }}
                  onPress={() => setShowAnswers(true)}>
                  <Text style={{color: '#6997d3', fontWeight: '600'}}>
                    Показать {answersCount} ответов
                  </Text>
                  <Image
                    style={{width: 20, height: 12, marginLeft: 5}}
                    source={require('../../../src/images/trangleDown.png')}
                  />
                </TouchableOpacity>
              )}

*/
