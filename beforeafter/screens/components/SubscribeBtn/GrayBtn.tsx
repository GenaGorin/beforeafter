import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {controls} from '../../../src/styles/styles';

type TBlueBtn = {
  callback: any;
  text: string;
};

function GrayBtn({callback, text}: TBlueBtn) {
  return (
    <TouchableOpacity style={controls.buttonGray} onPress={callback}>
      <Text style={{color: '#2d2d2f'}}>{text}</Text>
    </TouchableOpacity>
  );
}
export default GrayBtn;
