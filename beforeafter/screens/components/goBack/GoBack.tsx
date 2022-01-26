import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

function GoBack({text}: any) {
  const navigation = useNavigation();
  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 20,
        }}>
        <Image source={require('../../../src/images/goBack.png')} />
        <Text style={{color: '#4d80aa', marginTop: -5, marginLeft: 5}}>
          назад
        </Text>
      </TouchableOpacity>
      <Text style={{fontSize: 20, marginLeft: 20, marginTop: -10}}>{text}</Text>
    </View>
  );
}

export default GoBack;
