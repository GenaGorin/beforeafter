import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IGoal} from '../../../interfaces/goal';
import {IStage} from '../../../interfaces/stage';
import {singeGoal} from '../../../src/styles/styles';
import {
  getCommentsCount,
  getStages,
  getTags,
  setLike,
} from '../../redux/actions';
import {getDiffDate} from '../../redux/functions';
import TagsBlock from '../TagsBlock/TagsBlock';
import GoalAuthor from './GoalAuthor/GoalAuthor';
import Stage from './Stage/Stage';

type TSingleGoal = {
  goal: IGoal;
};

function SingeGoal({goal}: TSingleGoal) {
  const stages: any = useSelector((state: any) => state.stages.stages);
  const dispatch = useDispatch();
  let thisStages = stages.filter((stage: IStage) => stage.goal_id === goal.id);
  let token = useSelector((state: any) => state.user.user.access_token);
  let navigation = useNavigation();

  const [commentsCount, setCommentsCount] = useState(0);
  const [tags, setTags] = useState<any>();

  useEffect(() => {
    if (thisStages.length === 0) {
      dispatch(getStages(goal.id));
    }
    getCommentsCount(goal.id, setCommentsCount);
    getTags(goal.id, setTags);
  }, []);

  const createLike = (e: any) => {
    e.preventDefault();
    if (!token) {
      navigation.navigate('MyProfile');
    } else {
      dispatch(setLike(goal.id));
    }
  };
  let created = moment(goal.created_at);
  let now = moment();
  // 1
  return (
    <View style={singeGoal.mainWrap}>
      <View style={singeGoal.authorWrapper}>
        <GoalAuthor userId={goal.user_id} />
        {goal.done ? (
          <Image
            style={singeGoal.doned}
            source={require('../../../src/images/doned.png')}
          />
        ) : (
          <></>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Goal', {
            goalId: goal.id,
            commentCount: commentsCount,
          });
        }}>
        <View>
          <View style={singeGoal.dataWtapper}>
            <Text style={singeGoal.blackText}>Создана:</Text>
            <Text style={singeGoal.blueText}>
              {getDiffDate(goal.created_at)}
            </Text>
          </View>
          <View style={singeGoal.dataWtapper}>
            <Text style={singeGoal.blackText}>Последнее обновление:</Text>
            <Text style={singeGoal.blueText}>
              {getDiffDate(goal.last_update)}
            </Text>
          </View>
        </View>
        <Text style={singeGoal.title}> {goal.title}</Text>
        <Text>{goal.description}</Text>
        <View style={singeGoal.stageWrap}>
          {thisStages.map((stage: IStage) => (
            <Image
              key={stage.id}
              style={singeGoal.stage}
              source={{
                uri: stage.image_url,
              }}
            />
          ))}
        </View>
        <View style={singeGoal.likeWrap}>
          <View style={singeGoal.likeWrapMR}>
            <TouchableOpacity onPress={createLike}>
              <Image
                style={singeGoal.likeImg}
                source={require('../../../src/images/like.png')}
              />
            </TouchableOpacity>
            <Text style={singeGoal.likeText}>{goal.likes}</Text>
          </View>
          <View style={singeGoal.likeWrapMR}>
            <Image
              style={{...singeGoal.likeImg, marginTop: 2}}
              source={require('../../../src/images/comment.png')}
            />
            <Text style={singeGoal.likeText}>{commentsCount}</Text>
          </View>
          <View style={singeGoal.likeWrapMR}>
            <Image
              style={{...singeGoal.likeImg, height: 20, marginTop: 3}}
              source={require('../../../src/images/view.png')}
            />
            <Text style={singeGoal.likeText}>{goal.views}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {tags?.length > 0 && <TagsBlock goalTags={tags} />}
    </View>
  );
}

export default SingeGoal;
