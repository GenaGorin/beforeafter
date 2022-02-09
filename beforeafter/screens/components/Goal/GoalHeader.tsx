import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IGoal} from '../../../interfaces/goal';
import {IStage} from '../../../interfaces/stage';
import {
  addView,
  getGoal,
  getStages,
  sendComment,
  setLike,
} from '../../redux/actions';
import GoBack from '../goBack/GoBack';
import moment from 'moment';
import UserGoal from './UserGoal';
import {singeGoal} from '../../../src/styles/styles';
import GoalStage from './GoalStage';
import BlueBtn from '../SubscribeBtn/BlueBtn';
import CommentComponent from '../SubscribeBtn/CommentComponent';
import {getDiffDate} from '../../redux/functions';

type TGoalHeader = {
  goalId: number;
  commentsCount: number;
};

function GoalHeader({goalId, commentsCount}: TGoalHeader) {
  let goals = useSelector((state: any) => state.goals.goals);
  let thisGoal = goals.filter((goal: IGoal) => goal.id === goalId);
  let stages = useSelector((state: any) => state.stages.stages);
  let thisStages = stages.filter((stages: IStage) => stages.goal_id === goalId);
  let token = useSelector((state: any) => state.user.user.access_token);
  const loading = useSelector((state: any) => state.app.loading);
  const [commentMode, setCommentMode] = useState(false);
  let navigation = useNavigation();
  const dispatch = useDispatch();
  const [comqty, setComqty] = useState(commentsCount);
  useEffect(() => {
    if (thisGoal.length === 0) {
      dispatch(getGoal(goalId));
    }
    addView(goalId);
    if (thisStages.length === 0) {
      dispatch(getStages(goalId));
    }
  }, []);

  const [comment, setComment] = useState('');

  const sendCommentClick = () => {
    if (!comment) {
      return false;
    }
    let momdate = moment(new Date());
    let data = {
      date: momdate.format('YYYY-MM-DD'),
      text: comment,
      goal_id: goalId,
    };
    dispatch(sendComment(data));
    setCommentMode(false);
    setComment('');
    let newQty = Number(comqty) + 1;
    setComqty(newQty);
  };

  const createLike = (e: any) => {
    e.preventDefault();
    if (!token) {
      navigation.navigate('MyProfile');
    } else {
      dispatch(setLike(goalId));
    }
  };

  const setCommentModeClick = () => {
    if (!token) {
      navigation.navigate('MyProfile');
    } else {
      setCommentMode(true);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: thisGoal[0]?.title,
        message: 'Зацените цель в Before&After',
        url: thisStages[0]?.image_url,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <>
      <ScrollView>
        <GoBack />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {thisGoal[0]?.user_id ? (
            <UserGoal userId={thisGoal[0]?.user_id} />
          ) : (
            <View></View>
          )}
          <TouchableOpacity onPress={onShare}>
            <Image
              style={{width: 20, height: 20, marginLeft: 28, marginTop: 3}}
              source={require('../../../src/images/share.png')}
            />
            <Text style={{color: '#2d2d2f', fontSize: 12}}>Поделиться</Text>
          </TouchableOpacity>
        </View>
        <View style={singeGoal.likeWrap}>
          <TouchableOpacity style={singeGoal.likeWrapMR} onPress={createLike}>
            <Image
              style={singeGoal.likeImg}
              source={require('../../../src/images/like.png')}
            />
            <Text style={singeGoal.likeText}>{thisGoal[0]?.likes}</Text>
          </TouchableOpacity>
          <View style={singeGoal.likeWrapMR}>
            <Image
              style={{...singeGoal.likeImg, height: 16, marginTop: 6}}
              source={require('../../../src/images/view.png')}
            />
            <Text style={singeGoal.likeText}>{thisGoal[0]?.views}</Text>
          </View>
        </View>
        <View style={{...singeGoal.dataWtapper, marginTop: 10}}>
          <Text style={singeGoal.blackText}>Создана:</Text>
          <Text style={singeGoal.blueText}>
            {getDiffDate(thisGoal[0]?.created_at)}
          </Text>
        </View>
        <View style={{...singeGoal.dataWtapper, marginTop: 0}}>
          <Text style={singeGoal.blackText}>Последнее обновление:</Text>
          <Text style={singeGoal.blueText}>
            {getDiffDate(thisGoal[0]?.last_update)}
          </Text>
        </View>
        <Text style={{...singeGoal.title, marginLeft: 0}}>
          {thisGoal[0]?.title}
        </Text>
        <Text>{thisGoal[0]?.description}</Text>
        <View style={{marginTop: 10}}>
          {thisStages.length > 0 ? (
            thisStages.map((stage: IStage, i: number) => {
              return <GoalStage key={i} stage={stage} />;
            })
          ) : (
            <Text>Пока нет этапов</Text>
          )}
        </View>
        <BlueBtn callback={setCommentModeClick} text="Комментировать" />

        <TouchableOpacity
          onPress={() => navigation.navigate('GoalComments', {goalId: goalId})}>
          <Text
            style={{
              color: '#4d80aa',
              fontSize: 18,
              marginBottom: 50,
              marginTop: 20,
              fontWeight: '600',
            }}>
            К комментариям-&gt; ({comqty})
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {commentMode ? (
        <CommentComponent
          value={comment}
          changeValue={setComment}
          callback={sendCommentClick}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default GoalHeader;
