import React, {useEffect, useState} from 'react';
import {Image, Linking, ScrollView, Text, TouchableOpacity} from 'react-native';
import {clickContact, getContacts} from './redux/actions';

function Contacts() {
  const [contacts, setContacts] = useState<any>([]);

  useEffect(() => {
    getContacts(setContacts);
  }, []);

  const clickOnContact = (contact: any) => {
    clickContact(contact.contact);
    Linking.openURL(contact.href);
  };

  return (
    <ScrollView style={{backgroundColor: '#fff', padding: 20}}>
      <Text
        style={{
          fontSize: 22,
          color: '#2d2d2f',

          marginTop: 20,
        }}>
        О приложении:
      </Text>
      <Text>
        Добро пожаловать в приложении Before&After, приложение создано с целью
        того что бы дать возможность людям делиться своими целями и похвастаться
        прогрессом до и после , а так же получить поддрежку в своих начинаниях
        от других пользователей. Давайте достигать цели вместе и радоваться
        жизни!
      </Text>
      {contacts.length > 0 ? (
        <>
          <Text
            style={{
              fontSize: 22,
              color: '#2d2d2f',
              marginTop: 20,
            }}>
            Контакты:
          </Text>
          <Text>
            Друзья, если у вас есть предложения по улучшению или сотрудничеству
            пишите сюда
          </Text>
          <TouchableOpacity
            style={{display: 'flex', flexDirection: 'row', marginTop: 5}}
            onPress={() => clickOnContact(contacts[0])}>
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
              {contacts[0]?.contact}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 5,
              marginLeft: 10,
            }}
            onPress={() => clickOnContact(contacts[1])}>
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
              {contacts[1]?.contact}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 22,
              color: '#2d2d2f',
              marginTop: 20,
            }}>
            Поддержите проект:
          </Text>
          <Text>
            Тут можете финансово помочь на развитие и поддрежку проекта
          </Text>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 5,
              marginLeft: 10,
            }}
            onPress={() => clickOnContact(contacts[2])}>
            <Image
              style={{width: 120, height: 50}}
              source={require('../src/images/yandex.jpeg')}
            />
            <Text
              style={{
                fontSize: 18,
                color: '#4d80aa',
                fontWeight: '600',
                marginTop: 15,
                marginLeft: 10,
              }}>
              Поддержать
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <></>
      )}
    </ScrollView>
  );
}

export default Contacts;
