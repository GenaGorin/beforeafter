import React from 'react';
import {Image, Text, View} from 'react-native';
import {IStage} from '../../../interfaces/stage';

type TGoalStage = {
  stage: IStage;
};

function GoalStage({stage}: TGoalStage) {
  return (
    <View>
      <View style={{marginBottom: 5}}>
        <Text style={{fontSize: 12, color: '#2d2d2f'}}>{stage.date}</Text>
      </View>
      <View>
        <Image
          style={{height: 500, resizeMode: 'cover'}}
          source={
            stage.image_url
              ? {uri: stage.image_url}
              : require('../../../src/images/photoplaceholder.jpg')
          }
        />
      </View>
      <View style={{marginTop: 10, marginBottom: 20}}>
        <Text>{stage.description}</Text>
      </View>
    </View>
  );
}

export default GoalStage;
