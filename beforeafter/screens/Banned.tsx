import React, {useEffect, useState} from 'react';
import {Image, Linking, ScrollView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getContacts} from './redux/actions';

function Banned() {
  const [contacts, setContacts] = useState<any>();

  useEffect(() => {
    getContacts(setContacts);
  }, []);

  return (
    <ScrollView style={{backgroundColor: '#fff', padding: 20}}>
      <Text
        style={{
          fontSize: 22,
          color: '#2d2d2f',
          marginBottom: 30,
          marginTop: 20,
        }}>
        Ваш аккаунт заблокировали :(
      </Text>
      <Text>По вопросам разблокировки пишите сюда:</Text>
      <TouchableOpacity
        style={{display: 'flex', flexDirection: 'row', marginTop: 20}}
        onPress={() =>
          Linking.openURL(
            'https://www.instagram.com/' + contacts?.instagram + '/',
          )
        }>
        <Image
          style={{width: 80, height: 80}}
          source={require('../src/images/instagram.png')}
        />
        <Text
          style={{
            fontSize: 18,
            color: '#4d80aa',
            fontWeight: '600',
            marginTop: 20,
            marginLeft: 10,
          }}>
          {contacts?.instagram}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 10,
          marginLeft: 10,
        }}
        onPress={() =>
          Linking.openURL('https://t.me/' + contacts?.telegram + '/')
        }>
        <Image
          style={{width: 60, height: 60}}
          source={require('../src/images/telegram.png')}
        />
        <Text
          style={{
            fontSize: 18,
            color: '#4d80aa',
            fontWeight: '600',
            marginTop: 15,
            marginLeft: 10,
          }}>
          {contacts?.telegram}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Banned;
