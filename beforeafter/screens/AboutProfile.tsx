import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {MyProfileStyles} from '../src/styles/styles';
import GoBack from './components/goBack/GoBack';

function AboutProfile({route}: any) {
  let userData: any = route.params.userData;
  return (
    <SafeAreaView style={{padding: 20, backgroundColor: '#fff'}}>
      <GoBack />
      <View style={{marginBottom: 20}}>
        <Text style={{color: '#2d2d2f'}}>Описание:</Text>
        <Text>{userData.description}</Text>
      </View>
      <View>
        <Text style={{color: '#2d2d2f'}}>Контакты:</Text>
        <View style={MyProfileStyles.contactsWrapper}>
          <Text>vk:</Text>
          <Text style={MyProfileStyles.blueText}>{userData.vk}</Text>
        </View>
        <View style={MyProfileStyles.contactsWrapper}>
          <Text>instagram:</Text>
          <Text style={MyProfileStyles.blueText}>{userData.instagram}</Text>
        </View>
        <View style={MyProfileStyles.contactsWrapper}>
          <Text>telegram:</Text>
          <Text style={MyProfileStyles.blueText}>{userData.telegram}</Text>
        </View>
        <View style={MyProfileStyles.contactsWrapper}>
          <Text>WhatsApp:</Text>
          <Text style={MyProfileStyles.blueText}>{userData.whatsapp}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AboutProfile;
