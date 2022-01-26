import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import CreateGoalComponent from './components/CreateGoalComponent/CreateGoalComponent';

function CreateGoal() {
  let token = useSelector((state: any) => state.user.user.access_token);
  const navigation = useNavigation();

  return (
    <View style={{padding: 20, backgroundColor: '#fff', height: '100%'}}>
      {token ? (
        <CreateGoalComponent />
      ) : (
        <View style={{marginTop: 50}}>
          <Text style={{fontSize: 22, color: '#2d2d2f'}}>
            Создайте свою первую цель!
          </Text>
          <Text>Для этого нужно авторизоваться либо зарегистрироваться</Text>
          <TouchableOpacity
            style={{marginTop: 16, display: 'flex', flexDirection: 'row'}}
            onPress={() => navigation.navigate('MyProfile')}>
            <Text style={{fontSize: 18, color: '#4d80aa'}}>
              Перейти к авторизации
            </Text>
            <Image
              style={{marginTop: 8, marginLeft: 10}}
              source={require('../src/images/goForward.png')}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default CreateGoal;
