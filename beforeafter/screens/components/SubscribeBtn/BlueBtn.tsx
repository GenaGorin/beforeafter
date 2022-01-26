import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {controls} from '../../../src/styles/styles';

type TBlueBtn = {
  callback: any;
  text: string;
};

function BlueBtn({callback, text}: TBlueBtn) {
  return (
    <TouchableOpacity style={controls.buttonBlue} onPress={callback}>
      <Text style={{color: '#fff'}}>{text}</Text>
    </TouchableOpacity>
  );
}
export default BlueBtn;
