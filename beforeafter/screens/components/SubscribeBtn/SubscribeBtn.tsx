import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

function SubscribeBtn({callback, text}: any) {
  return (
    <TouchableOpacity
      style={{backgroundColor: '#474350', padding: 3, borderRadius: 4}}
      onPress={callback}>
      <Text style={{color: '#fff'}}>{text}</Text>
    </TouchableOpacity>
  );
}

export default SubscribeBtn;
