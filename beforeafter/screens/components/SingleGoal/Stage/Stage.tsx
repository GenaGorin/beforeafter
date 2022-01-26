import React from 'react';
import {Image, Text, View} from 'react-native';
import {IStage} from '../../../../interfaces/stage';

type TStage = {
  stage: IStage;
};

function Stage({stage}: TStage) {
  return (
    <Image
      source={{
        uri: 'http://x98736zu.beget.tech/web/uploads/ava/userava_10.jpg',
      }}
    />
  );
}

export default Stage;
