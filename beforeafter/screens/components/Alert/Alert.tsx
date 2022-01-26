import React from 'react';
import {Text, View} from 'react-native';

type TAlert = {
  text: string;
};
function Alert({text}: TAlert) {
  return (
    <View
      style={{
        borderWidth: 1,
        position: 'absolute',
        bottom: 25,
        right: 15,
        alignSelf: 'flex-end',
        zIndex: 10,
        backgroundColor: '#f8d7da',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 20,
        paddingRight: 20,
      }}>
      <Text style={{fontSize: 16, color: '#842029'}}>{text}!</Text>
    </View>
  );
}

export default Alert;
