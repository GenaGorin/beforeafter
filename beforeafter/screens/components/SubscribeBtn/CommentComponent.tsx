import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

type TCommentComponent = {
  value: any;
  changeValue: any;
  callback: any;
};

function CommentComponent({value, changeValue, callback}: TCommentComponent) {
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#fff',

        marginLeft: 20,
        borderWidth: 2,
        borderColor: '#dedede',
      }}>
      <TextInput
        value={value}
        onChangeText={changeValue}
        autoFocus
        style={{width: '90%', paddingLeft: 20}}
      />
      {value.length > 0 ? (
        <TouchableOpacity onPress={callback}>
          <Image
            style={{width: 30, height: 30, marginLeft: 5, marginTop: 7}}
            source={require('../../../src/images/send.png')}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
}

export default CommentComponent;
