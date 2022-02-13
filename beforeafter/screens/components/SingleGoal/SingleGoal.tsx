import {useNavigation} from '@react-navigation/native';
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

  // 1
  return (
    <View style={singeGoal.mainWrap}>
      <View style={singeGoal.authorWrapper}>
        <GoalAuthor userId={goal.user_id} />

        {goal.done ? (
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: -3,
              marginTop: -5,
            }}
            source={require('../../../src/images/doned.png')}
          />
        ) : (
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: -3,
              marginTop: -5,
            }}
            source={require('../../../src/images/notDoned.png')}
          />
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
        <Text style={singeGoal.title}>
          {' '}
          {goal.title?.substr(0, 60)}
          {goal.title?.length > 60 && '...'}
        </Text>
        <Text>
          {goal.description?.substr(0, 200)}
          {goal.description?.length > 200 && '...'}
        </Text>
        <View style={singeGoal.stageWrap}>
          {thisStages.length < 10 ? (
            <>
              {thisStages.map((stage: IStage) => (
                <View key={stage.id}>
                  <Image
                    style={singeGoal.stage}
                    source={{
                      uri: stage.image_url,
                    }}
                  />
                  <Text style={{fontSize: 10, color: '#4d80aa'}}>
                    {getDiffDate(stage.date)}
                  </Text>
                </View>
              ))}
            </>
          ) : (
            <>
              {thisStages.map((stage: IStage, i: number) => {
                if (i < 5) {
                  return (
                    <View key={stage.id}>
                      <Image
                        style={singeGoal.stage}
                        source={{
                          uri: stage.image_url,
                        }}
                      />
                      <Text style={{fontSize: 10, color: '#4d80aa'}}>
                        {getDiffDate(stage.date)}
                      </Text>
                    </View>
                  );
                }
                if (i > thisStages.length - 6) {
                  return (
                    <View key={stage.id}>
                      <Image
                        style={singeGoal.stage}
                        source={{
                          uri: stage.image_url,
                        }}
                      />
                      <Text style={{fontSize: 10, color: '#4d80aa'}}>
                        {getDiffDate(stage.date)}
                      </Text>
                    </View>
                  );
                }
              })}
            </>
          )}
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
              style={{...singeGoal.likeImg, height: 16, marginTop: 5}}
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
