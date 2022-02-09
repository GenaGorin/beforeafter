import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IAnswer} from '../../../interfaces/answer';
import {getAnswers} from '../../redux/actions';
import SingleAnswer from './SingleAnswer';

type TAnswersComponent = {
  commentId: number;
  count: number;
};

function AnswersComponent({commentId, count}: TAnswersComponent) {
  const [answers, setAnswers] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);
  const addAnswers = (data: any) => {
    setAnswers([...answers, ...data]);
  };
  useEffect(() => {
    getAnswers(commentId, 0, addAnswers, setLoaded);
  }, []);

  const loadMoreAnswer = () => {
    getAnswers(commentId, answers.length, addAnswers, setLoaded);
  };

  return (
    <View>
      {loaded ? (
        <>
          {answers.map((answer: IAnswer) => (
            <SingleAnswer key={answer.id} answer={answer} />
          ))}
          {count > answers.length ? (
            <TouchableOpacity
              style={{
                marginTop: 16,
                display: 'flex',
                flexDirection: 'row',
              }}
              onPress={loadMoreAnswer}>
              <Text style={{color: '#6997d3', fontWeight: '600'}}>Еще</Text>
              <Image
                style={{width: 16, height: 16, marginLeft: 5, marginTop: 3}}
                source={require('../../../src/images/trangleDown.png')}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

export default AnswersComponent;
